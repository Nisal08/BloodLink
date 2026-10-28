import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';

type Status = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';

const statusStyles: Record<Status, { bg: string; text: string }> = {
  Pending: { bg: 'bg-amber-100', text: 'text-amber-700' },
  Accepted: { bg: 'bg-green-100', text: 'text-green-700' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700' },
  Completed: { bg: 'bg-gray-100', text: 'text-gray-600' },
  Cancelled: { bg: 'bg-red-100', text: 'text-[#FF0040]' },
};

const initialRequests = [
  { id: 1, type: 'A+', hospital: 'City Hospital', units: 2, date: 'Sept 21, 2026', status: 'Pending' as Status, color: '#FF0040' },
  { id: 2, type: 'A+', hospital: "St. Mary's", units: 1, date: 'Sept 15, 2026', status: 'Completed' as Status, color: '#00E5A0' },
  { id: 3, type: 'A+', hospital: 'Regional Medical', units: 2, date: 'Sept 10, 2026', status: 'In Progress' as Status, color: '#00B4FF' },
];

export default function RequesterDashboard() {
  const location = useLocation();
  const [requests, setRequests] = useState(initialRequests);
  const [cancelId, setCancelId] = useState<number | null>(null);

  const cancel = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Cancelled' as Status } : r));
    setCancelId(null);
  };

  const activeCount = requests.filter(r => ['Pending','Accepted','In Progress'].includes(r.status)).length;

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="requester" userName="Elena Vasquez" activePath={location.pathname} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Requester</p>
            <h1 className="font-display text-xl font-black text-[#00032B]">My Dashboard</h1>
          </div>
          <Link to="/dashboard/requester/create-request"
            className="bg-[#FF0040] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all glow-red-sm">
            + New Request
          </Link>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Requests', value: requests.length, icon: '▤', from: '#7B2FFF', to: '#a56bff' },
              { label: 'Active', value: activeCount, icon: '◷', from: '#FF7B00', to: '#ffac4d' },
              { label: 'Completed', value: requests.filter(r => r.status === 'Completed').length, icon: '◈', from: '#00E5A0', to: '#4dffc6' },
            ].map(s => (
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
                <h2 className="font-display font-bold text-[#00032B]">My Blood Requests</h2>
                <Link to="/dashboard/requester/my-requests" className="text-xs font-semibold text-[#FF0040]">View all →</Link>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {requests.map(req => {
                  const ss = statusStyles[req.status];
                  return (
                    <div key={req.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--background)] transition-colors flex-wrap">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-black text-base text-white shrink-0"
                        style={{ background: req.color }}>
                        {req.type}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#00032B]">{req.hospital}</p>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)]">{req.units} units · {req.date}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1.5 rounded-full font-semibold ${ss.bg} ${ss.text}`}>{req.status}</span>
                      <div className="flex gap-2 shrink-0">
                        <Link to="/blood-requests" className="text-xs border-2 border-[var(--border)] px-3 py-1.5 rounded-lg hover:border-[#00032B] transition-colors font-semibold">View</Link>
                        {['Pending','Accepted'].includes(req.status) && (
                          <button onClick={() => setCancelId(req.id)}
                            className="text-xs border-2 border-[#FF0040]/30 text-[#FF0040] px-3 py-1.5 rounded-lg hover:bg-[#FF0040]/5 transition-colors font-semibold">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-[#00032B] to-[#7B2FFF]/70 rounded-2xl p-6 text-white">
                <p className="font-mono-label text-xs text-white/50 uppercase tracking-widest mb-3">Need blood?</p>
                <h3 className="font-display text-xl font-bold mb-2">Post a Request</h3>
                <p className="text-white/60 text-sm mb-5">Connect with available donors in your area within minutes.</p>
                <Link to="/dashboard/requester/create-request"
                  className="block w-full text-center bg-white text-[#7B2FFF] font-bold py-3 rounded-xl hover:bg-purple-50 transition-colors text-sm">
                  Create Request →
                </Link>
              </div>

              {[
                { label: 'Find Donors', path: '/dashboard/requester/find-donors', icon: '◍', color: '#FF0040' },
                { label: 'Notifications', path: '/dashboard/requester/notifications', icon: '◎', color: '#00B4FF' },
                { label: 'Settings', path: '/dashboard/requester/settings', icon: '◌', color: '#00E5A0' },
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

      {cancelId !== null && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center text-[#FF0040] font-mono-label text-xl mb-5">◆</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2">Cancel this request?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">You can create a new request at any time from your dashboard.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Keep It</button>
              <button onClick={() => cancel(cancelId)} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#cc0033] transition-colors">Cancel Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
