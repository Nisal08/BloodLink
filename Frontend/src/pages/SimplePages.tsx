import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/DashboardSidebar';
import { BloodDropTile } from '../components/BloodDropIcon';

export function HowItWorks() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[#00032B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FF0040]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="text-xs font-mono-label text-white/35 mb-5"><Link to="/" className="hover:text-[#FF0040]">Home</Link> / <span className="text-white/60">How It Works</span></nav>
          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">Process</p>
          <h1 className="font-display text-5xl font-black text-white mb-4">How BloodLink Works</h1>
          <p className="text-white/50 text-lg max-w-xl">A simple three-step process connecting donors with patients in urgent need.</p>
        </div>
      </div>
      <div className="flex-1 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          {[
            { n: '01', title: 'Register Your Account', desc: 'Sign up as a blood donor, individual requester, or hospital organization in under 2 minutes. Verification ensures a safe, trusted network.', color: '#FF0040' },
            { n: '02', title: 'Post or Browse Requests', desc: 'Requesters and hospitals post blood needs. Donors browse requests and receive instant notifications about compatible needs nearby.', color: '#7B2FFF' },
            { n: '03', title: 'Connect & Donate Safely', desc: 'Coordinate through the platform. Track donation status in real time and receive impact confirmation when the donation is complete.', color: '#00B4FF' },
            { n: '04', title: 'Track Your Impact', desc: 'Review your donation history and see the lives you\'ve impacted. Build your verified donor reputation over time.', color: '#00E5A0' },
          ].map(step => (
            <div key={step.n} className="flex gap-8 mb-12 items-start">
              <div className="shrink-0 w-20 h-20 rounded-3xl flex flex-col items-center justify-center border-2 bg-white shadow-lg"
                style={{ borderColor: step.color }}>
                <span className="font-mono-label text-xs font-bold" style={{ color: step.color }}>{step.n}</span>
                <span className="font-display font-black text-3xl text-[#00032B]">{step.n[1]}</span>
              </div>
              <div className="pt-4">
                <h3 className="font-display text-2xl font-black text-[#00032B] mb-2">{step.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-10">
            <Link to="/register" className="bg-[#FF0040] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#cc0033] transition-all glow-red-sm">Register Now →</Link>
            <Link to="/login" className="border-2 border-[var(--border)] px-7 py-3.5 rounded-xl font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-all">Sign In</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[#00032B] relative overflow-hidden clip-diagonal pb-24">
        <div className="absolute inset-0 mesh-bg grid-pattern" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#7B2FFF]/15 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <nav className="text-xs font-mono-label text-white/35 mb-5"><Link to="/" className="hover:text-[#FF0040]">Home</Link> / <span className="text-white/60">About</span></nav>
          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">Our story</p>
          <h1 className="font-display text-6xl font-black text-white mb-5 leading-tight">About<br />BloodLink</h1>
          <p className="text-white/50 text-xl max-w-2xl">We exist to eliminate preventable deaths caused by blood shortages by building the world's most connected blood donation network.</p>
        </div>
      </div>
      <div className="flex-1 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {[
              { title: 'Our Mission', body: 'BloodLink was founded in 2023 with a clear mission: connect every blood donor with every patient in need, faster than any previous system could. We believe no one should die waiting for blood.' },
              { title: 'Our Impact', body: 'In our first three years, we\'ve connected over 12,000 donors with 3,200+ patients across 98 hospitals. Our average response time of under 2 hours has made us the fastest blood coordination platform in the region.' },
            ].map(col => (
              <div key={col.title} className="bg-white rounded-2xl border border-[var(--border)] p-8">
                <h2 className="font-display text-2xl font-black text-[#00032B] mb-4">{col.title}</h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed">{col.body}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <Link to="/register" className="bg-[#FF0040] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#cc0033] transition-all glow-red-sm">Join Us →</Link>
            <Link to="/how-it-works" className="border-2 border-[var(--border)] px-7 py-3.5 rounded-xl font-semibold hover:border-[#00032B] transition-all">How It Works</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-[#00032B] mesh-bg grid-pattern flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[var(--border)] p-8 shadow-2xl">
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <BloodDropTile size={32} rounded="rounded-lg" />
          <span className="font-display text-xl font-bold text-[#00032B]">Blood<span className="text-[#FF0040]">Link</span></span>
        </Link>
        <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Account</p>
        <h1 className="font-display text-3xl font-black text-[#00032B] mb-2">Forgot Password</h1>
        <p className="text-sm text-[var(--muted-foreground)] mb-7">Enter your email and we'll send a reset link instantly.</p>
        {sent ? (
          <div className="bg-green-50 border-2 border-green-200 text-green-800 rounded-2xl p-5 text-sm">
            <p className="font-semibold mb-1">✓ Reset link sent!</p>
            <p className="text-green-600">Check your email inbox. <Link to="/login" className="text-[#FF0040] hover:text-[#cc0033] font-semibold">Back to Login →</Link></p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
            <input type="email" placeholder="you@example.com" required
              className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] mb-4 transition-colors" />
            <button type="submit" className="w-full bg-[#00032B] text-white py-3.5 rounded-xl font-bold hover:bg-[#FF0040] transition-all">Send Reset Link →</button>
          </form>
        )}
        <p className="text-center text-sm text-[var(--muted-foreground)] mt-5"><Link to="/login" className="text-[#FF0040] font-semibold hover:text-[#cc0033]">← Back to Login</Link></p>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#00032B] mesh-bg grid-pattern flex flex-col items-center justify-center text-center p-8">
      <BloodDropTile size={80} rounded="rounded-3xl" className="mb-8 glow-red" />
      <p className="font-mono-label text-[#FF0040] text-xs tracking-widest uppercase mb-3">Error 404</p>
      <h1 className="font-display text-6xl font-black text-white mb-3">Page not found</h1>
      <p className="text-white/45 text-lg mb-10">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="bg-[#FF0040] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#cc0033] transition-all glow-red-sm">← Go Home</Link>
    </div>
  );
}

function GenericDashboardPage({ role, title, children }: { role: 'donor' | 'requester' | 'hospital' | 'admin'; title: string; children?: React.ReactNode }) {
  const location = useLocation();
  const userMap = { donor: 'Marcus Rivera', requester: 'Elena Vasquez', hospital: 'City General', admin: 'Admin User' };
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role={role} userName={userMap[role]} activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10">
          <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          <h1 className="font-display text-xl font-black text-[#00032B]">{title}</h1>
        </div>
        <div className="p-8">
          {children || (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center mx-auto mb-4">
                <span className="font-mono-label text-2xl text-[#FF0040]">◈</span>
              </div>
              <p className="font-display text-xl font-bold text-[#00032B] mb-2">Coming Soon</p>
              <p className="text-sm text-[var(--muted-foreground)]">This section is being built. Core features available via dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DonorProfile() { return <GenericDashboardPage role="donor" title="My Profile" />; }
export function DonorAvailability() { return <GenericDashboardPage role="donor" title="Availability" />; }
export function DonorRequests() { return <GenericDashboardPage role="donor" title="Blood Requests" />; }
export function DonorNotifications() { return <GenericDashboardPage role="donor" title="Notifications" />; }
export function DonorHistory() { return <GenericDashboardPage role="donor" title="Donation History" />; }
export function DonorSettings() { return <GenericDashboardPage role="donor" title="Settings" />; }

export function RequesterProfile() { return <GenericDashboardPage role="requester" title="My Profile" />; }
export function RequesterCreateRequest() {
  const location = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const bloodTypes = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  const [bt, setBt] = useState('');
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="requester" userName="Elena Vasquez" activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10">
          <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Requester</p>
          <h1 className="font-display text-xl font-black text-[#00032B]">Create Blood Request</h1>
        </div>
        <div className="p-8 max-w-2xl">
          {submitted ? (
            <div className="bg-white rounded-2xl border-2 border-green-200 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5"><span className="text-green-600 text-3xl font-mono-label">◈</span></div>
              <h2 className="font-display text-2xl font-black text-[#00032B] mb-2">Request Submitted!</h2>
              <p className="text-[var(--muted-foreground)] mb-6">Your blood request is live and visible to compatible donors.</p>
              <Link to="/dashboard/requester/my-requests" className="inline-flex items-center gap-2 bg-[#FF0040] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#cc0033] transition-all glow-red-sm">View My Requests →</Link>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl border border-[var(--border)] p-7 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold mb-2 text-[#00032B] uppercase tracking-wide">Blood Type Needed</label>
                <div className="grid grid-cols-8 gap-2">
                  {bloodTypes.map(b => (
                    <button type="button" key={b} onClick={() => setBt(b)}
                      className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${bt === b ? 'bg-[#FF0040] border-[#FF0040] text-white glow-red-sm' : 'border-[var(--border)] text-[#00032B] hover:border-[#FF0040]'}`}>{b}</button>
                  ))}
                </div>
              </div>
              {[['Hospital / Location', 'text', 'City General Hospital, New York'], ['Units Required', 'number', '2']].map(([l, t, p]) => (
                <div key={l}>
                  <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">{l}</label>
                  <input type={t} placeholder={p} min={t === 'number' ? 1 : undefined}
                    className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-2 text-[#00032B] uppercase tracking-wide">Urgency Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[['Normal','#00B4FF'], ['High','#FF7B00'], ['Emergency','#FF0040']].map(([u, c]) => (
                    <button type="button" key={u} className="py-3 rounded-xl text-sm font-bold border-2 border-[var(--border)] hover:border-current transition-all" style={{ '--tw-border-opacity': 1 } as React.CSSProperties}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = c)} onMouseLeave={e => (e.currentTarget.style.borderColor = '')}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">Additional Notes</label>
                <textarea className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] resize-none h-24 transition-colors" placeholder="Any additional context about the patient or urgency..." />
              </div>
              <div className="flex gap-3 pt-2">
                <Link to="/dashboard/requester" className="flex-1 text-center border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:border-[#00032B] transition-colors">Cancel</Link>
                <button type="submit" className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all glow-red-sm">Submit Request →</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export function RequesterMyRequests() { return <GenericDashboardPage role="requester" title="My Blood Requests" />; }
export function RequesterNotifications() { return <GenericDashboardPage role="requester" title="Notifications" />; }
export function RequesterSettings() { return <GenericDashboardPage role="requester" title="Settings" />; }

export function HospitalProfile() { return <GenericDashboardPage role="hospital" title="Organization Profile" />; }
export function HospitalCreateRequest() { return <GenericDashboardPage role="hospital" title="Create Blood Request" />; }
export function HospitalActiveRequests() { return <GenericDashboardPage role="hospital" title="Active Requests" />; }
export function HospitalHistory() { return <GenericDashboardPage role="hospital" title="Request History" />; }
export function HospitalNotifications() { return <GenericDashboardPage role="hospital" title="Notifications" />; }
export function HospitalReports() { return <GenericDashboardPage role="hospital" title="Reports" />; }
export function HospitalSettings() { return <GenericDashboardPage role="hospital" title="Settings" />; }

export function AdminUsers() { return <GenericDashboardPage role="admin" title="User Management" />; }
export function AdminDonors() { return <GenericDashboardPage role="admin" title="Donor Management" />; }
export function AdminRequests() { return <GenericDashboardPage role="admin" title="Blood Request Management" />; }
export function AdminOrganizations() { return <GenericDashboardPage role="admin" title="Organizations" />; }
export function AdminReports() { return <GenericDashboardPage role="admin" title="Reports Management" />; }
export function AdminNotifications() { return <GenericDashboardPage role="admin" title="Notifications" />; }
export function AdminSettings() { return <GenericDashboardPage role="admin" title="Settings" />; }

function SimpleInfoPage({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-display text-4xl font-black text-[#00032B] mb-6">{title}</h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">{content}</p>
        <Link to="/" className="mt-8 inline-flex items-center text-[#FF0040] font-semibold hover:text-[#cc0033]">← Back to Home</Link>
      </div>
      <Footer />
    </div>
  );
}

export function Contact() { return <SimpleInfoPage title="Contact Us" content="Reach us at hello@bloodlink.org or call our 24/7 support line. For emergency blood coordination, use the platform's Emergency Request feature for fastest response." />; }
export function Privacy() { return <SimpleInfoPage title="Privacy Policy" content="BloodLink is committed to protecting your personal information. We collect only the data necessary to connect donors with recipients safely. Your data is never sold to third parties. Medical information is encrypted at rest and in transit." />; }
export function Terms() { return <SimpleInfoPage title="Terms & Conditions" content="By using BloodLink, you agree to provide accurate information, be 18+ to donate, and use the platform for legitimate blood coordination purposes. BloodLink coordinates connections but is not liable for outcomes of in-person medical procedures." />; }
export function Help() { return <SimpleInfoPage title="Help Center" content="Browse our FAQ at help.bloodlink.org or contact support@bloodlink.org. For urgent platform issues during active blood requests, call our emergency support line available 24/7." />; }

export function DonorProfileView() {
  const [requested, setRequested] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-[#00032B] relative overflow-hidden pb-24">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF0040]/15 rounded-full blur-3xl" />
        <div className="relative max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FF0040] to-[#7B2FFF] flex items-center justify-center mx-auto mb-6 glow-red text-white font-bold text-2xl">MR</div>
          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Verified Donor</p>
          <h1 className="font-display text-4xl font-black text-white mb-2">Marcus Rivera</h1>
          <p className="text-white/50">New York, NY · Blood Type O- · 14 donations</p>
        </div>
      </div>
      <div className="flex-1 bg-[var(--background)]">
        <div className="max-w-xl mx-auto px-4 py-10 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            {[['14', 'Donations'], ['14', 'Lives Saved'], ['100%', 'Response Rate']].map(([v, l]) => (
              <div key={l} className="bg-white rounded-2xl border border-[var(--border)] p-4 text-center">
                <p className="font-display text-2xl font-black text-[#FF0040]">{v}</p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/requester/find-donors" className="flex-1 text-center border-2 border-[var(--border)] px-4 py-3 rounded-xl text-sm font-semibold hover:border-[#00032B] transition-colors">← Back to Donors</Link>
            <button
              onClick={() => setRequested(true)}
              disabled={requested}
              className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                requested
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-[#FF0040] text-white hover:bg-[#cc0033] glow-red-sm'
              }`}>
              {requested ? <><span>✓</span> Requested</> : 'Send Donation Request'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
