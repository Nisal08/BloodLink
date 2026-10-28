import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';

/* ─── shared shell ─────────────────────────────────────────────────────── */
function Shell({ title, subtitle, children, actions }: {
  title: string; subtitle?: string; children: ReactNode; actions?: ReactNode;
}) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="donor" userName="Marcus Rivera" activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Donor</p>
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
export function DonorProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 3000); };

  const info = [
    { label: 'Full Name',      value: 'Marcus Rivera',           icon: '◉', editable: true },
    { label: 'Email Address',  value: 'marcus.rivera@email.com', icon: '◎', editable: true },
    { label: 'Phone Number',   value: '+1 (212) 555-0127',       icon: '◷', editable: true },
    { label: 'Date of Birth',  value: 'June 8, 1988',            icon: '◈', editable: true },
    { label: 'City / Location',value: 'New York, NY',            icon: '◆', editable: true },
  ];

  const medical = [
    { label: 'Blood Type',          value: 'O-' },
    { label: 'Weight',              value: '78 kg' },
    { label: 'Known Conditions',    value: 'None' },
    { label: 'Last Health Check',   value: 'Aug 2026' },
  ];

  return (
    <Shell title="My Profile" subtitle="Your donor profile and medical information"
      actions={
        <button onClick={() => editing ? handleSave() : setEditing(true)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${editing
            ? 'bg-[#FF0040] text-white hover:bg-[#cc0033]'
            : 'bg-[#00032B] text-white hover:bg-[#FF0040]'}`}>
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
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-7 flex flex-col items-center text-center">
            <div className="relative mb-5">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FF0040] to-[#FF7B00] flex items-center justify-center text-white font-display font-black text-3xl shadow-lg">
                MR
              </div>
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF0040] rounded-full flex items-center justify-center text-white text-xs shadow-md hover:bg-[#cc0033] transition-colors">✎</button>
              )}
            </div>
            <p className="font-display text-xl font-black text-[#00032B]">Marcus Rivera</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-1">Blood Donor · O-</p>
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">✓ Verified Donor</span>

            {/* Blood type badge */}
            <div className="mt-5 w-full bg-gradient-to-br from-[#FF0040]/10 to-[#FF7B00]/10 rounded-2xl p-4 border border-[#FF0040]/15">
              <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-1">Blood Type</p>
              <p className="font-display text-4xl font-black text-[#FF0040]">O-</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Universal Donor · Rare</p>
            </div>

            <div className="w-full border-t border-[var(--border)] mt-5 pt-5 flex flex-col gap-3">
              {[
                { label: 'Member Since',     value: 'Mar 2024' },
                { label: 'Total Donations',  value: '14' },
                { label: 'Lives Saved',      value: '14' },
                { label: 'Next Eligible',    value: 'Oct 15, 2026' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</span>
                  <span className="text-sm font-bold text-[#00032B]">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency contact */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#00032B] text-sm">Emergency Contact</h3>
              <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-2 py-0.5 rounded-full">Important</span>
            </div>
            {[
              { label: 'Name',     value: 'Sofia Rivera' },
              { label: 'Relation', value: 'Spouse' },
              { label: 'Phone',    value: '+1 (212) 555-0188' },
            ].map(f => (
              <div key={f.label} className="mb-3">
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1">{f.label}</p>
                {editing ? (
                  <input defaultValue={f.value}
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

          {/* Medical */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#7B2FFF]/10 flex items-center justify-center">
                <span className="font-mono-label text-[#7B2FFF]">◆</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-[#00032B]">Medical Information</h2>
                <p className="text-xs text-[var(--muted-foreground)]">Used for donor eligibility and safety</p>
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

          {/* Donation progress */}
          <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="font-mono-label text-white">◈</span>
              </div>
              <h2 className="font-display font-bold">Donation Cooldown</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[
                { label: 'Last Donated',  value: 'Aug 20, 2026' },
                { label: 'Next Eligible', value: 'Oct 15, 2026' },
                { label: 'Days Left',     value: '24 days' },
              ].map(s => (
                <div key={s.label} className="bg-white/8 rounded-xl p-3 border border-white/10 text-center">
                  <p className="text-xs text-white/45 font-mono-label mb-1">{s.label}</p>
                  <p className="font-bold text-sm">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-2.5 rounded-full bg-gradient-to-r from-[#FF0040] to-[#FF7B00] transition-all" style={{ width: '57%' }} />
            </div>
            <p className="text-xs text-white/40 font-mono-label mt-2">57% of 56-day cooldown elapsed</p>
          </div>

          {/* Account status */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <h2 className="font-display font-bold text-[#00032B] mb-4">Account Status</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Verification', value: 'Verified',    ok: true  },
                { label: 'Account Type', value: 'Donor',       ok: true  },
                { label: '2FA',          value: 'Disabled',    ok: false },
              ].map(s => (
                <div key={s.label} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1">{s.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-green-400' : 'bg-amber-400'}`} />
                    <p className="text-sm font-bold text-[#00032B]">{s.value}</p>
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
   AVAILABILITY PAGE
══════════════════════════════════════════════════════════════════════════ */
const BLOOD_COMPAT: Record<string, { canDonateTo: string[]; canReceiveFrom: string[] }> = {
  'O-':  { canDonateTo: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], canReceiveFrom: ['O-'] },
  'O+':  { canDonateTo: ['A+','B+','AB+','O+'],                       canReceiveFrom: ['O+','O-'] },
  'A-':  { canDonateTo: ['A+','A-','AB+','AB-'],                      canReceiveFrom: ['A-','O-'] },
  'A+':  { canDonateTo: ['A+','AB+'],                                  canReceiveFrom: ['A+','A-','O+','O-'] },
  'B-':  { canDonateTo: ['B+','B-','AB+','AB-'],                      canReceiveFrom: ['B-','O-'] },
  'B+':  { canDonateTo: ['B+','AB+'],                                  canReceiveFrom: ['B+','B-','O+','O-'] },
  'AB-': { canDonateTo: ['AB+','AB-'],                                 canReceiveFrom: ['A-','B-','O-','AB-'] },
  'AB+': { canDonateTo: ['AB+'],                                        canReceiveFrom: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
};

const DEMAND: Record<string, { level: 'Critical' | 'High' | 'Medium' | 'Low'; donors: number; requests: number }> = {
  'O-':  { level: 'Critical', donors: 48,  requests: 127 },
  'O+':  { level: 'High',     donors: 142, requests: 203 },
  'A-':  { level: 'High',     donors: 67,  requests: 98  },
  'A+':  { level: 'Medium',   donors: 218, requests: 187 },
  'B-':  { level: 'Critical', donors: 29,  requests: 84  },
  'B+':  { level: 'Medium',   donors: 134, requests: 112 },
  'AB-': { level: 'Low',      donors: 54,  requests: 31  },
  'AB+': { level: 'Low',      donors: 89,  requests: 57  },
};

const demandStyle: Record<string, { bg: string; text: string; bar: string }> = {
  Critical: { bg: 'bg-red-50',    text: 'text-[#FF0040]',   bar: 'bg-[#FF0040]' },
  High:     { bg: 'bg-orange-50', text: 'text-orange-600',  bar: 'bg-orange-500' },
  Medium:   { bg: 'bg-blue-50',   text: 'text-blue-600',    bar: 'bg-blue-500' },
  Low:      { bg: 'bg-green-50',  text: 'text-green-700',   bar: 'bg-green-500' },
};

const AVAIL_DONORS = [
  { name: 'James Okafor',     blood: 'O-', city: 'Chicago',     available: true,  avatar: 'JO', color: '#FF0040' },
  { name: 'Priya Sharma',     blood: 'O-', city: 'Boston',      available: true,  avatar: 'PS', color: '#7B2FFF' },
  { name: 'Fatima Al-Hassan', blood: 'B-', city: 'Houston',     available: false, avatar: 'FA', color: '#FF7B00' },
  { name: 'Luca Bianchi',     blood: 'B-', city: 'Los Angeles', available: true,  avatar: 'LB', color: '#00B4FF' },
  { name: 'Ana Pérez',        blood: 'O+', city: 'Miami',       available: true,  avatar: 'AP', color: '#00E5A0' },
  { name: 'David Kim',        blood: 'A-', city: 'Seattle',     available: true,  avatar: 'DK', color: '#FF0040' },
];

export function DonorAvailability() {
  const [available, setAvailable] = useState(true);
  const myBlood = 'O-';
  const compat = BLOOD_COMPAT[myBlood];

  return (
    <Shell title="Availability" subtitle="Your status, blood demand, and compatible donors in the network">

      {/* My availability toggle */}
      <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white mb-6 flex items-center justify-between flex-wrap gap-5">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FF0040] flex items-center justify-center font-display font-black text-2xl shadow-lg">O-</div>
          <div>
            <p className="font-mono-label text-xs text-white/45 uppercase tracking-widest mb-1">Your Blood Type</p>
            <p className="font-display text-xl font-black">Marcus Rivera · O Negative</p>
            <p className="text-white/55 text-sm">Universal Donor — can donate to all blood types</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-mono-label text-white/40 uppercase tracking-wide mb-0.5">Status</p>
            <p className={`font-bold text-sm ${available ? 'text-green-400' : 'text-gray-400'}`}>{available ? 'Available' : 'Unavailable'}</p>
          </div>
          <button onClick={() => setAvailable(!available)}
            className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors shrink-0 ${available ? 'bg-[#FF0040]' : 'bg-white/20'}`}
            style={{ width: '52px' }}>
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${available ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Blood demand grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <h2 className="font-display font-bold text-[#00032B]">Blood Group Demand</h2>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label mt-0.5">Live demand across the BloodLink network</p>
              </div>
              <span className="text-xs bg-[#FF0040]/10 text-[#FF0040] font-semibold px-3 py-1 rounded-full">Live</span>
            </div>
            <div className="p-5 grid grid-cols-2 gap-3">
              {Object.entries(DEMAND).map(([type, data]) => {
                const ds = demandStyle[data.level];
                const isMyType = type === myBlood;
                const pct = Math.round((data.requests / (data.donors + data.requests)) * 100);
                return (
                  <div key={type}
                    className={`rounded-xl p-4 border-2 transition-all ${isMyType ? 'border-[#FF0040] bg-[#FF0040]/5' : `border-[var(--border)] ${ds.bg} hover:border-[#00032B]/20`}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`font-display font-black text-xl ${isMyType ? 'text-[#FF0040]' : 'text-[#00032B]'}`}>{type}</span>
                        {isMyType && <span className="text-xs bg-[#FF0040] text-white px-2 py-0.5 rounded-full font-semibold">You</span>}
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ds.bg} ${ds.text}`}>{data.level}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-[var(--muted-foreground)] font-mono-label mb-2">
                      <span>◆ {data.donors} donors</span>
                      <span>◎ {data.requests} requests</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/60 overflow-hidden">
                      <div className={`h-1.5 rounded-full ${ds.bar} transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{pct}% demand coverage</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Compatibility panel */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
            <h3 className="font-display font-bold text-[#00032B] mb-4 text-sm">Your Compatibility (O-)</h3>
            <div className="mb-4">
              <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Can Donate To</p>
              <div className="flex flex-wrap gap-1.5">
                {compat.canDonateTo.map(t => (
                  <span key={t} className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Can Receive From</p>
              <div className="flex flex-wrap gap-1.5">
                {compat.canReceiveFrom.map(t => (
                  <span key={t} className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
            <div className="mt-4 bg-[#FF0040]/5 rounded-xl p-3 border border-[#FF0040]/15 text-xs text-[var(--muted-foreground)]">
              <span className="font-bold text-[#FF0040]">O- is universal donor</span> — your blood can be given to patients of any blood type in emergencies.
            </div>
          </div>

          {/* Most needed callout */}
          <div className="bg-gradient-to-br from-[#FF0040] to-[#FF7B00] rounded-2xl p-5 text-white">
            <p className="font-mono-label text-xs text-white/60 uppercase tracking-wide mb-2">Most Critical Right Now</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="font-display font-black text-4xl">O-</div>
              <div>
                <p className="font-bold">Your blood type!</p>
                <p className="text-xs text-white/70">127 open requests</p>
              </div>
            </div>
            <p className="text-xs text-white/70">B- is also critically needed · 84 requests</p>
          </div>
        </div>
      </div>

      {/* Available donors nearby */}
      <div className="mt-6 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-[#00032B]">Donors Available Now</h2>
            <p className="text-xs text-[var(--muted-foreground)] font-mono-label mt-0.5">Compatible and available donors on the network</p>
          </div>
          <Link to="/find-donors" className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033] transition-colors">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-[var(--border)]">
          {AVAIL_DONORS.map(d => (
            <div key={d.name} className={`p-5 flex flex-col items-center text-center hover:bg-[var(--background)] transition-colors ${!d.available ? 'opacity-50' : ''}`}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm shadow-md mb-3"
                style={{ background: `linear-gradient(135deg, ${d.color}, ${d.color}bb)` }}>
                {d.avatar}
              </div>
              <p className="text-xs font-semibold text-[#00032B] leading-tight mb-0.5">{d.name.split(' ')[0]}</p>
              <p className="font-display font-black text-sm" style={{ color: d.color }}>{d.blood}</p>
              <p className="text-xs text-[var(--muted-foreground)] font-mono-label mt-1">{d.city}</p>
              <span className={`mt-2 text-xs px-2 py-0.5 rounded-full font-semibold ${d.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {d.available ? 'Available' : 'Busy'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   BLOOD REQUESTS (links to main page)
══════════════════════════════════════════════════════════════════════════ */
const PREVIEW_REQUESTS = [
  { id: 1, type: 'O-', patient: 'Emergency Surgery Patient', hospital: 'City General Hospital', city: 'New York', urgency: 'Emergency', units: 3, posted: 'Sept 21, 2026', color: '#FF0040' },
  { id: 2, type: 'O-', patient: 'Trauma Victim',             hospital: 'Regional Medical Center', city: 'Chicago',  urgency: 'Emergency', units: 4, posted: 'Sept 20, 2026', color: '#FF0040' },
  { id: 3, type: 'O+', patient: 'Anemia Treatment',          hospital: 'University Hospital',     city: 'Seattle',  urgency: 'Normal',    units: 2, posted: 'Sept 19, 2026', color: '#00E5A0' },
  { id: 4, type: 'A-', patient: 'Scheduled Surgery',         hospital: 'Memorial Hospital',       city: 'Houston',  urgency: 'High',      units: 1, posted: 'Sept 18, 2026', color: '#7B2FFF' },
];

const urgencyStyle: Record<string, string> = {
  Emergency: 'bg-[#FF0040] text-white',
  High:      'bg-orange-500 text-white',
  Normal:    'bg-blue-500 text-white',
};

export function DonorRequests() {
  return (
    <Shell title="Blood Requests" subtitle="Requests matching your blood type — click any to view on the main board"
      actions={
        <Link to="/blood-requests"
          className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
          Open Full Board →
        </Link>
      }>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#00032B] via-[#1a1d4e] to-[#00032B] rounded-2xl p-6 text-white mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-1">Your blood type · O-</p>
          <p className="font-display text-xl font-black">You can help all blood types</p>
          <p className="text-white/55 text-sm mt-1">As an O- donor, every open request on the board is a potential match for you.</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'Open Requests', value: '4', color: '#FF0040' },
            { label: 'Emergency',     value: '2', color: '#FF7B00' },
          ].map(s => (
            <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-center">
              <p className="font-display text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-white/40 font-mono-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Preview cards */}
      <div className="flex flex-col gap-4 mb-6">
        {PREVIEW_REQUESTS.map(req => (
          <Link key={req.id} to="/blood-requests"
            className="bg-white rounded-2xl border-2 border-[var(--border)] hover:border-[#FF0040]/50 hover:shadow-md transition-all overflow-hidden group">
            <div className="flex items-stretch">
              <div className="w-1.5 shrink-0" style={{ background: req.color }} />
              <div className="flex-1 p-5 flex items-center gap-4 flex-wrap">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-lg text-white shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${req.color}, ${req.color}bb)` }}>
                  {req.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[#00032B]">{req.patient}</p>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{req.hospital} · {req.city} · {req.posted}</p>
                  <div className="flex gap-4 text-xs text-[var(--muted-foreground)] mt-1">
                    <span>◆ {req.units} units needed</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${urgencyStyle[req.urgency]}`}>{req.urgency}</span>
                  <span className="text-xs text-[#FF0040] font-semibold group-hover:translate-x-1 transition-transform">View →</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA to main board */}
      <div className="bg-[#FF0040]/5 border-2 border-[#FF0040]/20 rounded-2xl p-6 text-center">
        <p className="font-display text-lg font-bold text-[#00032B] mb-1">See all open requests on the live board</p>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">Filter by urgency, blood type, location and accept donations directly.</p>
        <Link to="/blood-requests"
          className="inline-flex items-center gap-2 bg-[#FF0040] text-white px-7 py-3 rounded-xl font-bold text-sm hover:bg-[#cc0033] transition-all">
          Open Blood Request Board →
        </Link>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════════════════════════════════ */
type DNotifType = 'request_received' | 'request_accepted' | 'thank_you' | 'reminder' | 'system' | 'achievement';

interface DNotif {
  id: number; type: DNotifType; title: string; body: string; time: string; read: boolean; link?: string;
}

const dNotifMeta: Record<DNotifType, { icon: string; color: string; bg: string }> = {
  request_received: { icon: '◆', color: 'text-[#FF0040]',       bg: 'bg-red-100' },
  request_accepted: { icon: '✓', color: 'text-green-700',       bg: 'bg-green-100' },
  thank_you:        { icon: '♥', color: 'text-[#7B2FFF]',       bg: 'bg-purple-100' },
  reminder:         { icon: '◷', color: 'text-orange-600',      bg: 'bg-orange-100' },
  system:           { icon: '◎', color: 'text-[var(--muted-foreground)]', bg: 'bg-[var(--muted)]' },
  achievement:      { icon: '★', color: 'text-amber-600',       bg: 'bg-amber-100' },
};

const donorNotifs: DNotif[] = [
  { id: 1, type: 'request_received', title: 'Emergency Donation Request',      body: 'Sarah Johnson needs O- blood urgently at City General Hospital. This is an emergency surgery case.',         time: '10 min ago', read: false, link: '/dashboard/donor/requests' },
  { id: 2, type: 'request_received', title: 'New Donation Request',            body: 'Michael Chen (O-) at St. Mary\'s Medical Center has requested your assistance for a high-priority case.',    time: '2 hrs ago',  read: false, link: '/dashboard/donor/requests' },
  { id: 3, type: 'achievement',      title: 'Milestone: 14 Donations!',        body: 'Congratulations Marcus! You\'ve completed 14 donations and are officially a BloodLink Hero.',                 time: 'Sept 20',    read: false },
  { id: 4, type: 'thank_you',        title: 'Thank You from Emma Williams',    body: '"Your donation saved my life. Thank you so much, Marcus. You are truly a hero." — Emma Williams, patient.', time: 'Sept 18',    read: true  },
  { id: 5, type: 'request_accepted', title: 'Donation Confirmed — Sept 15',    body: 'Your donation appointment at Regional Medical Center has been confirmed for Sept 15 at 10:00 AM.',           time: 'Sept 14',    read: true  },
  { id: 6, type: 'reminder',         title: 'Availability Reminder',           body: 'Your availability is set to Off. Turn it on to receive new donation requests from patients near you.',       time: 'Sept 12',    read: true,  link: '/dashboard/donor/availability' },
  { id: 7, type: 'system',           title: 'Profile Verification Complete',   body: 'Your donor profile has been verified. You can now receive urgent and emergency donation requests.',          time: 'Sept 5',     read: true },
  { id: 8, type: 'achievement',      title: 'First Donation Anniversary',      body: 'It\'s been 1 year since your first donation on BloodLink. Thank you for your continued commitment.',         time: 'Mar 15',     read: true },
];

export function DonorNotifications() {
  const [notifs, setNotifs] = useState(donorNotifs);
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
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${filter === f ? 'bg-white text-[#00032B] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
                {f}{f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-[#FF0040] text-white rounded-full px-1.5 py-0.5 text-xs">{unreadCount}</span>}
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
          const meta = dNotifMeta[n.type];
          return (
            <div key={n.id} onClick={() => markRead(n.id)}
              className={`group bg-white rounded-2xl border-2 transition-all cursor-pointer ${
                !n.read ? 'border-[#FF0040]/25 shadow-sm hover:border-[#FF0040]/50' : 'border-[var(--border)] hover:border-[#00032B]/20'
              }`}>
              <div className="p-5 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${meta.bg} ${meta.color}`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-bold ${!n.read ? 'text-[#00032B]' : 'text-[#00032B]/80'}`}>{n.title}</p>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-[#FF0040] shrink-0" />}
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
                {!n.read && <div className="shrink-0 pt-1"><div className="w-2.5 h-2.5 rounded-full bg-[#FF0040]" /></div>}
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DONATION HISTORY
══════════════════════════════════════════════════════════════════════════ */
const HISTORY = [
  { id: 1,  date: 'Aug 20, 2026', hospital: 'City General Hospital',     city: 'New York',  blood: 'O-', units: 1, patient: 'Sarah J.', status: 'Completed', cert: true  },
  { id: 2,  date: 'Jun 14, 2026', hospital: "St. Mary's Medical",        city: 'Boston',    blood: 'O-', units: 1, patient: 'Anonymous', status: 'Completed', cert: true  },
  { id: 3,  date: 'Apr 8, 2026',  hospital: 'Regional Medical Center',   city: 'Chicago',   blood: 'O-', units: 1, patient: 'Anonymous', status: 'Completed', cert: false },
  { id: 4,  date: 'Feb 1, 2026',  hospital: 'Memorial Hospital',         city: 'Houston',   blood: 'O-', units: 1, patient: 'Emma W.',  status: 'Completed', cert: true  },
  { id: 5,  date: 'Dec 5, 2025',  hospital: 'University Hospital',       city: 'Seattle',   blood: 'O-', units: 1, patient: 'Anonymous', status: 'Completed', cert: false },
  { id: 6,  date: 'Oct 12, 2025', hospital: 'Lakewood Medical',          city: 'Denver',    blood: 'O-', units: 1, patient: 'Anonymous', status: 'Completed', cert: true  },
];

export function DonorHistory() {
  const totalUnits = HISTORY.reduce((s, h) => s + h.units, 0);

  return (
    <Shell title="Donation History" subtitle={`${HISTORY.length} donations · ${totalUnits} units contributed`}>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Total Donations', value: HISTORY.length,  icon: '◆', from: '#FF0040', to: '#FF7B00' },
          { label: 'Units Donated',   value: totalUnits,       icon: '◉', from: '#7B2FFF', to: '#a56bff' },
          { label: 'Lives Saved',     value: HISTORY.length,  icon: '♥', from: '#00E5A0', to: '#4dffc6' },
          { label: 'Certificates',    value: HISTORY.filter(h => h.cert).length, icon: '★', from: '#FF7B00', to: '#ffac4d' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[var(--border)] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono-label text-base mb-3 text-white"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
              {s.icon}
            </div>
            <p className="font-display text-3xl font-black text-[#00032B] mb-0.5">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-display font-bold text-[#00032B]">Donation Timeline</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {HISTORY.map((h, idx) => (
            <div key={h.id} className="flex items-center gap-5 px-6 py-4 hover:bg-[var(--background)] transition-colors flex-wrap">
              {/* Timeline dot */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#FF0040]" />
                {idx < HISTORY.length - 1 && <div className="w-0.5 h-6 bg-[var(--border)]" />}
              </div>

              {/* Blood badge */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF0040] to-[#FF7B00] flex items-center justify-center font-display font-black text-sm text-white shrink-0">
                {h.blood}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#00032B]">{h.hospital}</p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{h.city} · Patient: {h.patient}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono-label text-[var(--muted-foreground)]">{h.date}</span>
                <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">✓ {h.status}</span>
                {h.cert && (
                  <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2.5 py-1 rounded-full">★ Certificate</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge achievements */}
      <div className="mt-5 bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
        <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-4">Achievements Unlocked</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'First Drop',    desc: 'First donation',     icon: '◆', unlocked: true },
            { label: 'Life Saver',    desc: '5 donations',        icon: '♥', unlocked: true },
            { label: 'Hero',          desc: '10 donations',       icon: '★', unlocked: true },
            { label: 'Legend',        desc: '25 donations',       icon: '◈', unlocked: false },
            { label: 'Champion',      desc: '50 donations',       icon: '◉', unlocked: false },
          ].map(b => (
            <div key={b.label}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all ${b.unlocked ? 'bg-white/10 border-white/20' : 'opacity-30 bg-white/5 border-white/10'}`}>
              <span className={`font-mono-label text-sm ${b.unlocked ? 'text-amber-300' : 'text-white/40'}`}>{b.icon}</span>
              <div>
                <p className="text-xs font-bold leading-tight">{b.label}</p>
                <p className="text-xs text-white/40 font-mono-label">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════════════════════ */
export function DonorSettings() {
  const [activeSection, setActiveSection] = useState('account');
  const [saved, setSaved] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState({
    emailRequestUpdates: true,
    emailDonorAlerts: true,
    emailNewsletter: false,
    smsEmergencyAlerts: true,
    smsDonorRequests: true,
    pushAllNotifs: true,
    pushEmergencyOnly: false,
    pushPlatformUpdates: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfilePublic: true,
    showDonationCount: true,
    allowRequesterContact: true,
    dataAnalytics: true,
  });

  const handleSave = (section: string) => { setSaved(section); setTimeout(() => setSaved(''), 2500); };

  const sections = [
    { id: 'account',  label: 'Account Settings',    icon: '◉', color: '#FF0040' },
    { id: 'password', label: 'Change Password',      icon: '◆', color: '#7B2FFF' },
    { id: 'notifs',   label: 'Notification Prefs',   icon: '◎', color: '#00B4FF' },
    { id: 'privacy',  label: 'Privacy Settings',     icon: '◈', color: '#00E5A0' },
    { id: 'danger',   label: 'Danger Zone',          icon: '⚠', color: '#FF0040' },
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

        {/* Content area */}
        <div className="lg:col-span-3">
          {activeSection === 'account' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { l: 'First Name',     v: 'Marcus',                  t: 'text'  },
                  { l: 'Last Name',      v: 'Rivera',                  t: 'text'  },
                  { l: 'Email Address',  v: 'marcus.rivera@email.com', t: 'email' },
                  { l: 'Phone Number',   v: '+1 (212) 555-0127',       t: 'tel'   },
                  { l: 'City',           v: 'New York',                t: 'text'  },
                  { l: 'Date of Birth',  v: '1988-06-08',              t: 'date'  },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type={f.t} defaultValue={f.v}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Blood Type</label>
                <select defaultValue="O-" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => handleSave('Account settings')}
                className="mt-6 bg-[#FF0040] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
                Save Account Settings →
              </button>
            </div>
          )}

          {activeSection === 'password' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Change Password</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Use a strong password with at least 8 characters, mixing letters, numbers, and symbols.</p>
              <div className="flex flex-col gap-4 max-w-sm">
                {[
                  { l: 'Current Password',      p: 'Enter current password' },
                  { l: 'New Password',           p: 'Min. 8 characters' },
                  { l: 'Confirm New Password',   p: 'Repeat new password' },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type="password" placeholder={f.p}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#7B2FFF] transition-colors" />
                  </div>
                ))}
                <button onClick={() => handleSave('Password')}
                  className="bg-[#7B2FFF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-700 transition-all">
                  Update Password →
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notifs' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Notification Preferences</h2>
              {[
                { heading: 'Email Notifications', icon: '◎', color: '#00B4FF', items: [
                  { key: 'emailRequestUpdates', label: 'Donation request updates',     desc: 'When patients send you a new request' },
                  { key: 'emailDonorAlerts',    label: 'Critical need alerts',         desc: 'Emergency blood shortage alerts near you' },
                  { key: 'emailNewsletter',     label: 'BloodLink newsletter',         desc: 'Monthly platform news and tips' },
                ]},
                { heading: 'SMS Alerts', icon: '◆', color: '#FF0040', items: [
                  { key: 'smsEmergencyAlerts',  label: 'Emergency request SMS',        desc: 'Urgent cases matching your blood type' },
                  { key: 'smsDonorRequests',    label: 'Patient contact via SMS',      desc: 'Receive patient info when you accept' },
                ]},
                { heading: 'Push Notifications', icon: '◈', color: '#7B2FFF', items: [
                  { key: 'pushAllNotifs',        label: 'All notifications',            desc: 'Enable browser push notifications' },
                  { key: 'pushEmergencyOnly',    label: 'Emergency requests only',      desc: 'Only notify for life-critical requests' },
                  { key: 'pushPlatformUpdates',  label: 'Platform updates',             desc: 'New features and announcements' },
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

          {activeSection === 'privacy' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Privacy Settings</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Control your donor profile visibility and data usage.</p>
              <div className="bg-[var(--background)] rounded-xl px-4 mb-7 divide-y divide-[var(--border)]">
                <Toggle checked={privacy.showProfilePublic}
                  onChange={() => setPrivacy(p => ({ ...p, showProfilePublic: !p.showProfilePublic }))}
                  label="Public donor profile" desc="Patients can find and view your profile" />
                <Toggle checked={privacy.showDonationCount}
                  onChange={() => setPrivacy(p => ({ ...p, showDonationCount: !p.showDonationCount }))}
                  label="Show donation count" desc="Display your total donations on your public profile" />
                <Toggle checked={privacy.allowRequesterContact}
                  onChange={() => setPrivacy(p => ({ ...p, allowRequesterContact: !p.allowRequesterContact }))}
                  label="Allow patient messages" desc="Patients can send you donation requests directly" />
                <Toggle checked={privacy.dataAnalytics}
                  onChange={() => setPrivacy(p => ({ ...p, dataAnalytics: !p.dataAnalytics }))}
                  label="Analytics & improvement" desc="Help us improve BloodLink with anonymized usage data" />
              </div>
              <button onClick={() => handleSave('Privacy settings')}
                className="bg-[#00E5A0] text-[#00032B] px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-400 transition-all">
                Save Privacy Settings →
              </button>
            </div>
          )}

          {activeSection === 'danger' && (
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-display font-bold text-[#00032B] text-lg mb-5">Danger Zone</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-orange-300 transition-colors">
                    <div>
                      <p className="font-semibold text-sm text-[#00032B]">Deactivate Account</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Temporarily go offline. You can reactivate anytime.</p>
                    </div>
                    <button className="text-xs border-2 border-orange-400 text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors shrink-0 ml-4">
                      Deactivate
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-[#00032B]/20 transition-colors">
                    <div>
                      <p className="font-semibold text-sm text-[#00032B]">Export My Data</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Download all your donation history and profile data.</p>
                    </div>
                    <button className="text-xs border-2 border-[var(--border)] text-[#00032B] px-4 py-2 rounded-lg font-semibold hover:border-[#00032B] transition-colors shrink-0 ml-4">
                      Export
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#FF0040]/30 bg-red-50">
                    <div>
                      <p className="font-semibold text-sm text-[#FF0040]">Delete Account</p>
                      <p className="text-xs text-[#FF0040]/70 mt-0.5">Permanently delete your donor account and all data. Cannot be undone.</p>
                    </div>
                    <button onClick={() => setShowDeleteConfirm(true)}
                      className="text-xs bg-[#FF0040] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#cc0033] transition-colors shrink-0 ml-4">
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h3 className="font-display font-bold text-[#00032B] mb-4">Active Sessions</h3>
                {[
                  { device: 'Chrome on MacBook Pro', location: 'New York, NY',  time: 'Active now',  current: true  },
                  { device: 'Safari on iPhone 15',   location: 'New York, NY',  time: '1 hour ago',  current: false },
                  { device: 'Firefox on Windows',    location: 'Unknown',        time: '5 days ago',  current: false },
                ].map(s => (
                  <div key={s.device} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#00032B] flex items-center gap-2">
                        {s.device}
                        {s.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.location} · {s.time}</p>
                    </div>
                    {!s.current && (
                      <button className="text-xs text-[#FF0040] border border-[#FF0040]/30 px-3 py-1.5 rounded-lg hover:bg-[#FF0040]/5 transition-colors font-semibold">Revoke</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-[#FF0040]/20">
            <div className="w-14 h-14 rounded-2xl bg-[#FF0040] flex items-center justify-center text-white font-bold text-2xl mb-5 mx-auto">!</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2 text-center">Delete Donor Account?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-2 text-center">All your donation history, certificates, and data will be <strong className="text-[#FF0040]">permanently deleted</strong>.</p>
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
