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
      <DashboardSidebar role="hospital" userName="City General Hospital" activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Hospital</p>
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

/* ═══════════════════════════════════════════════════════════════════════════
   ORG PROFILE
═══════════════════════════════════════════════════════════════════════════ */
export function HospitalProfile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 3000); };

  const departments = ['Emergency Medicine','Cardiology','Oncology','Neurology','Trauma Surgery','ICU / Critical Care','Pediatrics','Hematology'];
  const certifications = [
    { name: 'JCI Accreditation', year: '2023', valid: true },
    { name: 'ISO 9001:2015',     year: '2022', valid: true },
    { name: 'AABB Certification',year: '2024', valid: true },
    { name: 'CAP Accreditation', year: '2021', valid: false },
  ];
  const bloodStock = [
    { type: 'A+',  units: 42, max: 60 }, { type: 'A-',  units: 18, max: 40 },
    { type: 'B+',  units: 35, max: 60 }, { type: 'B-',  units: 9,  max: 30 },
    { type: 'AB+', units: 22, max: 30 }, { type: 'AB-', units: 7,  max: 20 },
    { type: 'O+',  units: 55, max: 80 }, { type: 'O-',  units: 12, max: 50 },
  ];

  return (
    <Shell title="Organization Profile" subtitle="Hospital details, certifications, and blood bank status"
      actions={
        <button onClick={() => editing ? handleSave() : setEditing(true)}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${editing ? 'bg-[#FF0040] text-white hover:bg-[#cc0033]' : 'bg-[#00032B] text-white hover:bg-[#FF0040]'}`}>
          {editing ? 'Save Changes' : 'Edit Profile'}
        </button>
      }>

      {saved && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 text-sm px-5 py-3 rounded-xl flex items-center gap-2 font-medium">
          <span className="text-green-500 text-lg">✓</span> Profile updated successfully.
        </div>
      )}

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#00032B] via-[#0a0f45] to-[#00032B] rounded-2xl overflow-hidden mb-6 relative">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF0040]/10 rounded-full translate-x-1/4 -translate-y-1/4 blur-3xl" />
        <div className="relative p-8 flex items-start gap-6 flex-wrap">
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center font-display font-black text-3xl text-[#00032B] shadow-xl shrink-0">
            +
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h2 className="font-display text-2xl font-black text-white">City General Hospital</h2>
              <span className="text-xs bg-green-500/20 border border-green-500/30 text-green-400 font-bold px-3 py-1 rounded-full">✓ Verified</span>
              <span className="text-xs bg-white/10 border border-white/15 text-white/60 font-semibold px-3 py-1 rounded-full">Level I Trauma Center</span>
            </div>
            <p className="text-white/55 text-sm mb-4">Public Teaching Hospital · Est. 1962 · New York, NY</p>
            <div className="flex flex-wrap gap-5 text-sm">
              {[
                { label: 'Bed Capacity', value: '850' },
                { label: 'Active Staff', value: '2,400+' },
                { label: 'Annual Patients', value: '120,000' },
                { label: 'Blood Bank Capacity', value: '500 units' },
              ].map(s => (
                <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl px-4 py-2.5 text-center">
                  <p className="font-display font-black text-white text-lg leading-tight">{s.value}</p>
                  <p className="text-xs text-white/40 font-mono-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Contact & Registration */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#FF0040]/10 flex items-center justify-center font-mono-label text-[#FF0040]">◉</div>
              <h3 className="font-display font-bold text-[#00032B]">Organization Details</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { l: 'Hospital Name',        v: 'City General Hospital' },
                { l: 'Registration Number',  v: 'HOS-2024-NY-00847' },
                { l: 'Type',                 v: 'Public Teaching Hospital' },
                { l: 'Established Year',     v: '1962' },
                { l: 'Primary Email',        v: 'admin@citygeneralhospital.org' },
                { l: 'Emergency Hotline',    v: '+1 (212) 555-9000' },
                { l: 'Main Reception',       v: '+1 (212) 555-8000' },
                { l: 'Fax',                  v: '+1 (212) 555-8001' },
                { l: 'Address',              v: '215 E 68th St, New York, NY 10065' },
                { l: 'Website',              v: 'www.citygeneralhospital.org' },
              ].map(f => (
                <div key={f.l}>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide mb-1.5">{f.l}</p>
                  {editing ? (
                    <input defaultValue={f.v} className="w-full border-2 border-[var(--border)] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  ) : (
                    <p className="text-sm font-semibold text-[#00032B]">{f.v}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-[#7B2FFF]/10 flex items-center justify-center font-mono-label text-[#7B2FFF]">◆</div>
              <h3 className="font-display font-bold text-[#00032B]">Active Departments</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map(d => (
                <span key={d} className="text-xs bg-[#00032B]/5 border border-[#00032B]/10 text-[#00032B] font-semibold px-3 py-1.5 rounded-lg">{d}</span>
              ))}
              {editing && (
                <button className="text-xs border-2 border-dashed border-[var(--border)] text-[var(--muted-foreground)] px-3 py-1.5 rounded-lg hover:border-[#FF0040] hover:text-[#FF0040] transition-colors">
                  + Add Department
                </button>
              )}
            </div>
          </div>

          {/* Blood Bank Stock */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF0040]/10 flex items-center justify-center font-mono-label text-[#FF0040]">◈</div>
                <h3 className="font-display font-bold text-[#00032B]">Blood Bank Inventory</h3>
              </div>
              <Link to="/dashboard/hospital/create-request" className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033] transition-colors">Request blood →</Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {bloodStock.map(b => {
                const pct = Math.round((b.units / b.max) * 100);
                const color = pct < 30 ? '#FF0040' : pct < 60 ? '#FF7B00' : '#00E5A0';
                return (
                  <div key={b.type} className="bg-[var(--background)] rounded-xl p-3 border border-[var(--border)] text-center">
                    <p className="font-display font-black text-xl" style={{ color }}>{b.type}</p>
                    <p className="font-bold text-sm text-[#00032B] mt-1">{b.units}</p>
                    <p className="text-xs text-[var(--muted-foreground)] font-mono-label">/ {b.max} units</p>
                    <div className="mt-2 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Certifications */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center font-mono-label text-amber-600">★</div>
              <h3 className="font-display font-bold text-[#00032B] text-sm">Certifications</h3>
            </div>
            {certifications.map(c => (
              <div key={c.name} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-[#00032B]">{c.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)] font-mono-label">Issued {c.year}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.valid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {c.valid ? '✓ Valid' : '⚠ Renew'}
                </span>
              </div>
            ))}
          </div>

          {/* Key contacts */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00B4FF]/10 flex items-center justify-center font-mono-label text-[#00B4FF]">◎</div>
              <h3 className="font-display font-bold text-[#00032B] text-sm">Key Contacts</h3>
            </div>
            {[
              { role: 'Hospital Director',   name: 'Dr. Patricia Chen',   ext: '8100' },
              { role: 'Blood Bank Director', name: 'Dr. Samuel Osei',     ext: '8220' },
              { role: 'Emergency Lead',      name: 'Dr. Raj Patel',       ext: '9001' },
              { role: 'BloodLink Admin',     name: 'Nurse Linda Torres',  ext: '8005' },
            ].map(c => (
              <div key={c.role} className="py-3 border-b border-[var(--border)] last:border-0">
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide">{c.role}</p>
                <p className="text-sm font-semibold text-[#00032B]">{c.name}</p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">Ext. {c.ext}</p>
              </div>
            ))}
          </div>

          {/* Account status */}
          <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-5 text-white">
            <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-4">Account Status</p>
            {[
              { label: 'Verification',   value: 'Verified', ok: true },
              { label: 'Plan',           value: 'Hospital Pro', ok: true },
              { label: 'BloodLink Since',value: 'Jan 2024', ok: true },
              { label: '2FA',            value: 'Enabled', ok: true },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                <span className="text-xs text-white/50 font-mono-label">{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.ok ? 'bg-green-400' : 'bg-amber-400'}`} />
                  <span className="text-xs font-bold">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CREATE REQUEST
═══════════════════════════════════════════════════════════════════════════ */
export function HospitalCreateRequest() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [bloodType, setBloodType] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [units, setUnits] = useState(1);

  const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  const urgencyColors: Record<string, string> = { 'A+':'#00B4FF','A-':'#7B2FFF','B+':'#00E5A0','B-':'#FF7B00','AB+':'#7B2FFF','AB-':'#00B4FF','O+':'#00E5A0','O-':'#FF0040' };

  if (submitted) return (
    <Shell title="Create Blood Request">
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-20 h-20 rounded-3xl bg-green-100 flex items-center justify-center text-green-500 font-bold text-4xl mx-auto mb-6">✓</div>
        <h2 className="font-display text-2xl font-black text-[#00032B] mb-2">Request Submitted!</h2>
        <p className="text-[var(--muted-foreground)] mb-6">
          Your {isEmergency ? <strong className="text-[#FF0040]">emergency</strong> : 'blood'} request for <strong className="text-[#00032B]">{units} unit{units > 1 ? 's' : ''} of {bloodType || 'blood'}</strong> has been posted to the BloodLink network. Donors are being notified now.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setSubmitted(false); setBloodType(''); setUnits(1); setIsEmergency(false); }}
            className="px-6 py-3 bg-[#FF0040] text-white rounded-xl font-bold text-sm hover:bg-[#cc0033] transition-all">Create Another</button>
          <Link to="/dashboard/hospital/active-requests" className="px-6 py-3 border-2 border-[var(--border)] text-[#00032B] rounded-xl font-bold text-sm hover:border-[#00032B] transition-all">View Active Requests</Link>
        </div>
      </div>
    </Shell>
  );

  return (
    <Shell title="Create Blood Request" subtitle="Post a new blood donation request to the BloodLink network"
      actions={
        <Link to="/dashboard/hospital/active-requests" className="text-xs text-[var(--muted-foreground)] font-semibold hover:text-[#FF0040] transition-colors border border-[var(--border)] px-3 py-2 rounded-lg">
          View Active →
        </Link>
      }>

      {/* Emergency toggle — always prominent */}
      <div className={`rounded-2xl p-5 mb-6 border-2 transition-all ${isEmergency ? 'border-[#FF0040] bg-[#FF0040]/5' : 'border-[var(--border)] bg-white'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-all ${isEmergency ? 'bg-[#FF0040] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)]'}`}>!</div>
            <div>
              <p className={`font-display font-bold text-lg ${isEmergency ? 'text-[#FF0040]' : 'text-[#00032B]'}`}>
                {isEmergency ? '🚨 EMERGENCY REQUEST' : 'Emergency Request'}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">{isEmergency ? 'This request will be pinned to the top of the board and donors alerted immediately.' : 'Toggle on for life-critical, immediate-need requests.'}</p>
            </div>
          </div>
          <button onClick={() => setIsEmergency(!isEmergency)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors shrink-0 ${isEmergency ? 'bg-[#FF0040]' : 'bg-gray-200'}`}>
            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${isEmergency ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Blood type selector */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <h3 className="font-display font-bold text-[#00032B] mb-4">Blood Type Required <span className="text-[#FF0040]">*</span></h3>
            <div className="grid grid-cols-4 gap-3">
              {bloodTypes.map(t => {
                const color = urgencyColors[t];
                const sel = bloodType === t;
                return (
                  <button key={t} onClick={() => setBloodType(t)}
                    className={`h-16 rounded-2xl font-display font-black text-xl border-2 transition-all ${sel ? 'text-white shadow-lg scale-105' : 'border-[var(--border)] text-[#00032B] hover:border-current'}`}
                    style={sel ? { background: color, borderColor: color, boxShadow: `0 8px 24px ${color}40` } : { color }}>
                    {t}
                  </button>
                );
              })}
            </div>
            {!bloodType && <p className="text-xs text-[#FF0040] mt-2 font-mono-label">Please select a blood type</p>}
          </div>

          {/* Request details */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <h3 className="font-display font-bold text-[#00032B] mb-5">Request Details</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Units Required <span className="text-[#FF0040]">*</span></label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setUnits(Math.max(1, units - 1))}
                    className="w-10 h-10 rounded-xl bg-[var(--muted)] font-bold text-lg hover:bg-[#FF0040] hover:text-white transition-colors">−</button>
                  <input type="number" value={units} min={1} max={20}
                    onChange={e => setUnits(Math.max(1, Math.min(20, Number(e.target.value))))}
                    className="w-20 text-center border-2 border-[var(--border)] rounded-xl py-2.5 text-lg font-bold focus:outline-none focus:border-[#FF0040] transition-colors" />
                  <button onClick={() => setUnits(Math.min(20, units + 1))}
                    className="w-10 h-10 rounded-xl bg-[var(--muted)] font-bold text-lg hover:bg-[#FF0040] hover:text-white transition-colors">+</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Urgency Level <span className="text-[#FF0040]">*</span></label>
                <select defaultValue={isEmergency ? 'Emergency' : 'Normal'} className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  <option>Normal</option><option>High</option><option>Emergency</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Department</label>
                <select defaultValue="" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  <option value="">Select department</option>
                  <option>Emergency Medicine</option><option>Cardiology</option><option>Oncology</option>
                  <option>Neurology</option><option>Trauma Surgery</option><option>ICU / Critical Care</option>
                  <option>Pediatrics</option><option>Hematology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Required By</label>
                <input type="datetime-local" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Patient / Case Reference</label>
                <input type="text" placeholder="e.g. Trauma case #T-2026-0921, anonymous surgery patient..."
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Clinical Notes</label>
                <textarea rows={3} placeholder="Relevant clinical context, patient condition, any compatibility requirements..."
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] resize-none transition-colors" />
              </div>
            </div>
          </div>

          {/* Contact for this request */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
            <h3 className="font-display font-bold text-[#00032B] mb-5">Contact for This Request</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { l: 'Contact Name',    p: 'Responsible nurse / doctor', t: 'text' },
                { l: 'Contact Phone',   p: '+1 (212) 555-0000',          t: 'tel'  },
                { l: 'Direct Email',    p: 'contact@hospital.org',       t: 'email'},
                { l: 'Ward / Room',     p: 'e.g. ICU Bay 4',             t: 'text' },
              ].map(f => (
                <div key={f.l}>
                  <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                  <input type={f.t} placeholder={f.p} className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview card */}
        <div className="flex flex-col gap-4">
          <div className={`rounded-2xl p-5 border-2 ${isEmergency ? 'border-[#FF0040] bg-[#FF0040]/5' : 'bg-white border-[var(--border)]'}`}>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest mb-3">Request Preview</p>
            <div className="flex items-center gap-3 mb-4">
              {bloodType ? (
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-2xl text-white shadow-lg"
                  style={{ background: urgencyColors[bloodType] }}>
                  {bloodType}
                </div>
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-[var(--muted)] flex items-center justify-center font-mono-label text-2xl text-[var(--muted-foreground)]">?</div>
              )}
              <div>
                <p className="font-display font-bold text-[#00032B]">{bloodType || 'Select blood type'}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{units} unit{units > 1 ? 's' : ''} needed</p>
              </div>
            </div>
            {isEmergency && (
              <div className="bg-[#FF0040] text-white text-xs font-bold px-3 py-2 rounded-lg text-center mb-3 animate-pulse">
                🚨 EMERGENCY — Will alert all nearby donors
              </div>
            )}
            <div className="space-y-2 text-xs text-[var(--muted-foreground)]">
              <div className="flex justify-between"><span>Hospital</span><span className="font-semibold text-[#00032B]">City General</span></div>
              <div className="flex justify-between"><span>Units</span><span className="font-semibold text-[#00032B]">{units}</span></div>
              <div className="flex justify-between"><span>Blood Type</span><span className="font-semibold text-[#00032B]">{bloodType || '—'}</span></div>
              <div className="flex justify-between"><span>Priority</span>
                <span className={`font-bold ${isEmergency ? 'text-[#FF0040]' : 'text-blue-600'}`}>{isEmergency ? 'Emergency' : 'Normal'}</span>
              </div>
            </div>
          </div>

          {/* Blood demand hints */}
          <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest mb-3">Network Demand</p>
            {[['O-','127 requests','Critical'],['B-','84 requests','Critical'],['O+','203 requests','High']].map(([t,r,l]) => (
              <div key={t} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-sm text-[#FF0040]">{t}</span>
                  <span className="text-xs text-[var(--muted-foreground)]">{r}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${l === 'Critical' ? 'bg-red-100 text-[#FF0040]' : 'bg-orange-100 text-orange-600'}`}>{l}</span>
              </div>
            ))}
          </div>

          <button onClick={() => bloodType && setSubmitted(true)}
            className={`w-full py-4 rounded-2xl font-display font-bold text-lg transition-all ${bloodType ? (isEmergency ? 'bg-[#FF0040] text-white hover:bg-[#cc0033] shadow-lg' : 'bg-[#00032B] text-white hover:bg-[#FF0040]') : 'bg-[var(--muted)] text-[var(--muted-foreground)] cursor-not-allowed'}`}>
            {isEmergency ? '🚨 Post Emergency Request' : 'Post Blood Request'} →
          </button>
        </div>
      </div>
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACTIVE REQUESTS
═══════════════════════════════════════════════════════════════════════════ */
type AStatus = 'Pending' | 'Accepted' | 'In Progress';
const aStatusStyle: Record<AStatus, { bg: string; text: string; dot: string }> = {
  Pending:      { bg: 'bg-amber-50',  text: 'text-amber-700', dot: 'bg-amber-400' },
  Accepted:     { bg: 'bg-green-50',  text: 'text-green-700', dot: 'bg-green-500' },
  'In Progress':{ bg: 'bg-blue-50',   text: 'text-blue-700',  dot: 'bg-blue-500'  },
};
const ACTIVE_REQS = [
  { id: 'REQ-2026-001', type: 'O-',  dept: 'Emergency',   units: 3, urgency: 'Emergency', status: 'Pending'      as AStatus, contact: 'Dr. Raj Patel',    phone: '+1 555-9001', case: 'Trauma Surgery — Motor vehicle accident', posted: '2 hrs ago',   color: '#FF0040' },
  { id: 'REQ-2026-002', type: 'AB+', dept: 'ICU',         units: 2, urgency: 'High',      status: 'Accepted'     as AStatus, contact: 'Nurse L. Torres', phone: '+1 555-8005', case: 'Post-cardiac surgery recovery',            posted: '5 hrs ago',   color: '#7B2FFF' },
  { id: 'REQ-2026-003', type: 'B+',  dept: 'Oncology',    units: 1, urgency: 'Normal',    status: 'In Progress'  as AStatus, contact: 'Dr. S. Osei',     phone: '+1 555-8220', case: 'Chemotherapy support transfusion',          posted: '1 day ago',   color: '#00B4FF' },
  { id: 'REQ-2026-004', type: 'A-',  dept: 'Neurology',   units: 2, urgency: 'High',      status: 'Pending'      as AStatus, contact: 'Dr. P. Chen',     phone: '+1 555-8100', case: 'Pre-scheduled neurosurgery procedure',      posted: '3 hrs ago',   color: '#7B2FFF' },
  { id: 'REQ-2026-005', type: 'O+',  dept: 'Pediatrics',  units: 1, urgency: 'Normal',    status: 'Accepted'     as AStatus, contact: 'Nurse M. Kim',    phone: '+1 555-8300', case: 'Pediatric anemia treatment',                posted: '6 hrs ago',   color: '#00E5A0' },
];

