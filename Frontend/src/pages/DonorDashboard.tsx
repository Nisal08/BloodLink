import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import {
  acceptRequest,
  getDonorStats,
  getMatchingRequests,
  rejectRequest,
  toggleAvailability,
} from '../services/api';

type DonorStats = {
  totalDonations: number;
  livesSaved: number;
  pendingRequests: number;
  nextEligibleDate?: string | null;
  cooldownProgress: number;
  daysLeft: number;
  isAvailable: boolean;
  isEligible: boolean;
};

type MatchingRequest = {
  _id: string;
  bloodType: string;
  urgency: string;
  status: string;
  hospitalName: string;
  hospitalCity?: string;
  createdAt: string;
  patientInfo?: { name?: string; description?: string };
};

const statCards = [
  { label: 'Total Donations', key: 'totalDonations' as const, icon: '◆', from: '#FF0040', to: '#ff4d6d' },
  { label: 'Lives Saved', key: 'livesSaved' as const, icon: '◉', from: '#7B2FFF', to: '#a56bff' },
  { label: 'Pending Requests', key: 'pendingRequests' as const, icon: '◷', from: '#FF7B00', to: '#ffac4d' },
];

function formatDate(date?: string | null) {
  if (!date) return 'Not available';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return 'Not available';
  return parsed.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function readError(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Could not load donor dashboard data.';
}

export default function DonorDashboard() {
  const location = useLocation();
  const { user } = useAuth();
  const [stats, setStats] = useState<DonorStats | null>(null);
  const [requests, setRequests] = useState<MatchingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyRequestId, setBusyRequestId] = useState<string | null>(null);
  const [availabilityBusy, setAvailabilityBusy] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsResponse, requestsResponse] = await Promise.all([
        getDonorStats(),
        getMatchingRequests({ page: '1', limit: '3' }),
      ]);
      setStats(statsResponse.data.data);
      setRequests(requestsResponse.data.data ?? []);
    } catch (err: unknown) {
      setError(readError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const available = stats?.isAvailable ?? false;
  const donorName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Donor';
  const nextEligibleLabel = stats?.isEligible
    ? 'Eligible now'
    : formatDate(stats?.nextEligibleDate);

  const handleToggleAvailability = async () => {
    setAvailabilityBusy(true);
    setError('');
    try {
      const response = await toggleAvailability();
      setStats((current) => current
        ? { ...current, isAvailable: response.data.data.isAvailable }
        : current);
    } catch (err: unknown) {
      setError(readError(err));
    } finally {
      setAvailabilityBusy(false);
    }
  };

  const handleRequestResponse = async (requestId: string, action: 'accept' | 'reject') => {
    setBusyRequestId(requestId);
    setError('');
    try {
      if (action === 'accept') {
        await acceptRequest(requestId);
        setRequests((current) => current.map((request) =>
          request._id === requestId ? { ...request, status: 'Accepted' } : request,
        ));
      } else {
        await rejectRequest(requestId);
        setRequests((current) => current.map((request) =>
          request._id === requestId ? { ...request, status: 'Rejected' } : request,
        ));
      }
      const refreshedStats = await getDonorStats();
      setStats(refreshedStats.data.data);
    } catch (err: unknown) {
      setError(readError(err));
    } finally {
      setBusyRequestId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="donor" userName={donorName} activePath={location.pathname} />

      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Donor Dashboard</p>
            <h1 className="font-display text-xl font-black text-[#00032B]">Welcome, {donorName} 👋</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-[#00032B]">Available</span>
              <button
                type="button"
                onClick={handleToggleAvailability}
                disabled={availabilityBusy || loading || !stats}
                aria-label="Toggle donor availability"
                aria-pressed={available}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${available ? 'bg-[#FF0040]' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className={`w-2.5 h-2.5 rounded-full ${available ? 'bg-green-400' : 'bg-gray-300'}`} />
            <span className="text-xs font-mono-label font-semibold text-[var(--muted-foreground)]">{available ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>

        <div className="p-8">
          {error && (
            <div role="alert" className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
              <span>{error}</span>
              <button type="button" onClick={() => void loadDashboard()} className="font-bold underline">Retry</button>
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => (
              <div key={card.key} className="bg-white rounded-2xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono-label text-lg mb-4 text-white"
                  style={{ background: `linear-gradient(135deg, ${card.from}, ${card.to})` }}>
                  {card.icon}
                </div>
                <p className="font-display text-3xl font-black text-[#00032B] mb-0.5">
                  {loading ? '…' : stats?.[card.key] ?? 0}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{card.label}</p>
              </div>
            ))}
            <div className="bg-white rounded-2xl border border-[var(--border)] p-5 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono-label text-lg mb-4 text-white"
                style={{ background: 'linear-gradient(135deg, #00E5A0, #4dffc6)' }}>
                ◈
              </div>
              <p className="font-display text-2xl font-black text-[#00032B] mb-0.5">
                {loading ? '…' : stats?.isEligible ? 'Now' : formatDate(stats?.nextEligibleDate)}
              </p>
              <p className="text-xs text-[var(--muted-foreground)] font-mono-label">Next Eligible</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <div>
                  <h2 className="font-display font-bold text-[#00032B]">Incoming Requests</h2>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label">Requests matching your blood type</p>
                </div>
                <Link to="/blood-requests" className="text-xs font-semibold text-[#FF0040] hover:text-[#cc0033]">View all →</Link>
              </div>
              {loading ? (
                <p className="px-6 py-8 text-sm text-[var(--muted-foreground)]">Loading requests…</p>
              ) : requests.length === 0 ? (
                <p className="px-6 py-8 text-sm text-[var(--muted-foreground)]">There are no matching requests right now.</p>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {requests.map((request) => {
                    const patient = request.patientInfo?.name || request.patientInfo?.description || 'Blood request';
                    const date = formatDate(request.createdAt);
                    const pending = request.status === 'Pending';
                    return (
                      <div key={request._id} className="px-6 py-4 flex items-center gap-4 flex-wrap hover:bg-[var(--background)] transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#FF0040] flex items-center justify-center font-display font-black text-sm text-white shrink-0">{request.bloodType}</div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#00032B]">{patient}</p>
                          <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{request.hospitalName}{request.hospitalCity ? ` · ${request.hospitalCity}` : ''} · {date}</p>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${request.urgency === 'Emergency' ? 'bg-[#FF0040] text-white' : request.urgency === 'High' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'}`}>
                          {request.urgency}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          {pending ? (
                            <>
                              <button type="button" disabled={busyRequestId === request._id} onClick={() => void handleRequestResponse(request._id, 'accept')}
                                className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50">Accept</button>
                              <button type="button" disabled={busyRequestId === request._id} onClick={() => void handleRequestResponse(request._id, 'reject')}
                                className="text-xs border-2 border-[#FF0040]/30 text-[#FF0040] px-3 py-1.5 rounded-lg hover:bg-[#FF0040]/5 transition-colors font-semibold disabled:opacity-50">Reject</button>
                            </>
                          ) : (
                            <span className={`text-xs px-3 py-1.5 rounded-lg font-bold ${request.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-[#FF0040]'}`}>
                              {request.status}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
                <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-2">Next eligible</p>
                <p className="font-display text-3xl font-black mb-1">{loading ? '…' : nextEligibleLabel}</p>
                <p className="text-white/50 text-sm">
                  {loading ? 'Loading eligibility…' : stats?.isEligible ? 'You are eligible to donate.' : `${stats?.daysLeft ?? 0} days left in the donation cooldown.`}
                </p>
                <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-2 rounded-full bg-[#FF0040] transition-all" style={{ width: `${Math.min(100, Math.max(0, stats?.cooldownProgress ?? 0))}%` }} />
                </div>
              </div>

              {[
                { label: 'My Profile', path: '/dashboard/donor/profile', icon: '◉', color: '#7B2FFF' },
                { label: 'Donation History', path: '/dashboard/donor/history', icon: '▤', color: '#00B4FF' },
                { label: 'Notifications', path: '/dashboard/donor/notifications', icon: '◎', color: '#00E5A0' },
              ].map((item) => (
                <Link key={item.path} to={item.path}
                  className="bg-white rounded-2xl border border-[var(--border)] p-4 flex items-center gap-4 hover:border-[#00032B] hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono-label text-lg text-white group-hover:scale-110 transition-transform" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm text-[#00032B]">{item.label}</span>
                  <span className="ml-auto text-[var(--muted-foreground)] text-sm group-hover:text-[#FF0040] transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
