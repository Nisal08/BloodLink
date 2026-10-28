import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';
import { BloodDropTile } from '../components/BloodDropIcon';

/* ─── shared shell ─────────────────────────────────────────────────────── */
function Shell({ title, subtitle, children, actions }: {
  title: string; subtitle?: string; children: ReactNode; actions?: ReactNode;
}) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="requester" userName="Elena Vasquez" activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Requester</p>
            <h1 className="font-display text-xl font-black text-[#00032B]">{title}</h1>
            {subtitle && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MY PROFILE
══════════════════════════════════════════════════════════════════════════ */
export function RequesterProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 3000); };

  const info = [
    { label: 'Full Name', value: 'Elena Vasquez', icon: '◉', editable: true },
    { label: 'Email Address', value: 'elena.vasquez@email.com', icon: '◎', editable: true },
    { label: 'Phone Number', value: '+1 (212) 555-0184', icon: '◷', editable: true },
    { label: 'Date of Birth', value: 'March 14, 1990', icon: '◈', editable: true },
    { label: 'City / Location', value: 'New York, NY', icon: '◆', editable: true },
  ];

  const medical = [
    { label: 'Blood Type (Own)', value: 'A+' },
    { label: 'Known Conditions', value: 'Type 2 Diabetes' },
    { label: 'Allergies', value: 'Penicillin' },
    { label: 'Current Medication', value: 'Metformin 500mg' },
  ];

  return (
    <Shell title="My Profile" subtitle="Manage your personal and medical information"
      actions={
        <button onClick={() => editing ? handleSave() : setEditing(true)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${editing ? 'bg-[#FF0040] text-white glow-red-sm hover:bg-[#cc0033]' : 'bg-[#00032B] text-white hover:bg-[#FF0040]'}`}>
          {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      }>

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 text-sm px-5 py-3 rounded-xl flex items-center gap-2 font-medium">
          <span className="text-green-500 text-lg">✓</span> Profile updated successfully.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-7 flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FF0040] to-[#7B2FFF] flex items-center justify-center text-white font-display font-black text-3xl shadow-lg">
                EV
              </div>
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF0040] rounded-full flex items-center justify-center text-white text-xs shadow-md hover:bg-[#cc0033] transition-colors">
                  ✎
                </button>
              )}
            </div>
            <p className="font-display text-xl font-black text-[#00032B]">Elena Vasquez</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-3">Individual Requester</p>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">✓ Verified Account</span>

            <div className="w-full border-t border-[var(--border)] mt-6 pt-5 flex flex-col gap-3">
              {[
                { label: 'Member Since', value: 'Jan 2025' },
                { label: 'Total Requests', value: '3' },
                { label: 'Active Requests', value: '1' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</span>
                  <span className="text-sm font-bold text-[#00032B]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#00032B] text-sm">Emergency Contact</h3>
              <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">Important</span>
            </div>
            {[
              { label: 'Name', value: 'Carlos Vasquez', placeholder: 'Contact name' },
              { label: 'Relation', value: 'Brother', placeholder: 'Relationship' },
              { label: 'Phone', value: '+1 (212) 555-0199', placeholder: 'Phone number' },
            ].map(f => (
              <div key={f.label} className="mb-3">
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1">{f.label}</p>
                {editing ? (
                  <input defaultValue={f.value} placeholder={f.placeholder}
                    className="w-full border-2 border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                ) : (
                  <p className="text-sm font-semibold text-[#00032B]">{f.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panels */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#FF0040]/10 flex items-center justify-center">
                <span className="font-mono-label text-[#FF0040]">◉</span>
              </div>
              <h2 className="font-display font-bold text-[#00032B]">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {info.map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1.5">{f.label}</p>
                  {editing && f.editable ? (
                    <input defaultValue={f.value}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-mono-label text-[#FF0040] text-xs">{f.icon}</span>
                      <p className="text-sm font-semibold text-[#00032B]">{f.value}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#7B2FFF]/10 flex items-center justify-center">
                <span className="font-mono-label text-[#7B2FFF]">◆</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-[#00032B]">Medical Information</h2>
                <p className="text-xs text-[var(--muted-foreground)]">Used to match compatible donors</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {medical.map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1.5">{f.label}</p>
                  {editing ? (
                    <input defaultValue={f.value}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  ) : (
                    <p className="text-sm font-semibold text-[#00032B]">{f.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Account status */}
          <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="font-mono-label text-white">◈</span>
              </div>
              <h2 className="font-display font-bold">Account Status</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Verification', value: 'Verified', ok: true },
                { label: 'Account Type', value: 'Individual', ok: true },
                { label: '2FA', value: 'Disabled', ok: false },
              ].map(s => (
                <div key={s.label} className="bg-white/8 rounded-xl p-4 border border-white/10">
                  <p className="text-xs text-white/45 font-mono-label uppercase tracking-wide mb-1">{s.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-green-400' : 'bg-amber-400'}`} />
                    <p className="text-sm font-bold">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MY REQUESTS
══════════════════════════════════════════════════════════════════════════ */
type ReqStatus = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';

const statusMeta: Record<ReqStatus, { bg: string; text: string; dot: string; label: string }> = {
  Pending:      { bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'bg-amber-400',  label: 'Awaiting donors' },
  Accepted:     { bg: 'bg-green-50',   text: 'text-green-700',  dot: 'bg-green-500',  label: 'Donor confirmed' },
  'In Progress':{ bg: 'bg-blue-50',    text: 'text-blue-700',   dot: 'bg-blue-500',   label: 'Donation underway' },
  Completed:    { bg: 'bg-gray-50',    text: 'text-gray-600',   dot: 'bg-gray-400',   label: 'Fulfilled' },
  Cancelled:    { bg: 'bg-red-50',     text: 'text-[#FF0040]',  dot: 'bg-[#FF0040]', label: 'Cancelled' },
};

const urgencyStyle: Record<string, string> = {
  Emergency: 'bg-[#FF0040] text-white',
  High:      'bg-orange-500 text-white',
  Normal:    'bg-blue-500 text-white',
};

const reqColors = ['#FF0040', '#7B2FFF', '#00B4FF', '#00E5A0', '#FF7B00'];

const initialReqs = [
  { id: 1, type: 'A+', hospital: 'City General Hospital', city: 'New York, NY', units: 2, urgency: 'High',      status: 'Pending'     as ReqStatus, date: 'Sept 21, 2026', note: 'Post-surgical recovery after appendectomy' },
  { id: 2, type: 'A+', hospital: "St. Mary's Medical",   city: 'Boston, MA',   units: 1, urgency: 'Normal',    status: 'Completed'   as ReqStatus, date: 'Sept 15, 2026', note: 'Routine transfusion therapy' },
  { id: 3, type: 'A+', hospital: 'Regional Medical Ctr', city: 'New York, NY', units: 2, urgency: 'Emergency', status: 'In Progress' as ReqStatus, date: 'Sept 10, 2026', note: 'Emergency surgery - trauma unit' },
  { id: 4, type: 'O+', hospital: 'Lakewood Medical',     city: 'New York, NY', units: 3, urgency: 'High',      status: 'Accepted'    as ReqStatus, date: 'Aug 30, 2026',  note: 'Chemotherapy support' },
  { id: 5, type: 'A+', hospital: 'University Hospital',  city: 'New York, NY', units: 1, urgency: 'Normal',    status: 'Cancelled'   as ReqStatus, date: 'Aug 20, 2026',  note: 'Cancelled — condition resolved' },
];

export function RequesterMyRequests() {
  const [requests, setRequests] = useState(initialReqs);
  const [tab, setTab]           = useState<ReqStatus | 'All'>('All');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [cancelId, setCancelId] = useState<number | null>(null);

  const tabs: (ReqStatus | 'All')[] = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];
  const counts = Object.fromEntries(tabs.map(t => [t, t === 'All' ? requests.length : requests.filter(r => r.status === t).length]));
  const visible = tab === 'All' ? requests : requests.filter(r => r.status === tab);

  const doCancel = (id: number) => {
    setRequests(p => p.map(r => r.id === id ? { ...r, status: 'Cancelled' as ReqStatus } : r));
    setCancelId(null);
  };

  return (
    <Shell title="My Blood Requests" subtitle={`${requests.length} total requests · ${requests.filter(r => ['Pending','Accepted','In Progress'].includes(r.status)).length} active`}
      actions={
        <Link to="/dashboard/requester/create-request"
          className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all glow-red-sm">
          + New Request
        </Link>
      }>

      {/* Tabs */}
      <div className="flex gap-2 mb-7 flex-wrap">
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${
              tab === t ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B] hover:text-[#00032B]'
            }`}>
            {t}
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-black ${tab === t ? 'bg-white/20 text-white' : 'bg-[var(--muted)] text-[#00032B]'}`}>
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {/* Request list */}
      <div className="flex flex-col gap-4">
        {visible.length === 0 && (
          <div className="bg-white rounded-2xl border border-[var(--border)] p-12 text-center">
            <span className="font-mono-label text-4xl text-[var(--muted-foreground)]">◆</span>
            <p className="font-display font-bold text-[#00032B] mt-3 mb-1">No requests</p>
            <p className="text-sm text-[var(--muted-foreground)]">No {tab.toLowerCase()} requests found.</p>
          </div>
        )}

        {visible.map((req, idx) => {
          const sm = statusMeta[req.status];
          const color = reqColors[idx % reqColors.length];
          const isOpen = expanded === req.id;
          return (
            <div key={req.id} className="bg-white rounded-2xl border-2 border-[var(--border)] hover:border-[#00032B]/30 transition-all overflow-hidden">
              {/* Color bar */}
              <div className="flex items-stretch">
                <div className="w-1.5 shrink-0" style={{ background: color }} />

                <div className="flex-1 p-5">
                  <div className="flex items-start gap-4 flex-wrap">
                    {/* Blood type badge */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl text-white shrink-0 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}>
                      {req.type}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                        <div>
                          <p className="font-display font-bold text-[#00032B] text-base leading-tight">{req.hospital}</p>
                          <p className="text-xs text-[var(--muted-foreground)] font-mono-label mt-0.5">{req.city} · {req.date}</p>
                        </div>
                        <div className="flex gap-2 flex-wrap shrink-0">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${urgencyStyle[req.urgency]}`}>{req.urgency}</span>
                          <span className={`text-xs px-2.5 py-1.5 rounded-full font-semibold flex items-center gap-1.5 ${sm.bg} ${sm.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sm.dot}`} />{req.status}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-5 text-xs font-mono-label text-[var(--muted-foreground)] mb-4">
                        <span>◆ {req.units} units needed</span>
                        <span className="text-[var(--border)]">·</span>
                        <span>{sm.label}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <button onClick={() => setExpanded(isOpen ? null : req.id)}
                          className="text-xs border-2 border-[var(--border)] px-3 py-1.5 rounded-lg font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-colors">
                          {isOpen ? 'Hide Details ↑' : 'View Details ↓'}
                        </button>
                        {req.status === 'Pending' && (
                          <>
                            <Link to="/dashboard/requester/create-request"
                              className="text-xs border-2 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                              style={{ borderColor: color, color }}>
                              Edit Request
                            </Link>
                            <button onClick={() => setCancelId(req.id)}
                              className="text-xs border-2 border-[#FF0040]/30 text-[#FF0040] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#FF0040]/5 transition-colors">
                              Cancel
                            </button>
                          </>
                        )}
                        {req.status === 'Completed' && (
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-semibold">✓ Fulfilled</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="mt-5 pt-5 border-t border-[var(--border)] grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-1">Request Note</p>
                        <p className="text-sm text-[#00032B] font-medium">{req.note}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Status Timeline</p>
                        <div className="flex items-center gap-1">
                          {(['Pending','Accepted','In Progress','Completed'] as ReqStatus[]).map((s, i) => {
                            const done = ['Pending','Accepted','In Progress','Completed'].indexOf(req.status) >= i;
                            return (
                              <div key={s} className="flex items-center gap-1">
                                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${done ? 'bg-[#FF0040]' : 'bg-[var(--border)]'}`} />
                                {i < 3 && <div className={`w-5 h-0.5 ${done ? 'bg-[#FF0040]' : 'bg-[var(--border)]'}`} />}
                              </div>
                            );
                          })}
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] mt-1 font-mono-label">Current: <strong className={sm.text}>{req.status}</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancel modal */}
      {cancelId !== null && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center text-[#FF0040] font-mono-label text-xl mb-5">◆</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2">Cancel this request?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">This request will be marked as cancelled. You can create a new one anytime.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Keep It</button>
              <button onClick={() => doCancel(cancelId)} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#cc0033] transition-colors">Cancel Request</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════════════════════════════════ */
type NotifType = 'request_accepted' | 'request_rejected' | 'donor_found' | 'request_completed' | 'system' | 'emergency';

interface Notif {
  id: number; type: NotifType; title: string; body: string; time: string; read: boolean; link?: string;
}

const notifMeta: Record<NotifType, { icon: string; color: string; bg: string }> = {
  request_accepted:  { icon: '✓', color: 'text-green-700',       bg: 'bg-green-100' },
  request_rejected:  { icon: '✕', color: 'text-[#FF0040]',       bg: 'bg-red-100' },
  donor_found:       { icon: '◆', color: 'text-[#7B2FFF]',       bg: 'bg-purple-100' },
  request_completed: { icon: '◈', color: 'text-[#00B4FF]',       bg: 'bg-blue-100' },
  system:            { icon: '◎', color: 'text-[var(--muted-foreground)]', bg: 'bg-[var(--muted)]' },
  emergency:         { icon: '!',  color: 'text-white',           bg: 'bg-[#FF0040]' },
};

const initialNotifs: Notif[] = [
  { id: 1,  type: 'emergency',         title: 'Emergency Request Alert',          body: 'Your emergency blood request at City General Hospital has been escalated. A nurse will contact you shortly.',  time: '5 min ago',   read: false, link: '/dashboard/requester/my-requests' },
  { id: 2,  type: 'donor_found',       title: 'Donor Match Found',                body: 'Marcus Rivera (O-) has been matched to your request #003 at Regional Medical Center.',                         time: '1 hr ago',    read: false, link: '/dashboard/requester/my-requests' },
  { id: 3,  type: 'request_accepted',  title: 'Donation Request Accepted',        body: 'David Kim accepted your blood request for Lakewood Medical. Expect contact within 2 hours.',                    time: '3 hrs ago',   read: false, link: '/dashboard/requester/my-requests' },
  { id: 4,  type: 'request_completed', title: 'Request Fulfilled — Thank You!',   body: 'Your blood request #002 at St. Mary\'s Medical has been marked complete. Stay well!',                          time: 'Sept 15',     read: true,  link: '/dashboard/requester/my-requests' },
  { id: 5,  type: 'system',            title: 'Profile Verification Complete',     body: 'Your identity has been successfully verified. You can now post emergency blood requests.',                       time: 'Sept 10',     read: true },
  { id: 6,  type: 'request_rejected',  title: 'Donor Declined Request',           body: 'A donor declined your request #001. We\'re searching for another compatible donor automatically.',              time: 'Sept 8',      read: true,  link: '/dashboard/requester/my-requests' },
  { id: 7,  type: 'donor_found',       title: 'New Donor in Your Area',           body: '3 new donors with blood type A+ registered near New York. Your pending requests may be fulfilled sooner.',      time: 'Sept 5',      read: true },
  { id: 8,  type: 'system',            title: 'BloodLink Platform Update',        body: 'We\'ve added real-time donor tracking. You can now follow your request from submission to completion.',          time: 'Sept 1',      read: true },
];

export function RequesterNotifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifs.filter(n => !n.read).length;
  const visible = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;

  const markRead = (id: number) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })));

  return (
    <Shell title="Notifications"
      subtitle={unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
      actions={
        <div className="flex gap-3">
          <div className="flex bg-[var(--muted)] rounded-xl p-1 gap-1">
            {(['all','unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${filter === f ? 'bg-white text-[#00032B] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
                {f} {f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-[#FF0040] text-white rounded-full px-1.5 py-0.5 text-xs">{unreadCount}</span>}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="text-xs text-[var(--muted-foreground)] hover:text-[#FF0040] font-semibold transition-colors border border-[var(--border)] px-3 py-1.5 rounded-lg hover:border-[#FF0040]">
              Mark all read
            </button>
          )}
        </div>
      }>

      {visible.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-14 text-center">
          <span className="font-mono-label text-5xl text-[var(--muted-foreground)]">◎</span>
          <p className="font-display font-bold text-[#00032B] mt-4 mb-1">No unread notifications</p>
          <p className="text-sm text-[var(--muted-foreground)]">You're all caught up.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {visible.map(n => {
          const meta = notifMeta[n.type];
          return (
            <div key={n.id}
              onClick={() => markRead(n.id)}
              className={`group bg-white rounded-2xl border-2 transition-all cursor-pointer ${
                !n.read ? 'border-[#FF0040]/25 shadow-sm hover:border-[#FF0040]/50' : 'border-[var(--border)] hover:border-[#00032B]/20'
              }`}>
              <div className="p-5 flex gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${meta.bg} ${meta.color}`}>
                  {meta.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-bold ${!n.read ? 'text-[#00032B]' : 'text-[#00032B]/80'}`}>{n.title}</p>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF0040] shrink-0 animate-pulse-red" />
                      )}
                    </div>
                    <span className="text-xs font-mono-label text-[var(--muted-foreground)] shrink-0">{n.time}</span>
                  </div>
                  <p className={`text-sm mt-1 leading-relaxed ${!n.read ? 'text-[#00032B]/75' : 'text-[var(--muted-foreground)]'}`}>{n.body}</p>
                  {n.link && (
                    <Link to={n.link} onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs text-[#FF0040] font-semibold mt-2 hover:text-[#cc0033] transition-colors">
                      View details →
                    </Link>
                  )}
                </div>

                {/* Unread badge */}
                {!n.read && (
                  <div className="shrink-0 pt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF0040]" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {notifs.filter(n => n.read).length > 0 && filter === 'all' && (
        <p className="text-center text-xs text-[var(--muted-foreground)] font-mono-label mt-6">
          {notifs.filter(n => n.read).length} read notifications shown above
        </p>
      )}
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════════════════════ */
export function RequesterSettings() {
  const [activeSection, setActiveSection] = useState('account');
  const [saved, setSaved] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState({
    emailRequestUpdates: true,
    emailDonorFound: true,
    emailNewsletter: false,
    smsUrgentAlerts: true,
    smsDonorContact: true,
    pushAllNotifs: true,
    pushDonorMatch: true,
    pushPlatformUpdates: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfilePublic: false,
    showRequestHistory: false,
    allowDonorContact: true,
    dataAnalytics: true,
  });

  const handleSave = (section: string) => {
    setSaved(section);
    setTimeout(() => setSaved(''), 2500);
  };

  const sections = [
    { id: 'account',    label: 'Account Settings',      icon: '◉', color: '#FF0040' },
    { id: 'password',   label: 'Change Password',        icon: '◆', color: '#7B2FFF' },
    { id: 'notifs',     label: 'Notification Prefs',     icon: '◎', color: '#00B4FF' },
    { id: 'privacy',    label: 'Privacy Settings',       icon: '◈', color: '#00E5A0' },
    { id: 'danger',     label: 'Danger Zone',            icon: '⚠', color: '#FF0040' },
  ];

  const Toggle = ({ checked, onChange, label, desc }: { checked: boolean; onChange: () => void; label: string; desc?: string }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-[var(--border)] last:border-0">
      <div>
        <p className="text-sm font-semibold text-[#00032B]">{label}</p>
        {desc && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{desc}</p>}
      </div>
      <button onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${checked ? 'bg-[#FF0040]' : 'bg-gray-200'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );

  return (
    <Shell title="Settings" subtitle="Manage your account, privacy, and preferences">
      {saved && (
        <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
          ✓ {saved} saved
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-3 flex flex-col gap-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeSection === s.id ? 'text-white' : 'text-[var(--secondary-foreground)] hover:bg-[var(--muted)]'
                }`}
                style={activeSection === s.id ? { background: s.color } : {}}>
                <span className="font-mono-label">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Account Settings */}
          {activeSection === 'account' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { l: 'First Name', v: 'Elena', t: 'text' },
                  { l: 'Last Name', v: 'Vasquez', t: 'text' },
                  { l: 'Email Address', v: 'elena.vasquez@email.com', t: 'email' },
                  { l: 'Phone Number', v: '+1 (212) 555-0184', t: 'tel' },
                  { l: 'City', v: 'New York', t: 'text' },
                  { l: 'Date of Birth', v: '1990-03-14', t: 'date' },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type={f.t} defaultValue={f.v}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Preferred Language</label>
                <select className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>
              <button onClick={() => handleSave('Account settings')}
                className="mt-6 bg-[#FF0040] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all glow-red-sm">
                Save Account Settings →
              </button>
            </div>
          )}

          {/* Change Password */}
          {activeSection === 'password' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Change Password</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Use a strong password with at least 8 characters, mixing letters, numbers, and symbols.</p>
              <div className="flex flex-col gap-4 max-w-sm">
                {[
                  { l: 'Current Password', p: 'Enter current password' },
                  { l: 'New Password', p: 'Min. 8 characters' },
                  { l: 'Confirm New Password', p: 'Repeat new password' },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type="password" placeholder={f.p}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#7B2FFF] transition-colors" />
                  </div>
                ))}
                <div className="bg-[var(--muted)] rounded-xl p-4 text-xs text-[var(--muted-foreground)]">
                  <p className="font-semibold text-[#00032B] mb-2">Password requirements:</p>
                  {['At least 8 characters','One uppercase letter','One number','One special character'].map(r => (
                    <p key={r} className="flex items-center gap-2 mt-1"><span className="text-[var(--muted-foreground)]">○</span> {r}</p>
                  ))}
                </div>
                <button onClick={() => handleSave('Password')}
                  className="bg-[#7B2FFF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-700 transition-all">
                  Update Password →
                </button>
              </div>
            </div>
          )}

          {/* Notification Preferences */}
          {activeSection === 'notifs' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Notification Preferences</h2>
              {[
                { heading: 'Email Notifications', icon: '◎', color: '#00B4FF', items: [
                  { key: 'emailRequestUpdates', label: 'Request status updates', desc: 'When your blood request status changes' },
                  { key: 'emailDonorFound', label: 'Donor match found', desc: 'When a donor accepts your request' },
                  { key: 'emailNewsletter', label: 'BloodLink newsletter', desc: 'Monthly updates and platform news' },
                ]},
                { heading: 'SMS Alerts', icon: '◆', color: '#FF0040', items: [
                  { key: 'smsUrgentAlerts', label: 'Urgent request alerts', desc: 'Critical status changes via SMS' },
                  { key: 'smsDonorContact', label: 'Donor contact info', desc: 'Receive donor phone number when accepted' },
                ]},
                { heading: 'Push Notifications', icon: '◈', color: '#7B2FFF', items: [
                  { key: 'pushAllNotifs', label: 'All notifications', desc: 'Enable browser push notifications' },
                  { key: 'pushDonorMatch', label: 'Donor match alerts', desc: 'Instant alert when a donor is matched' },
                  { key: 'pushPlatformUpdates', label: 'Platform updates', desc: 'New features and announcements' },
                ]},
              ].map(group => (
                <div key={group.heading} className="mb-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono-label text-sm" style={{ color: group.color }}>{group.icon}</span>
                    <h3 className="font-semibold text-sm text-[#00032B]">{group.heading}</h3>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl px-4 divide-y divide-[var(--border)]">
                    {group.items.map(item => (
                      <Toggle key={item.key}
                        checked={(notifPrefs as any)[item.key]}
                        onChange={() => setNotifPrefs(p => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                        label={item.label} desc={item.desc} />
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => handleSave('Notification preferences')}
                className="bg-[#00B4FF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-sky-600 transition-all">
                Save Preferences →
              </button>
            </div>
          )}

          {/* Privacy */}
          {activeSection === 'privacy' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Privacy Settings</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Control who can see your information and how your data is used.</p>
              <div className="bg-[var(--background)] rounded-xl px-4 mb-7 divide-y divide-[var(--border)]">
                <Toggle checked={privacy.showProfilePublic}
                  onChange={() => setPrivacy(p => ({ ...p, showProfilePublic: !p.showProfilePublic }))}
                  label="Public profile" desc="Allow donors to view your basic profile" />
                <Toggle checked={privacy.showRequestHistory}
                  onChange={() => setPrivacy(p => ({ ...p, showRequestHistory: !p.showRequestHistory }))}
                  label="Show request history" desc="Display past requests on your profile" />
                <Toggle checked={privacy.allowDonorContact}
                  onChange={() => setPrivacy(p => ({ ...p, allowDonorContact: !p.allowDonorContact }))}
                  label="Allow donor contact" desc="Donors can message you directly" />
                <Toggle checked={privacy.dataAnalytics}
                  onChange={() => setPrivacy(p => ({ ...p, dataAnalytics: !p.dataAnalytics }))}
                  label="Analytics & improvement" desc="Help us improve BloodLink with anonymized usage data" />
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-4 text-sm text-[var(--muted-foreground)] mb-5">
                <p className="font-semibold text-[#00032B] mb-1">Your data rights</p>
                Your personal and medical data is encrypted and never sold. You can <Link to="/privacy" className="text-[#FF0040] hover:underline">download or delete</Link> your data at any time.
              </div>
              <button onClick={() => handleSave('Privacy settings')}
                className="bg-[#00E5A0] text-[#00032B] px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-400 transition-all">
                Save Privacy Settings →
              </button>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === 'danger' && (
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-display font-bold text-[#00032B] text-lg mb-5">Danger Zone</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-orange-300 transition-colors">
                    <div>
                      <p className="font-semibold text-sm text-[#00032B]">Deactivate Account</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Temporarily disable your account. You can reactivate anytime.</p>
                    </div>
                    <button className="text-xs border-2 border-orange-400 text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors shrink-0 ml-4">
                      Deactivate
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-[#FF0040]/50 transition-colors">
                    <div>
                      <p className="font-semibold text-sm text-[#00032B]">Export My Data</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Download a copy of all your data in JSON format.</p>
                    </div>
                    <button className="text-xs border-2 border-[var(--border)] text-[#00032B] px-4 py-2 rounded-lg font-semibold hover:border-[#00032B] transition-colors shrink-0 ml-4">
                      Export
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#FF0040]/30 bg-red-50">
                    <div>
                      <p className="font-semibold text-sm text-[#FF0040]">Delete Account</p>
                      <p className="text-xs text-[#FF0040]/70 mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
                    </div>
                    <button onClick={() => setShowDeleteConfirm(true)}
                      className="text-xs bg-[#FF0040] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#cc0033] transition-colors shrink-0 ml-4">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h3 className="font-display font-bold text-[#00032B] mb-4">Linked Sessions</h3>
                {[
                  { device: 'Chrome on MacBook Pro', location: 'New York, NY', time: 'Active now', current: true },
                  { device: 'Safari on iPhone 15', location: 'New York, NY', time: '2 hours ago', current: false },
                  { device: 'Firefox on Windows', location: 'Unknown', time: '3 days ago', current: false },
                ].map(session => (
                  <div key={session.device} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#00032B] flex items-center gap-2">
                        {session.device}
                        {session.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{session.location} · {session.time}</p>
                    </div>
                    {!session.current && (
                      <button className="text-xs text-[#FF0040] border border-[#FF0040]/30 px-3 py-1.5 rounded-lg hover:bg-[#FF0040]/5 transition-colors font-semibold">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirm modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#FF0040]/20">
            <div className="w-14 h-14 rounded-2xl bg-[#FF0040] flex items-center justify-center text-white font-bold text-2xl mb-5 mx-auto glow-red">!</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2 text-center">Delete Account?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-2 text-center">This will permanently delete your account, all requests, and all data. <strong className="text-[#FF0040]">This cannot be undone.</strong></p>
            <input type="text" placeholder='Type "DELETE" to confirm'
              className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm text-center focus:outline-none focus:border-[#FF0040] mb-5 transition-colors" />
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Cancel</button>
              <button className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-semibold hover:bg-[#cc0033] transition-colors">Delete Forever</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FIND DONORS (in-dashboard)
══════════════════════════════════════════════════════════════════════════ */
const BLOOD_TYPES = ['All','A+','A-','B+','B-','AB+','AB-','O+','O-'];

const COMPAT_WITH: Record<string, string[]> = {
  'A+': ['A+','A-','O+','O-'], 'A-': ['A-','O-'],
  'B+': ['B+','B-','O+','O-'], 'B-': ['B-','O-'],
  'AB+':['A+','A-','B+','B-','AB+','AB-','O+','O-'], 'AB-':['A-','B-','AB-','O-'],
  'O+': ['O+','O-'], 'O-': ['O-'],
};

const DONORS = [
  { id:1,  name:'Marcus Rivera',    blood:'O-',  city:'New York',    available:true,  donations:14, lastDonated:'Aug 20, 2026', avatar:'MR', color:'#FF0040', response:'98%',  rating:4.9 },
  { id:2,  name:'Priya Sharma',     blood:'AB+', city:'Boston',      available:true,  donations:8,  lastDonated:'Aug 15, 2026', avatar:'PS', color:'#7B2FFF', response:'95%',  rating:4.8 },
  { id:3,  name:'James Okafor',     blood:'B+',  city:'Chicago',     available:false, donations:22, lastDonated:'Jul 30, 2026', avatar:'JO', color:'#00B4FF', response:'92%',  rating:4.7 },
  { id:4,  name:'David Kim',        blood:'O+',  city:'Seattle',     available:true,  donations:11, lastDonated:'Sept 5, 2026', avatar:'DK', color:'#FF7B00', response:'97%',  rating:4.9 },
  { id:5,  name:'Fatima Al-Hassan', blood:'A-',  city:'Houston',     available:false, donations:17, lastDonated:'Aug 10, 2026', avatar:'FA', color:'#FF0040', response:'89%',  rating:4.6 },
  { id:6,  name:'Luca Bianchi',     blood:'B-',  city:'Los Angeles', available:true,  donations:3,  lastDonated:'Sept 8, 2026', avatar:'LB', color:'#7B2FFF', response:'100%', rating:5.0 },
  { id:7,  name:'Ana Pérez',        blood:'AB-', city:'Miami',       available:true,  donations:9,  lastDonated:'Aug 22, 2026', avatar:'AP', color:'#00B4FF', response:'94%',  rating:4.7 },
  { id:8,  name:'Yuki Tanaka',      blood:'A+',  city:'New York',    available:true,  donations:6,  lastDonated:'Sept 1, 2026', avatar:'YT', color:'#00E5A0', response:'96%',  rating:4.8 },
  { id:9,  name:'Carlos Mendez',    blood:'O-',  city:'Dallas',      available:true,  donations:19, lastDonated:'Sept 3, 2026', avatar:'CM', color:'#FF0040', response:'91%',  rating:4.6 },
  { id:10, name:'Sara Johansson',   blood:'A+',  city:'Boston',      available:false, donations:4,  lastDonated:'Aug 5, 2026',  avatar:'SJ', color:'#00E5A0', response:'88%',  rating:4.5 },
  { id:11, name:'Kwame Asante',     blood:'B+',  city:'Atlanta',     available:true,  donations:31, lastDonated:'Aug 28, 2026', avatar:'KA', color:'#00B4FF', response:'99%',  rating:5.0 },
  { id:12, name:'Nadia Kovač',      blood:'O+',  city:'Chicago',     available:true,  donations:7,  lastDonated:'Sept 10, 2026',avatar:'NK', color:'#FF7B00', response:'93%',  rating:4.7 },
];

type ModalState = { donor: typeof DONORS[0]; step: 'form' | 'sent' } | null;

export function RequesterFindDonors() {
  const [search, setSearch]       = useState('');
  const [bloodFilter, setBlood]   = useState('All');
  const [cityFilter, setCity]     = useState('');
  const [availOnly, setAvailOnly] = useState(false);
  const [compatMode, setCompat]   = useState(false);
  const [modal, setModal]         = useState<ModalState>(null);
  const [requested, setRequested] = useState<number[]>([]);
  const [note, setNote]           = useState('');
  const [urgency, setUrgency]     = useState('Normal');
  const [units, setUnits]         = useState(1);

  const myBlood = 'A+';
  const compatTypes = COMPAT_WITH[myBlood] ?? [];

  const filtered = DONORS.filter(d => {
    if (availOnly && !d.available) return false;
    if (compatMode && !compatTypes.includes(d.blood)) return false;
    if (bloodFilter !== 'All' && d.blood !== bloodFilter) return false;
    if (cityFilter && !d.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSend = () => {
    if (!modal) return;
    setRequested(p => [...p, modal.donor.id]);
    setModal({ ...modal, step: 'sent' });
    setNote(''); setUrgency('Normal'); setUnits(1);
  };

  const stars = (r: number) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

  return (
    <Shell title="Find Donors" subtitle={`${DONORS.filter(d => d.available).length} donors available now · ${DONORS.length} total in network`}>

      {/* Compatible donor callout */}
      <div className="bg-gradient-to-r from-[#00032B] via-[#0a0f45] to-[#00032B] rounded-2xl p-5 mb-6 text-white flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF0040] flex items-center justify-center font-display font-black text-lg shadow-lg">{myBlood}</div>
          <div>
            <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-0.5">Your Blood Type</p>
            <p className="font-display font-bold text-lg">Compatible donors for {myBlood}</p>
            <p className="text-white/55 text-xs">Donors with: {compatTypes.join(', ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/60">{compatMode ? 'Compatible only' : 'All blood types'}</span>
          <button onClick={() => setCompat(!compatMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${compatMode ? 'bg-[#FF0040]' : 'bg-white/20'}`}>
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${compatMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-5 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-3 items-start">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] text-sm">◍</span>
            <input type="text" placeholder="Search donor name..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border-2 border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
          </div>

          {/* City */}
          <div className="min-w-[140px]">
            <input type="text" placeholder="City..." value={cityFilter}
              onChange={e => setCity(e.target.value)}
              className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
          </div>

          {/* Available toggle */}
          <button onClick={() => setAvailOnly(!availOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${availOnly ? 'bg-green-500 border-green-500 text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-green-500 hover:text-green-700'}`}>
            <span className={`w-2 h-2 rounded-full ${availOnly ? 'bg-white' : 'bg-green-500'}`} />
            Available Only
          </button>

          {/* Clear */}
          {(search || cityFilter || bloodFilter !== 'All' || availOnly || compatMode) && (
            <button onClick={() => { setSearch(''); setCity(''); setBlood('All'); setAvailOnly(false); setCompat(false); }}
              className="px-4 py-2.5 text-xs text-[#FF0040] font-semibold hover:text-[#cc0033] border border-[#FF0040]/30 rounded-xl hover:bg-[#FF0040]/5 transition-colors">
              Clear all ×
            </button>
          )}
        </div>

        {/* Blood type pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border)]">
          <span className="text-xs font-mono-label text-[var(--muted-foreground)] self-center mr-1">Blood Type:</span>
          {BLOOD_TYPES.map(bt => {
            const isCompat = compatTypes.includes(bt) && bt !== 'All';
            return (
              <button key={bt} onClick={() => setBlood(bt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all relative ${
                  bloodFilter === bt ? 'bg-[#FF0040] border-[#FF0040] text-white' : 'border-[var(--border)] text-[#00032B] hover:border-[#FF0040]'
                }`}>
                {bt}
                {isCompat && bloodFilter !== bt && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 border border-white" />
                )}
              </button>
            );
          })}
          <span className="text-xs text-green-600 font-mono-label self-center ml-1">● compatible with your {myBlood}</span>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide">
          {filtered.length} donor{filtered.length !== 1 ? 's' : ''} found
          {compatMode && <span className="ml-2 text-green-600 font-semibold">· compatible only</span>}
        </p>
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <span className="w-2 h-2 rounded-full bg-green-400" /> Available
          <span className="w-2 h-2 rounded-full bg-gray-300 ml-2" /> Unavailable
        </div>
      </div>

      {/* Donor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(donor => {
          const isCompat = compatTypes.includes(donor.blood);
          const isRequested = requested.includes(donor.id);
          return (
            <div key={donor.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg group ${
                isCompat ? 'border-green-200 hover:border-green-400' : 'border-[var(--border)] hover:border-[#00032B]/25'
              } ${!donor.available ? 'opacity-70' : ''}`}>

              {/* Card header */}
              <div className="relative h-20 flex items-end px-4 pb-3"
                style={{ background: `linear-gradient(135deg, ${donor.color}18, ${donor.color}08)` }}>
                {isCompat && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    ✓ Compatible
                  </div>
                )}
                <div className="absolute top-3 left-4 font-display font-black text-3xl opacity-10" style={{ color: donor.color }}>
                  {donor.blood}
                </div>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-lg relative z-10"
                  style={{ background: `linear-gradient(135deg, ${donor.color}, ${donor.color}bb)` }}>
                  {donor.avatar}
                </div>
              </div>

              {/* Card body */}
              <div className="px-4 pt-2 pb-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-display font-bold text-[#00032B] text-base leading-tight">{donor.name}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{donor.city}</p>
                  </div>
                  <span className="font-display font-black text-lg shrink-0" style={{ color: donor.color }}>{donor.blood}</span>
                </div>

                {/* Stars + response */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-amber-400 tracking-tighter">{stars(donor.rating)}</span>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono-label">{donor.rating}</span>
                  <span className="text-[var(--border)]">·</span>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono-label">{donor.response} response</span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono-label text-[var(--muted-foreground)] mb-3">
                  <span>◆ {donor.donations} donations</span>
                  <span className={`font-bold flex items-center gap-1 ${donor.available ? 'text-green-600' : 'text-gray-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${donor.available ? 'bg-green-500' : 'bg-gray-300'}`} />
                    {donor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <p className="text-xs text-[var(--muted-foreground)] font-mono-label mb-3">
                  Last donated: {donor.lastDonated}
                </p>

                {/* Action buttons */}
                {donor.available ? (
                  isRequested ? (
                    <div className="w-full bg-green-100 text-green-700 text-xs font-bold py-2.5 rounded-xl text-center flex items-center justify-center gap-1.5">
                      <span>✓</span> Request Sent
                    </div>
                  ) : (
                    <button onClick={() => setModal({ donor, step: 'form' })}
                      className="w-full text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:scale-[1.02] hover:shadow-md"
                      style={{ background: `linear-gradient(135deg, ${donor.color}, ${donor.color}cc)` }}>
                      Send Donation Request →
                    </button>
                  )
                ) : (
                  <div className="w-full bg-[var(--muted)] text-[var(--muted-foreground)] text-xs font-semibold py-2.5 rounded-xl text-center">
                    Currently Unavailable
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-14 text-center">
          <span className="font-mono-label text-4xl text-[var(--muted-foreground)]">◍</span>
          <p className="font-display font-bold text-[#00032B] mt-4 mb-1">No donors found</p>
          <p className="text-sm text-[var(--muted-foreground)]">Try adjusting your filters or remove the compatible-only toggle.</p>
        </div>
      )}

      {/* Request modal */}
      {modal && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-md w-full shadow-2xl">
            {modal.step === 'sent' ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center text-green-500 font-bold text-3xl mx-auto mb-5">✓</div>
                <p className="font-display text-xl font-black text-[#00032B] mb-1">Request Sent!</p>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">
                  Your request has been sent to <strong className="text-[#00032B]">{modal.donor.name}</strong>.
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mb-6">They typically respond within {modal.donor.response.includes('9') ? '1–2 hours' : '2–4 hours'}.</p>
                <button onClick={() => setModal(null)}
                  className="w-full bg-[#00032B] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#FF0040] transition-all">
                  Done
                </button>
              </div>
            ) : (
              /* Form state */
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${modal.donor.color}, ${modal.donor.color}bb)` }}>
                    {modal.donor.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-[#00032B] text-lg">{modal.donor.name}</p>
                      {compatTypes.includes(modal.donor.blood) && (
                        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Compatible</span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {modal.donor.blood} · {modal.donor.city} · {modal.donor.donations} donations
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-amber-400">{stars(modal.donor.rating)}</span>
                      <span className="text-xs text-[var(--muted-foreground)] font-mono-label ml-1">{modal.donor.response} response rate</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-5">
                  {/* Urgency */}
                  <div>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-2">Urgency Level</label>
                    <div className="flex gap-2">
                      {['Normal','High','Emergency'].map(u => (
                        <button key={u} onClick={() => setUrgency(u)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                            urgency === u
                              ? u === 'Emergency' ? 'bg-[#FF0040] border-[#FF0040] text-white'
                              : u === 'High'      ? 'bg-orange-500 border-orange-500 text-white'
                              :                    'bg-[#00032B] border-[#00032B] text-white'
                              : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'
                          }`}>
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Units */}
                  <div>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-2">Units Needed</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setUnits(Math.max(1, units - 1))}
                        className="w-9 h-9 rounded-xl bg-[var(--muted)] font-bold text-lg hover:bg-[#FF0040] hover:text-white transition-colors">−</button>
                      <span className="w-12 text-center font-display font-black text-xl text-[#00032B]">{units}</span>
                      <button onClick={() => setUnits(Math.min(10, units + 1))}
                        className="w-9 h-9 rounded-xl bg-[var(--muted)] font-bold text-lg hover:bg-[#FF0040] hover:text-white transition-colors">+</button>
                      <span className="text-xs text-[var(--muted-foreground)] font-mono-label">unit{units > 1 ? 's' : ''} of blood</span>
                    </div>
                  </div>

                  {/* Hospital */}
                  <div>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-2">Hospital / Location</label>
                    <input type="text" placeholder="e.g. City General Hospital, New York"
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-2">Message to Donor</label>
                    <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
                      placeholder="Describe your need — blood type required, hospital, reason for request, any urgency details..."
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] resize-none transition-colors" />
                  </div>
                </div>

                <div className="bg-[var(--muted)] rounded-xl p-3 mb-5 flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
                  <span className="text-[#FF0040] font-bold shrink-0">◆</span>
                  Your contact details will be shared with the donor once they accept.
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setModal(null)}
                    className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSend}
                    className={`flex-1 text-white py-3 rounded-xl text-sm font-bold transition-all ${urgency === 'Emergency' ? 'bg-[#FF0040] hover:bg-[#cc0033]' : 'bg-[#00032B] hover:bg-[#FF0040]'}`}>
                    {urgency === 'Emergency' ? '🚨 Send Emergency Request' : 'Send Request →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