export function HospitalActiveRequests() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter]     = useState<AStatus | 'All'>('All');
  const visible = filter === 'All' ? ACTIVE_REQS : ACTIVE_REQS.filter(r => r.status === filter);

  return (
    <Shell title="Active Requests"
      subtitle={`${ACTIVE_REQS.length} active · ${ACTIVE_REQS.filter(r => r.urgency === 'Emergency').length} emergency`}
      actions={
        <Link to="/dashboard/hospital/create-request"
          className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
          + New Request
        </Link>
      }>

      {/* Emergency banner */}
      {ACTIVE_REQS.some(r => r.urgency === 'Emergency') && (
        <div className="bg-[#FF0040] text-white rounded-2xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold text-xl animate-pulse">!</div>
          <div className="flex-1">
            <p className="font-bold">Emergency Request Active</p>
            <p className="text-xs text-white/75">{ACTIVE_REQS.filter(r => r.urgency === 'Emergency').length} emergency request pending — donor alerts sent</p>
          </div>
          <button onClick={() => setFilter('Pending')} className="text-xs bg-white text-[#FF0040] font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">View →</button>
        </div>
      )}

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['All','Pending','Accepted','In Progress'] as const).map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${
              filter === t ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B] hover:text-[#00032B]'
            }`}>
            {t}
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-black ${filter === t ? 'bg-white/20' : 'bg-[var(--muted)]'}`}>
              {t === 'All' ? ACTIVE_REQS.length : ACTIVE_REQS.filter(r => r.status === t).length}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {visible.map(req => {
          const ss = aStatusStyle[req.status];
          const isOpen = expanded === req.id;
          return (
            <div key={req.id} className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${req.urgency === 'Emergency' ? 'border-[#FF0040]/30' : 'border-[var(--border)]'} hover:border-[#00032B]/25`}>
              <div className="flex items-stretch">
                <div className="w-1.5 shrink-0" style={{ background: req.color }} />
                <div className="flex-1 p-5">
                  {/* Header row */}
                  <div className="flex items-start gap-4 flex-wrap mb-3">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl text-white shrink-0 shadow-md"
                      style={{ background: `linear-gradient(135deg, ${req.color}, ${req.color}bb)` }}>
                      {req.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between flex-wrap gap-2 mb-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-mono-label text-xs text-[var(--muted-foreground)]">{req.id}</p>
                          {req.urgency === 'Emergency' && <span className="text-xs bg-[#FF0040] text-white font-bold px-2 py-0.5 rounded-full animate-pulse">🚨 EMERGENCY</span>}
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5 ${ss.bg} ${ss.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${ss.dot}`} />{req.status}
                        </span>
                      </div>
                      <p className="font-display font-bold text-[#00032B]">{req.case}</p>
                      <div className="flex gap-4 text-xs text-[var(--muted-foreground)] font-mono-label mt-1">
                        <span>◆ {req.units} units</span>
                        <span>◎ {req.dept}</span>
                        <span>◷ Posted {req.posted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setExpanded(isOpen ? null : req.id)}
                      className="text-xs border-2 border-[var(--border)] px-3 py-1.5 rounded-lg font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-colors">
                      {isOpen ? 'Collapse ↑' : 'Full Details ↓'}
                    </button>
                    <Link to="/blood-requests" className="text-xs border-2 border-[var(--border)] px-3 py-1.5 rounded-lg font-semibold hover:border-[#00032B] transition-colors">
                      View on Board
                    </Link>
                    {req.status === 'Pending' && (
                      <Link to="/dashboard/hospital/create-request" className="text-xs border-2 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        style={{ borderColor: req.color, color: req.color }}>Edit</Link>
                    )}
                  </div>

                  {/* Expanded detail */}
                  {isOpen && (
                    <div className="mt-5 pt-5 border-t border-[var(--border)] grid sm:grid-cols-3 gap-5">
                      <div>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Case Details</p>
                        <p className="text-sm font-semibold text-[#00032B] mb-1">{req.case}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Department: {req.dept}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Units needed: {req.units}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">Blood type: {req.type}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Responsible Contact</p>
                        <p className="text-sm font-semibold text-[#00032B]">{req.contact}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{req.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wide mb-2">Progress</p>
                        <div className="flex items-center gap-1 mb-2">
                          {(['Pending','Accepted','In Progress'] as AStatus[]).map((s, i) => {
                            const done = ['Pending','Accepted','In Progress'].indexOf(req.status) >= i;
                            return (
                              <div key={s} className="flex items-center gap-1">
                                <div className={`w-2.5 h-2.5 rounded-full ${done ? 'bg-[#FF0040]' : 'bg-[var(--border)]'}`} />
                                {i < 2 && <div className={`w-6 h-0.5 ${done ? 'bg-[#FF0040]' : 'bg-[var(--border)]'}`} />}
                              </div>
                            );
                          })}
                        </div>
                        <p className={`text-xs font-bold ${ss.text}`}>{req.status}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   REQUEST HISTORY
═══════════════════════════════════════════════════════════════════════════ */
type Period = 'Today' | 'This Week' | 'This Month' | 'This Year' | 'All';

const HISTORY_DATA: Record<Period, { requests: number; donations: number; emergency: number; fulfilled: number }> = {
  'Today':      { requests: 5,   donations: 3,   emergency: 1,  fulfilled: 2   },
  'This Week':  { requests: 28,  donations: 19,  emergency: 4,  fulfilled: 17  },
  'This Month': { requests: 112, donations: 78,  emergency: 14, fulfilled: 71  },
  'This Year':  { requests: 847, donations: 612, emergency: 89, fulfilled: 598 },
  'All':        { requests: 2341,donations: 1784,emergency: 203,fulfilled: 1711},
};

const CHART_DATA = [
  { label: 'Jan', requests: 68,  donations: 51 },
  { label: 'Feb', requests: 72,  donations: 55 },
  { label: 'Mar', requests: 85,  donations: 63 },
  { label: 'Apr', requests: 61,  donations: 48 },
  { label: 'May', requests: 90,  donations: 70 },
  { label: 'Jun', requests: 78,  donations: 62 },
  { label: 'Jul', requests: 95,  donations: 74 },
  { label: 'Aug', requests: 88,  donations: 69 },
  { label: 'Sep', requests: 112, donations: 78 },
];

const HISTORY_REQS = [
  { id: 'REQ-2026-005', type: 'A+',  dept: 'Cardiology',  units: 2, status: 'Completed', date: 'Sept 20, 2026', donor: 'Priya Sharma',  urgency: 'High',    color: '#00B4FF' },
  { id: 'REQ-2026-004', type: 'O-',  dept: 'Emergency',   units: 3, status: 'Completed', date: 'Sept 18, 2026', donor: 'Marcus Rivera', urgency: 'Emergency',color: '#FF0040' },
  { id: 'REQ-2026-003', type: 'B+',  dept: 'Oncology',    units: 1, status: 'Completed', date: 'Sept 15, 2026', donor: 'James Okafor',  urgency: 'Normal',   color: '#00E5A0' },
  { id: 'REQ-2026-002', type: 'AB+', dept: 'ICU',         units: 2, status: 'Completed', date: 'Sept 12, 2026', donor: 'Ana Pérez',     urgency: 'High',     color: '#7B2FFF' },
  { id: 'REQ-2026-001', type: 'A-',  dept: 'Neurology',   units: 1, status: 'Cancelled', date: 'Sept 10, 2026', donor: '—',             urgency: 'Normal',   color: '#7B2FFF' },
];

export function HospitalHistory() {
  const [period, setPeriod] = useState<Period>('This Month');
  const data = HISTORY_DATA[period];
  const maxVal = Math.max(...CHART_DATA.map(d => d.requests));

  return (
    <Shell title="Request History" subtitle="Historical blood request and donation activity">

      {/* Period selector */}
      <div className="flex gap-2 mb-7 flex-wrap">
        {(['Today','This Week','This Month','This Year','All'] as Period[]).map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${period === p ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">
        {[
          { label: 'Total Requests',   value: data.requests,   icon: '◆', from: '#7B2FFF', to: '#a56bff' },
          { label: 'Donations Made',   value: data.donations,  icon: '♥', from: '#FF0040', to: '#FF7B00' },
          { label: 'Emergency Cases',  value: data.emergency,  icon: '!',  from: '#FF0040', to: '#FF0040' },
          { label: 'Fulfilled',        value: data.fulfilled,  icon: '✓', from: '#00E5A0', to: '#4dffc6' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[var(--border)] p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base mb-3 text-white"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
              {s.icon}
            </div>
            <p className="font-display text-3xl font-black text-[#00032B] mb-0.5">{s.value.toLocaleString()}</p>
            <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Activity curve */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-6 mb-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-display font-bold text-[#00032B]">Activity Curve — 2026</h3>
            <p className="text-xs text-[var(--muted-foreground)] font-mono-label">Monthly requests vs donations</p>
          </div>
          <div className="flex gap-4 text-xs font-mono-label">
            <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#FF0040] inline-block" /> Requests</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#00E5A0] inline-block" /> Donations</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-40">
          {CHART_DATA.map(d => {
            const reqH = (d.requests / maxVal) * 140;
            const donH = (d.donations / maxVal) * 140;
            const isCurrentMonth = d.label === 'Sep';
            return (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                <div className="flex items-end gap-0.5 h-36 w-full justify-center">
                  <div className={`rounded-t-lg transition-all w-2/5 ${isCurrentMonth ? 'bg-[#FF0040]' : 'bg-[#FF0040]/30'}`}
                    style={{ height: `${reqH}px` }} title={`Requests: ${d.requests}`} />
                  <div className={`rounded-t-lg transition-all w-2/5 ${isCurrentMonth ? 'bg-[#00E5A0]' : 'bg-[#00E5A0]/40'}`}
                    style={{ height: `${donH}px` }} title={`Donations: ${d.donations}`} />
                </div>
                <p className={`text-xs font-mono-label ${isCurrentMonth ? 'text-[#FF0040] font-bold' : 'text-[var(--muted-foreground)]'}`}>{d.label}</p>
              </div>
            );
          })}
        </div>

        {/* Blood type breakdown */}
        <div className="mt-5 pt-5 border-t border-[var(--border)]">
          <p className="text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-widest mb-3">Blood Type Distribution ({period})</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {[['O+',28],['A+',24],['B+',18],['AB+',10],['O-',8],['A-',6],['B-',4],['AB-',2]].map(([t, pct]) => (
              <div key={t} className="text-center">
                <div className="h-14 rounded-xl bg-[var(--background)] flex flex-col items-center justify-end pb-2 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-[#FF0040]/20 rounded-xl transition-all" style={{ height: `${pct as number / 100 * 56}px` }} />
                  <span className="font-display font-black text-sm text-[#00032B] relative">{t}</span>
                </div>
                <p className="text-xs font-mono-label text-[var(--muted-foreground)] mt-1">{pct}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History table */}
      <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h3 className="font-display font-bold text-[#00032B]">Request Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--background)]">
                {['Request ID','Blood','Department','Units','Urgency','Donor','Status','Date'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {HISTORY_REQS.map(r => (
                <tr key={r.id} className="hover:bg-[var(--background)] transition-colors">
                  <td className="px-5 py-3.5 font-mono-label text-xs text-[var(--muted-foreground)]">{r.id}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-display font-black text-sm" style={{ color: r.color }}>{r.type}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[#00032B] font-medium text-sm">{r.dept}</td>
                  <td className="px-5 py-3.5 font-bold text-[#00032B]">{r.units}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.urgency === 'Emergency' ? 'bg-[#FF0040] text-white' : r.urgency === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{r.urgency}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#00032B] font-medium">{r.donor}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {r.status === 'Completed' ? '✓' : '✕'} {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono-label text-[var(--muted-foreground)]">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════════════════════ */
type HNotifType = 'donor_confirmed' | 'emergency' | 'system' | 'request_fulfilled' | 'shortage_alert' | 'report_ready';
const hNotifMeta: Record<HNotifType, { icon: string; color: string; bg: string }> = {
  emergency:        { icon: '!',  color: 'text-white',             bg: 'bg-[#FF0040]'   },
  donor_confirmed:  { icon: '✓', color: 'text-green-700',         bg: 'bg-green-100'   },
  request_fulfilled:{ icon: '◆', color: 'text-[#7B2FFF]',         bg: 'bg-purple-100'  },
  shortage_alert:   { icon: '⚠', color: 'text-orange-700',        bg: 'bg-orange-100'  },
  system:           { icon: '◎', color: 'text-[var(--muted-foreground)]', bg: 'bg-[var(--muted)]' },
  report_ready:     { icon: '★', color: 'text-amber-600',         bg: 'bg-amber-100'   },
};

const H_NOTIFS = [
  { id: 1, type: 'emergency'        as HNotifType, title: 'Emergency Request Activated',     body: 'REQ-2026-001 (O- · 3 units) is now EMERGENCY. Donor alert sent to 47 nearby O- donors.', time: '2 hrs ago',  read: false, link: '/dashboard/hospital/active-requests' },
  { id: 2, type: 'donor_confirmed'  as HNotifType, title: 'Donor Confirmed for REQ-2026-002', body: 'Priya Sharma (AB+) has accepted the ICU request. Expected arrival: within 2 hours.',          time: '4 hrs ago',  read: false, link: '/dashboard/hospital/active-requests' },
  { id: 3, type: 'shortage_alert'   as HNotifType, title: 'O- Blood Bank Low',                body: 'Your O- stock is at 12 units (24% capacity). Consider posting an emergency request.',          time: '6 hrs ago',  read: false, link: '/dashboard/hospital/create-request'  },
  { id: 4, type: 'request_fulfilled'as HNotifType, title: 'Request REQ-2026-005 Fulfilled',   body: 'A+ blood (2 units) for Cardiology has been received from donor Priya Sharma. Marked complete.', time: 'Sept 20',    read: true  },
  { id: 5, type: 'report_ready'     as HNotifType, title: 'Monthly Report Generated',         body: 'Your September 2026 report is ready. 112 requests · 78 fulfilled · 14 emergency cases.',         time: 'Sept 20',    read: true,  link: '/dashboard/hospital/reports' },
  { id: 6, type: 'system'           as HNotifType, title: 'Platform Maintenance Tonight',      body: 'BloodLink will undergo scheduled maintenance Sept 22 00:00–02:00 UTC. Plan accordingly.',          time: 'Sept 19',    read: true  },
  { id: 7, type: 'shortage_alert'   as HNotifType, title: 'B- Stock Critical',                 body: 'B- inventory at 9 units. Cross-match with regional hospitals or post a request.',                  time: 'Sept 18',    read: true  },
  { id: 8, type: 'donor_confirmed'  as HNotifType, title: 'New Donor Registered Nearby',       body: '3 new O- donors registered within 5km of City General. Your requests may be fulfilled faster.',   time: 'Sept 17',    read: true  },
];

export function HospitalNotifications() {
  const [notifs, setNotifs] = useState(H_NOTIFS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unreadCount = notifs.filter(n => !n.read).length;
  const visible = filter === 'unread' ? notifs.filter(n => !n.read) : notifs;
  const markRead = (id: number) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })));

  return (
    <Shell title="Notifications"
      subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
      actions={
        <div className="flex gap-3">
          <div className="flex bg-[var(--muted)] rounded-xl p-1 gap-1">
            {(['all','unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${filter === f ? 'bg-white text-[#00032B] shadow-sm' : 'text-[var(--muted-foreground)]'}`}>
                {f}{f === 'unread' && unreadCount > 0 && <span className="ml-1 bg-[#FF0040] text-white rounded-full px-1.5 text-xs">{unreadCount}</span>}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[#FF0040] hover:border-[#FF0040] font-semibold px-3 py-1.5 rounded-lg transition-colors">
              Mark all read
            </button>
          )}
        </div>
      }>

      {visible.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-14 text-center">
          <p className="font-display font-bold text-[#00032B] mt-4 mb-1">No unread notifications</p>
          <p className="text-sm text-[var(--muted-foreground)]">All caught up.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {visible.map(n => {
          const meta = hNotifMeta[n.type];
          return (
            <div key={n.id} onClick={() => markRead(n.id)}
              className={`group bg-white rounded-2xl border-2 transition-all cursor-pointer ${!n.read ? 'border-[#FF0040]/25 shadow-sm hover:border-[#FF0040]/50' : 'border-[var(--border)] hover:border-[#00032B]/20'}`}>
              <div className="p-5 flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${meta.bg} ${meta.color}`}>{meta.icon}</div>
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
                    <Link to={n.link} onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 text-xs text-[#FF0040] font-semibold mt-2 hover:text-[#cc0033] transition-colors">
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

/* ═══════════════════════════════════════════════════════════════════════════
   REPORTS
═══════════════════════════════════════════════════════════════════════════ */
export function HospitalReports() {
  const [fromDate, setFromDate] = useState('2026-09-01');
  const [toDate, setToDate]     = useState('2026-09-21');
  const [sections, setSections] = useState({
    summary: true, donors: true, requesters: true, emergency: true, bloodGroups: true,
    contacts: false, dayByDay: true, curve: true,
  });
  const [generated, setGenerated] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const toggle = (k: keyof typeof sections) => setSections(p => ({ ...p, [k]: !p[k] }));
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 2000);
  };

  const donors = [
    { name: 'Marcus Rivera', blood: 'O-', donations: 3, city: 'New York',  phone: '+1 212-555-0127', lastDonate: 'Sept 20' },
    { name: 'Priya Sharma',  blood: 'AB+',donations: 2, city: 'Boston',    phone: '+1 617-555-0193', lastDonate: 'Sept 18' },
    { name: 'David Kim',     blood: 'O+', donations: 2, city: 'Seattle',   phone: '+1 206-555-0145', lastDonate: 'Sept 15' },
    { name: 'Ana Pérez',     blood: 'A+', donations: 1, city: 'Miami',     phone: '+1 305-555-0177', lastDonate: 'Sept 12' },
  ];
  const requesters = [
    { case: 'Trauma — MVA',          dept: 'Emergency',  units: 3, type: 'O-',  urgency: 'Emergency', status: 'Fulfilled', date: 'Sept 20' },
    { case: 'Post-cardiac recovery',  dept: 'ICU',        units: 2, type: 'AB+', urgency: 'High',      status: 'Fulfilled', date: 'Sept 18' },
    { case: 'Chemotherapy support',   dept: 'Oncology',   units: 1, type: 'B+',  urgency: 'Normal',    status: 'Fulfilled', date: 'Sept 15' },
    { case: 'Pre-neurosurgery',       dept: 'Neurology',  units: 2, type: 'A-',  urgency: 'High',      status: 'Pending',   date: 'Sept 21' },
    { case: 'Pediatric anemia',       dept: 'Pediatrics', units: 1, type: 'O+',  urgency: 'Normal',    status: 'Fulfilled', date: 'Sept 12' },
  ];
  const dayByDay = [
    { date: 'Sept 15', requests: 4, donations: 3, emergency: 0 },
    { date: 'Sept 16', requests: 6, donations: 5, emergency: 1 },
    { date: 'Sept 17', requests: 3, donations: 2, emergency: 0 },
    { date: 'Sept 18', requests: 8, donations: 6, emergency: 2 },
    { date: 'Sept 19', requests: 5, donations: 4, emergency: 0 },
    { date: 'Sept 20', requests: 7, donations: 5, emergency: 1 },
    { date: 'Sept 21', requests: 5, donations: 3, emergency: 1 },
  ];

  return (
    <Shell title="Reports" subtitle="Generate detailed hospital activity reports for any date range"
      actions={
        generated ? (
          <button onClick={handleDownload}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${downloading ? 'bg-green-500 text-white' : 'bg-[#00032B] text-white hover:bg-[#FF0040]'}`}>
            {downloading ? '✓ Downloading...' : '⬇ Download PDF'}
          </button>
        ) : undefined
      }>

      {/* Report builder */}
      <div className="grid lg:grid-cols-3 gap-6 mb-7">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] p-6">
          <h3 className="font-display font-bold text-[#00032B] mb-5">Report Configuration</h3>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">From Date</label>
              <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">To Date</label>
              <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
            </div>
          </div>

          <p className="text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-3">Include Sections</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'summary',    l: 'Summary Overview'         },
              { k: 'donors',     l: 'Donor Details'            },
              { k: 'requesters', l: 'Request Details'          },
              { k: 'emergency',  l: 'Emergency Case Log'       },
              { k: 'bloodGroups',l: 'Blood Group Priority'     },
              { k: 'contacts',   l: 'Contact Directory'        },
              { k: 'dayByDay',   l: 'Day-by-Day Breakdown'     },
              { k: 'curve',      l: 'Activity Curve Chart'     },
            ].map(s => (
              <button key={s.k} onClick={() => toggle(s.k as keyof typeof sections)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold text-left transition-all ${(sections as any)[s.k] ? 'border-[#00032B] bg-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'}`}>
                <span>{(sections as any)[s.k] ? '✓' : '○'}</span>
                {s.l}
              </button>
            ))}
          </div>

          <button onClick={() => setGenerated(true)}
            className="mt-6 w-full bg-[#FF0040] text-white py-3.5 rounded-xl font-display font-bold hover:bg-[#cc0033] transition-all">
            Generate Report →
          </button>
        </div>

        {/* Quick stats preview */}
        <div className="flex flex-col gap-4">
          <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
            <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-4">Period Preview</p>
            <p className="font-display text-2xl font-black mb-1">Sept 1–21</p>
            <p className="text-white/50 text-xs font-mono-label mb-5">21 days selected</p>
            {[
              { label: 'Requests',   value: '112', color: '#FF0040' },
              { label: 'Donations',  value: '78',  color: '#00E5A0' },
              { label: 'Emergency',  value: '14',  color: '#FF7B00' },
              { label: 'Fulfilled',  value: '71',  color: '#00B4FF' },
            ].map(s => (
              <div key={s.label} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                <span className="text-xs text-white/50 font-mono-label">{s.label}</span>
                <span className="font-display font-black text-lg" style={{ color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-[var(--border)] p-5">
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest mb-3">Export Formats</p>
            {['PDF Report','Excel (.xlsx)','CSV Data'].map(f => (
              <div key={f} className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
                <span className="text-sm font-medium text-[#00032B]">{f}</span>
                <button onClick={handleDownload} className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033] transition-colors">⬇ Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated report */}
      {generated && (
        <div className="flex flex-col gap-6">
          {/* Report header */}
          <div className="bg-gradient-to-r from-[#00032B] via-[#0a0f45] to-[#00032B] rounded-2xl p-7 text-white">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-1">BloodLink Official Report</p>
                <h2 className="font-display text-2xl font-black">City General Hospital</h2>
                <p className="text-white/55 text-sm mt-1">{fromDate} to {toDate} · Generated Sept 21, 2026</p>
              </div>
              <div className="text-right">
                <p className="font-mono-label text-xs text-white/40">Report ID</p>
                <p className="font-mono-label text-sm text-white">RPT-2026-0921-CGH</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          {sections.summary && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <h3 className="font-display font-bold text-[#00032B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF0040] text-white text-xs flex items-center justify-center font-bold">1</span>
                Summary Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[['Total Requests','112','◆','#7B2FFF'],['Donations Made','78','♥','#FF0040'],['Emergency Cases','14','!','#FF7B00'],['Fulfillment Rate','71%','✓','#00E5A0']].map(([l,v,i,c]) => (
                  <div key={String(l)} className="bg-[var(--background)] rounded-xl p-4 border border-[var(--border)] text-center">
                    <p className="font-mono-label text-lg mb-1" style={{ color: String(c) }}>{String(i)}</p>
                    <p className="font-display font-black text-2xl text-[#00032B]">{String(v)}</p>
                    <p className="text-xs text-[var(--muted-foreground)] font-mono-label mt-0.5">{String(l)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donor details */}
          {sections.donors && (
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#7B2FFF] text-white text-xs flex items-center justify-center font-bold">2</span>
                <h3 className="font-display font-bold text-[#00032B]">Donor Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-[var(--background)]">
                    {['Donor Name','Blood Type','Donations','City','Phone','Last Donate'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {donors.map(d => (
                      <tr key={d.name} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-5 py-3 font-semibold text-[#00032B]">{d.name}</td>
                        <td className="px-5 py-3"><span className="font-display font-black text-[#FF0040]">{d.blood}</span></td>
                        <td className="px-5 py-3 font-bold">{d.donations}</td>
                        <td className="px-5 py-3 text-[var(--muted-foreground)]">{d.city}</td>
                        <td className="px-5 py-3 font-mono-label text-xs text-[var(--muted-foreground)]">{d.phone}</td>
                        <td className="px-5 py-3 text-xs text-[var(--muted-foreground)] font-mono-label">{d.lastDonate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Requester details */}
          {sections.requesters && (
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#FF0040] text-white text-xs flex items-center justify-center font-bold">3</span>
                <h3 className="font-display font-bold text-[#00032B]">Request Details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-[var(--background)]">
                    {['Case','Department','Blood','Units','Urgency','Status','Date'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {requesters.map((r, i) => (
                      <tr key={i} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-5 py-3 font-medium text-[#00032B]">{r.case}</td>
                        <td className="px-5 py-3 text-[var(--muted-foreground)] text-xs">{r.dept}</td>
                        <td className="px-5 py-3"><span className="font-display font-black text-[#FF0040] text-sm">{r.type}</span></td>
                        <td className="px-5 py-3 font-bold">{r.units}</td>
                        <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.urgency === 'Emergency' ? 'bg-[#FF0040] text-white' : r.urgency === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{r.urgency}</span></td>
                        <td className="px-5 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.status === 'Fulfilled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{r.status}</span></td>
                        <td className="px-5 py-3 text-xs font-mono-label text-[var(--muted-foreground)]">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Blood group priority */}
          {sections.bloodGroups && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-6 h-6 rounded-lg bg-[#00B4FF] text-white text-xs flex items-center justify-center font-bold">4</span>
                <h3 className="font-display font-bold text-[#00032B]">Blood Group Priority</h3>
              </div>
              <div className="space-y-3">
                {[
                  { type: 'O-',  requests: 28, fulfilled: 20, color: '#FF0040', priority: 'Critical' },
                  { type: 'O+',  requests: 24, fulfilled: 18, color: '#FF7B00', priority: 'High'     },
                  { type: 'B-',  requests: 18, fulfilled: 12, color: '#FF0040', priority: 'Critical' },
                  { type: 'A+',  requests: 20, fulfilled: 16, color: '#00B4FF', priority: 'Medium'   },
                  { type: 'AB+', requests: 12, fulfilled: 10, color: '#7B2FFF', priority: 'Medium'   },
                  { type: 'A-',  requests: 6,  fulfilled: 5,  color: '#00E5A0', priority: 'Low'      },
                ].map(b => {
                  const pct = Math.round((b.fulfilled / b.requests) * 100);
                  return (
                    <div key={b.type} className="flex items-center gap-4">
                      <span className="font-display font-black text-xl w-10 shrink-0" style={{ color: b.color }}>{b.type}</span>
                      <div className="flex-1 h-2.5 rounded-full bg-[var(--muted)] overflow-hidden">
                        <div className="h-2.5 rounded-full transition-all" style={{ width: `${pct}%`, background: b.color }} />
                      </div>
                      <span className="text-xs font-mono-label text-[var(--muted-foreground)] w-24 shrink-0 text-right">{b.fulfilled}/{b.requests} · {pct}%</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full w-16 text-center shrink-0 ${b.priority === 'Critical' ? 'bg-red-100 text-[#FF0040]' : b.priority === 'High' ? 'bg-orange-100 text-orange-700' : b.priority === 'Medium' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {b.priority}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Day by day */}
          {sections.dayByDay && (
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border)] flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#00E5A0] text-white text-xs flex items-center justify-center font-bold">5</span>
                <h3 className="font-display font-bold text-[#00032B]">Day-by-Day Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="bg-[var(--background)]">
                    {['Date','Requests','Donations','Emergency','Fulfillment %'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {dayByDay.map(d => (
                      <tr key={d.date} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-5 py-3 font-mono-label text-xs text-[var(--muted-foreground)]">{d.date}</td>
                        <td className="px-5 py-3 font-bold text-[#00032B]">{d.requests}</td>
                        <td className="px-5 py-3 font-bold text-[#00E5A0]">{d.donations}</td>
                        <td className="px-5 py-3">
                          {d.emergency > 0
                            ? <span className="text-xs bg-[#FF0040] text-white font-bold px-2 py-0.5 rounded-full">{d.emergency}</span>
                            : <span className="text-xs text-[var(--muted-foreground)]">—</span>}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                              <div className="h-1.5 rounded-full bg-[#00E5A0]" style={{ width: `${Math.round((d.donations/d.requests)*100)}%` }} />
                            </div>
                            <span className="text-xs font-semibold text-[#00032B]">{Math.round((d.donations/d.requests)*100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Activity curve */}
          {sections.curve && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#FF7B00] text-white text-xs flex items-center justify-center font-bold">6</span>
                  <h3 className="font-display font-bold text-[#00032B]">Donate & Request Activity Curve</h3>
                </div>
                <div className="flex gap-4 text-xs font-mono-label">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#FF0040] inline-block" /> Requests</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-1.5 rounded-full bg-[#00E5A0] inline-block" /> Donations</span>
                </div>
              </div>
              <div className="flex items-end gap-3 h-32">
                {dayByDay.map(d => {
                  const maxR = Math.max(...dayByDay.map(x => x.requests));
                  return (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                      <div className="flex items-end gap-0.5 h-24 w-full justify-center">
                        <div className="rounded-t-lg bg-[#FF0040]/70 w-2/5 transition-all" style={{ height: `${(d.requests / maxR) * 88}px` }} />
                        <div className="rounded-t-lg bg-[#00E5A0]/80 w-2/5 transition-all" style={{ height: `${(d.donations / maxR) * 88}px` }} />
                      </div>
                      <p className="text-xs font-mono-label text-[var(--muted-foreground)]">{d.date.split(' ')[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Download footer */}
          <div className="bg-[var(--background)] rounded-2xl border-2 border-dashed border-[var(--border)] p-7 text-center">
            <p className="font-display font-bold text-[#00032B] text-lg mb-1">Report Ready for Download</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-5">
              Report ID: RPT-2026-0921-CGH · {Object.values(sections).filter(Boolean).length} sections included
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {['PDF Report','Excel Spreadsheet','CSV Export'].map(f => (
                <button key={f} onClick={handleDownload}
                  className="flex items-center gap-2 bg-[#00032B] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#FF0040] transition-all">
                  ⬇ {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SETTINGS
═══════════════════════════════════════════════════════════════════════════ */
export function HospitalSettings() {
  const [activeSection, setActiveSection] = useState('org');
  const [saved, setSaved] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState({
    emailEmergency: true, emailDonorConfirm: true, emailMonthlyReport: true, emailBloodShortage: true, emailNewsletter: false,
    smsEmergency: true, smsDonorArrival: true,
    pushAll: true, pushEmergencyOnly: false, pushReportReady: true,
  });
  const [privacy, setPrivacy] = useState({
    showPublicProfile: true, showBloodStock: false, allowDonorContact: true, shareAnalytics: true,
  });

  const handleSave = (s: string) => { setSaved(s); setTimeout(() => setSaved(''), 2500); };

  const sections = [
    { id: 'org',      label: 'Organization Info',      icon: '+', color: '#FF0040' },
    { id: 'bloodbank',label: 'Blood Bank Settings',    icon: '◆', color: '#7B2FFF' },
    { id: 'password', label: 'Change Password',         icon: '◈', color: '#00B4FF' },
    { id: 'notifs',   label: 'Notification Prefs',      icon: '◎', color: '#00E5A0' },
    { id: 'privacy',  label: 'Privacy & Data',          icon: '◉', color: '#FF7B00' },
    { id: 'danger',   label: 'Danger Zone',             icon: '⚠', color: '#FF0040' },
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
    <Shell title="Settings" subtitle="Manage hospital account, blood bank, notifications, and privacy">
      {saved && (
        <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
          ✓ {saved} saved
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-3 flex flex-col gap-1">
            {sections.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${activeSection === s.id ? 'text-white' : 'text-[var(--secondary-foreground)] hover:bg-[var(--muted)]'}`}
                style={activeSection === s.id ? { background: s.color } : {}}>
                <span className="font-mono-label w-4 text-center">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeSection === 'org' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Organization Information</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { l: 'Hospital Name',       v: 'City General Hospital',            t: 'text'  },
                  { l: 'Registration No.',     v: 'HOS-2024-NY-00847',               t: 'text'  },
                  { l: 'Primary Email',        v: 'admin@citygeneralhospital.org',    t: 'email' },
                  { l: 'Emergency Hotline',    v: '+1 (212) 555-9000',               t: 'tel'   },
                  { l: 'Address',              v: '215 E 68th St, New York, NY',     t: 'text'  },
                  { l: 'Website',              v: 'www.citygeneralhospital.org',      t: 'text'  },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type={f.t} defaultValue={f.v}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Hospital Type</label>
                  <select defaultValue="Public Teaching" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                    <option>Public Teaching Hospital</option>
                    <option>Private Hospital</option>
                    <option>Community Hospital</option>
                    <option>Specialty Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Trauma Level</label>
                  <select defaultValue="Level I" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                    <option>Level I Trauma Center</option>
                    <option>Level II Trauma Center</option>
                    <option>Level III Trauma Center</option>
                    <option>Non-Trauma</option>
                  </select>
                </div>
              </div>
              <button onClick={() => handleSave('Organization info')}
                className="mt-6 bg-[#FF0040] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
                Save Organization Info →
              </button>
            </div>
          )}

          {activeSection === 'bloodbank' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Blood Bank Settings</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Configure thresholds and automatic alert preferences for your blood bank inventory.</p>
              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {[
                  { l: 'Total Capacity (units)', v: '500', t: 'number' },
                  { l: 'Low Stock Alert (%)',     v: '30',  t: 'number' },
                  { l: 'Critical Alert (%)',      v: '15',  t: 'number' },
                  { l: 'Auto-request Threshold',  v: '10%', t: 'text'  },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type={f.t} defaultValue={f.v}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                  </div>
                ))}
              </div>
              <div className="bg-[var(--muted)] rounded-xl p-4 mb-5">
                <h4 className="font-semibold text-sm text-[#00032B] mb-3">Auto-Alert Blood Types</h4>
                <div className="flex flex-wrap gap-2">
                  {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => (
                    <label key={t} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" defaultChecked={['O-','O+','B-'].includes(t)} className="accent-[#FF0040] w-3.5 h-3.5" />
                      <span className="font-display font-black text-sm text-[#00032B]">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button onClick={() => handleSave('Blood bank settings')}
                className="bg-[#7B2FFF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-purple-700 transition-all">
                Save Blood Bank Settings →
              </button>
            </div>
          )}

          {activeSection === 'password' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Change Admin Password</h2>
              <div className="flex flex-col gap-4 max-w-sm">
                {[
                  { l: 'Current Password',     p: 'Enter current password' },
                  { l: 'New Password',          p: 'Min. 8 characters' },
                  { l: 'Confirm New Password',  p: 'Repeat new password' },
                ].map(f => (
                  <div key={f.l}>
                    <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                    <input type="password" placeholder={f.p}
                      className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00B4FF] transition-colors" />
                  </div>
                ))}
                <button onClick={() => handleSave('Password')}
                  className="bg-[#00B4FF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-sky-600 transition-all">
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
                  { k: 'emailEmergency',     l: 'Emergency alerts',           d: 'Immediate email on any emergency request' },
                  { k: 'emailDonorConfirm',  l: 'Donor confirmation',         d: 'When a donor accepts a request' },
                  { k: 'emailMonthlyReport', l: 'Monthly report delivery',    d: 'Auto-generated report each month' },
                  { k: 'emailBloodShortage', l: 'Blood shortage warnings',    d: 'When inventory drops below threshold' },
                  { k: 'emailNewsletter',    l: 'BloodLink newsletter',       d: 'Platform updates and news' },
                ]},
                { heading: 'SMS Alerts', icon: '◆', color: '#FF0040', items: [
                  { k: 'smsEmergency',    l: 'Emergency SMS',    d: 'Life-critical alerts via SMS' },
                  { k: 'smsDonorArrival', l: 'Donor arrival ETA',d: 'SMS when donor confirms and is en route' },
                ]},
                { heading: 'Push Notifications', icon: '◈', color: '#7B2FFF', items: [
                  { k: 'pushAll',           l: 'All notifications',    d: 'Enable browser push' },
                  { k: 'pushEmergencyOnly', l: 'Emergency only',       d: 'Only push for emergency requests' },
                  { k: 'pushReportReady',   l: 'Report ready alerts',  d: 'Notify when a generated report is ready' },
                ]},
              ].map(group => (
                <div key={group.heading} className="mb-7">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono-label text-sm" style={{ color: group.color }}>{group.icon}</span>
                    <h3 className="font-semibold text-sm text-[#00032B]">{group.heading}</h3>
                  </div>
                  <div className="bg-[var(--background)] rounded-xl px-4 divide-y divide-[var(--border)]">
                    {group.items.map(item => (
                      <Toggle key={item.k}
                        checked={(notifPrefs as any)[item.k]}
                        onChange={() => setNotifPrefs(p => ({ ...p, [item.k]: !(p as any)[item.k] }))}
                        label={item.l} desc={item.d} />
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={() => handleSave('Notification preferences')}
                className="bg-[#00E5A0] text-[#00032B] px-6 py-3 rounded-xl text-sm font-bold hover:bg-green-400 transition-all">
                Save Preferences →
              </button>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-2">Privacy & Data</h2>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Control what information donors and the public can see about your hospital.</p>
              <div className="bg-[var(--background)] rounded-xl px-4 mb-6 divide-y divide-[var(--border)]">
                <Toggle checked={privacy.showPublicProfile}
                  onChange={() => setPrivacy(p => ({ ...p, showPublicProfile: !p.showPublicProfile }))}
                  label="Public hospital listing" desc="Appear in BloodLink's hospital directory" />
                <Toggle checked={privacy.showBloodStock}
                  onChange={() => setPrivacy(p => ({ ...p, showBloodStock: !p.showBloodStock }))}
                  label="Show blood stock levels" desc="Allow donors to see your current inventory" />
                <Toggle checked={privacy.allowDonorContact}
                  onChange={() => setPrivacy(p => ({ ...p, allowDonorContact: !p.allowDonorContact }))}
                  label="Allow donor messages" desc="Donors can contact the blood bank directly" />
                <Toggle checked={privacy.shareAnalytics}
                  onChange={() => setPrivacy(p => ({ ...p, shareAnalytics: !p.shareAnalytics }))}
                  label="Share anonymized data" desc="Help BloodLink improve the platform with aggregate stats" />
              </div>
              <button onClick={() => handleSave('Privacy settings')}
                className="bg-[#FF7B00] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all">
                Save Privacy Settings →
              </button>
            </div>
          )}

          {activeSection === 'danger' && (
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-display font-bold text-[#00032B] text-lg mb-5">Danger Zone</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { l: 'Deactivate Account',   d: 'Temporarily suspend your hospital account. Existing requests remain.', action: 'Deactivate', style: 'border-orange-400 text-orange-600 hover:bg-orange-50' },
                    { l: 'Export All Data',       d: 'Download all requests, reports, and hospital data as a ZIP archive.', action: 'Export', style: 'border-[var(--border)] text-[#00032B] hover:border-[#00032B]' },
                  ].map(item => (
                    <div key={item.l} className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-[#00032B]/20 transition-colors">
                      <div>
                        <p className="font-semibold text-sm text-[#00032B]">{item.l}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.d}</p>
                      </div>
                      <button className={`text-xs border-2 px-4 py-2 rounded-lg font-semibold transition-colors shrink-0 ml-4 ${item.style}`}>{item.action}</button>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#FF0040]/30 bg-red-50">
                    <div>
                      <p className="font-semibold text-sm text-[#FF0040]">Delete Hospital Account</p>
                      <p className="text-xs text-[#FF0040]/70 mt-0.5">Permanently delete your account, all requests, reports, and data. Cannot be undone.</p>
                    </div>
                    <button onClick={() => setShowDeleteConfirm(true)} className="text-xs bg-[#FF0040] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#cc0033] transition-colors shrink-0 ml-4">Delete</button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h3 className="font-display font-bold text-[#00032B] mb-4">Admin Sessions</h3>
                {[
                  { device: 'Chrome on Windows 11',  location: 'New York, NY',  time: 'Active now',  current: true  },
                  { device: 'Safari on MacBook Pro',  location: 'New York, NY',  time: '3 hours ago', current: false },
                  { device: 'Mobile Admin App',       location: 'New York, NY',  time: '1 day ago',   current: false },
                ].map(s => (
                  <div key={s.device} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#00032B] flex items-center gap-2">
                        {s.device}
                        {s.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Current</span>}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.location} · {s.time}</p>
                    </div>
                    {!s.current && <button className="text-xs text-[#FF0040] border border-[#FF0040]/30 px-3 py-1.5 rounded-lg hover:bg-[#FF0040]/5 transition-colors font-semibold">Revoke</button>}
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
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2 text-center">Delete Hospital Account?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4 text-center">All requests, reports, blood bank data, and contacts will be <strong className="text-[#FF0040]">permanently deleted</strong>.</p>
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
