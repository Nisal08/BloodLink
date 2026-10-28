import { useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Status = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Rejected' | 'Cancelled';

const statusFlow: Record<Status, Status | null> = {
  Pending: 'Accepted', Accepted: 'In Progress', 'In Progress': 'Completed', Completed: null, Rejected: null, Cancelled: null,
};

const statusStyles: Record<Status, { bg: string; text: string; dot: string }> = {
  Pending: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500' },
  Accepted: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  'In Progress': { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  Completed: { bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  Rejected: { bg: 'bg-red-100', text: 'text-[#FF0040]', dot: 'bg-[#FF0040]' },
  Cancelled: { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' },
};

const urgencyStyles: Record<string, string> = {
  Emergency: 'bg-[#FF0040] text-white',
  High: 'bg-orange-500 text-white',
  Normal: 'bg-blue-500 text-white',
};

const initialRequests = [
  { id: 1, type: 'O-', patient: 'Emergency Surgery Patient', hospital: 'City General Hospital', city: 'New York', urgency: 'Emergency', units: 3, status: 'Pending' as Status, posted: 'Sept 21, 2026', color: '#FF0040' },
  { id: 2, type: 'AB+', patient: 'Post-operative Recovery', hospital: "St. Mary's Medical Center", city: 'Boston', urgency: 'High', units: 2, status: 'Accepted' as Status, posted: 'Sept 20, 2026', color: '#7B2FFF' },
  { id: 3, type: 'B+', patient: 'Trauma Victim', hospital: 'Regional Medical Center', city: 'Chicago', urgency: 'Emergency', units: 4, status: 'In Progress' as Status, posted: 'Sept 20, 2026', color: '#FF0040' },
  { id: 4, type: 'A+', patient: 'Scheduled Surgery', hospital: 'Memorial Hospital', city: 'Houston', urgency: 'Normal', units: 1, status: 'Completed' as Status, posted: 'Sept 19, 2026', color: '#00B4FF' },
  { id: 5, type: 'O+', patient: 'Anemia Treatment', hospital: 'University Hospital', city: 'Seattle', urgency: 'Normal', units: 2, status: 'Pending' as Status, posted: 'Sept 19, 2026', color: '#00E5A0' },
  { id: 6, type: 'B-', patient: 'Accident Victim', hospital: 'Lakewood Medical', city: 'Denver', urgency: 'High', units: 5, status: 'Rejected' as Status, posted: 'Sept 18, 2026', color: '#7B2FFF' },
];

export default function BloodRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterUrgency, setFilterUrgency] = useState('All');
  const [toast, setToast] = useState('');

  const filtered = requests.filter(r =>
    (filterStatus === 'All' || r.status === filterStatus) &&
    (filterUrgency === 'All' || r.urgency === filterUrgency)
  );

  const advance = (id: number) => {
    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r;
      const next = statusFlow[r.status];
      if (!next) return r;
      setToast(`Status updated → ${next}`);
      setTimeout(() => setToast(''), 3000);
      return { ...r, status: next };
    }));
  };

  const reject = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' as Status } : r));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="bg-[#00032B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute left-1/2 top-0 w-64 h-64 bg-[#FF0040]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-xs font-mono-label text-white/35 mb-4">
            <Link to="/" className="hover:text-[#FF0040] transition-colors">Home</Link>
            <span className="mx-2">/</span><span className="text-white/60">Blood Requests</span>
          </nav>
          <div className="flex items-end justify-between flex-wrap gap-5">
            <div>
              <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Live board</p>
              <h1 className="font-display text-4xl font-black text-white">Blood Requests</h1>
              <p className="text-white/45 mt-2">Browse and respond to active donation needs across the network.</p>
            </div>
            <div className="flex gap-3">
              {['Pending', 'In Progress', 'Completed'].map(s => (
                <div key={s} className="bg-white/6 border border-white/10 rounded-2xl px-4 py-2.5 text-center">
                  <p className="font-display text-xl font-black text-white">{requests.filter(r => r.status === s).length}</p>
                  <p className="text-xs text-white/40 font-mono-label">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toast */}
          {toast && (
            <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
              ✓ {toast}
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4 flex flex-wrap gap-2 flex-1">
              <p className="text-xs font-mono-label text-[var(--muted-foreground)] w-full uppercase tracking-wider mb-1">Status</p>
              {['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filterStatus === s ? 'bg-[#00032B] text-white border-[#00032B]' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B] hover:text-[#00032B]'
                  }`}>{s}</button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] p-4 flex flex-wrap gap-2">
              <p className="text-xs font-mono-label text-[var(--muted-foreground)] w-full uppercase tracking-wider mb-1">Urgency</p>
              {['All', 'Emergency', 'High', 'Normal'].map(u => (
                <button key={u} onClick={() => setFilterUrgency(u)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    filterUrgency === u ? 'bg-[#FF0040] text-white border-[#FF0040]' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#FF0040] hover:text-[#FF0040]'
                  }`}>{u}</button>
              ))}
            </div>
          </div>

          <p className="text-xs font-mono-label text-[var(--muted-foreground)] mb-4 uppercase tracking-wide">{filtered.length} REQUESTS</p>

          <div className="flex flex-col gap-4">
            {filtered.map(req => {
              const ss = statusStyles[req.status];
              const nextStatus = statusFlow[req.status];
              return (
                <div key={req.id} className="bg-white rounded-2xl border-2 border-[var(--border)] hover:border-[#00032B] transition-all overflow-hidden">
                  <div className="flex items-stretch">
                    {/* Left accent */}
                    <div className="w-1.5 shrink-0" style={{ background: req.color }} />

                    <div className="flex-1 p-5">
                      <div className="flex items-start gap-4 flex-wrap">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl text-white shrink-0 shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${req.color}, ${req.color}bb)` }}>
                          {req.type}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                            <div>
                              <h3 className="font-display font-bold text-[#00032B] text-lg leading-tight">{req.patient}</h3>
                              <p className="text-sm text-[var(--muted-foreground)]">{req.hospital} · {req.city}</p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap shrink-0">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${urgencyStyles[req.urgency]}`}>{req.urgency}</span>
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 ${ss.bg} ${ss.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />{req.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-5 text-xs font-mono-label text-[var(--muted-foreground)]">
                            <span>◆ {req.units} units</span>
                            <span>◷ Posted {req.posted}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {req.status === 'Pending' && (
                            <button onClick={() => reject(req.id)}
                              className="text-xs border-2 border-[#FF0040]/30 text-[#FF0040] px-3 py-2 rounded-xl hover:bg-[#FF0040]/5 transition-colors font-semibold">
                              Reject
                            </button>
                          )}
                          {nextStatus && (
                            <button onClick={() => advance(req.id)}
                              className="text-xs text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
                              style={{ background: req.color, boxShadow: `0 4px 14px ${req.color}40` }}>
                              {req.status === 'Pending' ? 'Accept' : req.status === 'Accepted' ? 'Mark In Progress' : 'Mark Completed'} →
                            </button>
                          )}
                          {!nextStatus && req.status !== 'Rejected' && req.status !== 'Cancelled' && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-2 rounded-xl font-semibold">✓ Done</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
