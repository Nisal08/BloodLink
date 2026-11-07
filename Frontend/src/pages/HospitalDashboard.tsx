import { Link, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import { getActiveRequests, getHospitalStats, getProfile } from '../services/api';

type HospitalStats = {
  activeRequests: number; donorsContacted: number; fulfilledThisMonth: number;
  emergencyAlerts: number;
  bloodBank?: { inventory: Array<{ bloodType: string; units: number; maxUnits: number }> };
};
type HospitalRequest = {
  _id: string; bloodType: string; hospitalName: string; hospitalCity?: string;
  units: number; urgency: string; status: string; createdAt: string;
  matchedDonors?: unknown[];
};

export default function HospitalDashboard() {
  const location = useLocation();
  const { user } = useAuth();
  const [stats, setStats] = useState<HospitalStats | null>(null);
  const [activeRequests, setActiveRequests] = useState<HospitalRequest[]>([]);
  const [profileName, setProfileName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getHospitalStats(), getActiveRequests({ page: '1', limit: '5' })])
      .then(([statsResponse, requestsResponse]) => {
        setStats(statsResponse.data.data);
        setActiveRequests(requestsResponse.data.data);
      })
      .catch(() => setError('Could not load hospital data. Please retry.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user?.organizationName) {
      getProfile()
        .then(response => setProfileName(response.data.data.organizationName ?? ''))
        .catch(() => setProfileName(''));
    }
  }, [user?.organizationName]);

  const hospitalName = user?.organizationName || profileName || 'Hospital';
  const statCards = [
    { label: 'Active Requests', value: stats?.activeRequests ?? 0, icon: '◆', from: '#FF0040', to: '#ff4d6d' },
    { label: 'Donors Contacted', value: stats?.donorsContacted ?? 0, icon: '◉', from: '#00B4FF', to: '#4dd1ff' },
    { label: 'Fulfilled / Month', value: stats?.fulfilledThisMonth ?? 0, icon: '◈', from: '#00E5A0', to: '#4dffc6' },
    { label: 'Emergency Alerts', value: stats?.emergencyAlerts ?? 0, icon: '◎', from: '#FF7B00', to: '#ffac4d' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="hospital" userName={hospitalName} activePath={location.pathname} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Hospital</p>
            <h1 className="font-display text-xl font-black text-[#00032B]">{hospitalName}</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/find-donors" className="text-sm border-2 border-[var(--border)] px-4 py-2 rounded-xl font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-colors">◍ Find Donors</Link>
            <Link to="/dashboard/hospital/create-request" className="text-sm bg-[#FF0040] text-white px-5 py-2 rounded-xl font-bold hover:bg-[#cc0033] transition-all glow-red-sm">
              + Emergency Request
            </Link>
          </div>
        </div>

        <div className="p-8">
          {loading && <p role="status" className="mb-5 text-sm text-[var(--muted-foreground)]">Loading hospital data...</p>}
          {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[var(--border)] p-5">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono-label text-lg mb-4 text-white"
                  style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                  {s.icon}
                </div>
                <p className="font-display text-3xl font-black text-[#00032B] mb-0.5">{s.value}</p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <h2 className="font-display font-bold text-[#00032B]">Active Blood Requests</h2>
                <Link to="/dashboard/hospital/active-requests" className="text-xs font-semibold text-[#FF0040]">View all →</Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {!loading && !error && activeRequests.length === 0 && (
                  <p className="px-6 py-8 text-sm text-[var(--muted-foreground)]">No active blood requests.</p>
                )}
                {activeRequests.map(req => (
                  <div key={req._id} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--background)] transition-colors flex-wrap">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-base text-white shrink-0"
                      style={{ background: req.urgency === 'Emergency' ? '#FF0040' : '#7B2FFF' }}>
                      {req.bloodType}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#00032B]">{req.hospitalName}{req.hospitalCity ? ` · ${req.hospitalCity}` : ''}</p>
                      <p className="text-xs font-mono-label text-[var(--muted-foreground)]">{req.units} units needed · {req.matchedDonors?.length ?? 0} donors responding</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 text-white ${req.urgency === 'Emergency' ? 'bg-[#FF0040]' : 'bg-orange-500'}`}>{req.urgency}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{req.status}</span>
                    <Link to="/blood-requests" className="text-xs border-2 border-[var(--border)] px-3 py-1.5 rounded-lg hover:border-[#00032B] transition-colors font-semibold shrink-0">View →</Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-[#00032B] to-[#FF0040]/80 rounded-2xl p-6 text-white">
                <p className="font-mono-label text-xs text-white/50 uppercase tracking-widest mb-3">Emergency</p>
                <h3 className="font-display text-xl font-bold mb-2">Post Critical Request</h3>
                <p className="text-white/60 text-sm mb-5">Alert all compatible donors immediately.</p>
                <Link to="/dashboard/hospital/create-request" className="block w-full text-center bg-white text-[#FF0040] font-bold py-3 rounded-xl hover:bg-red-50 transition-colors text-sm">
                  Create Emergency Request →
                </Link>
              </div>

              {[
                { label: 'Create Request', path: '/dashboard/hospital/create-request', icon: '◙', color: '#7B2FFF' },
                { label: 'Request History', path: '/dashboard/hospital/history', icon: '▤', color: '#00B4FF' },
                { label: 'Reports', path: '/dashboard/hospital/reports', icon: '◧', color: '#00E5A0' },
              ].map(item => (
                <Link key={item.path} to={item.path}
                  className="bg-white rounded-2xl border border-[var(--border)] p-4 flex items-center gap-4 hover:border-[#00032B] hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono-label text-lg text-white group-hover:scale-110 transition-transform"
                    style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm text-[#00032B]">{item.label}</span>
                  <span className="ml-auto text-[var(--muted-foreground)] group-hover:text-[#FF0040] transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
