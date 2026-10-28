import { Link } from 'react-router';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroBg from '../assets/hero-bg.jpg';

const bloodTypes = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'];

const stats = [
  { value: '12,400+', label: 'Registered Donors', icon: '◆', color: 'from-[#FF0040] to-[#ff4d6d]' },
  { value: '3,200+', label: 'Lives Saved', icon: '◉', color: 'from-[#7B2FFF] to-[#a56bff]' },
  { value: '98', label: 'Partner Hospitals', icon: '◧', color: 'from-[#00B4FF] to-[#4dd1ff]' },
  { value: '< 2h', label: 'Avg Response Time', icon: '◷', color: 'from-[#00E5A0] to-[#4dffc6]' },
];

const urgentRequests = [
  { type: 'O−', patient: 'Emergency Surgery', hospital: 'City General Hospital', city: 'New York', time: '12 min ago', units: 3 },
  { type: 'AB+', patient: 'ICU Critical Care', hospital: "St. Mary's Medical", city: 'Boston', time: '34 min ago', units: 2 },
  { type: 'B+', patient: 'Trauma Response', hospital: 'Regional Medical Center', city: 'Chicago', time: '1h ago', units: 5 },
];

const features = [
  { icon: '◈', title: 'Instant Matching', desc: 'Our AI matches donors with compatible recipients in under 60 seconds based on blood type, location, and availability.', color: '#FF0040' },
  { icon: '◉', title: 'Real-Time Tracking', desc: 'Track donation requests from posting to completion with live status updates for donors, requesters, and hospitals.', color: '#7B2FFF' },
  { icon: '◧', title: 'Hospital Network', desc: 'Direct integration with 98 partner hospitals for coordinated emergency and planned blood requests at scale.', color: '#00B4FF' },
  { icon: '◆', title: 'Verified Donors', desc: 'Every donor is medically screened and verified. Requesters connect only with safe, eligible, confirmed donors.', color: '#00E5A0' },
];

const testimonials = [
  { name: 'Dr. Sarah Okafor', role: 'Chief of Surgery, City General', quote: 'BloodLink cut our emergency blood procurement time from 6 hours to under 90 minutes. It is genuinely life-saving technology.', avatar: 'SO' },
  { name: 'Marcus Rivera', role: 'Donor · 14 donations', quote: 'Finding patients who need my rare O-negative blood used to be nearly impossible. Now I get matched instantly and can actually help.', avatar: 'MR' },
  { name: 'Elena Chen', role: 'Requester · Blood recipient', quote: 'When my father needed blood after his accident, BloodLink found a compatible donor within 45 minutes. I cannot overstate what that meant.', avatar: 'EC' },
];

export default function Home() {
  const [activeType, setActiveType] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-slate-100">
        {/* Full-bleed photo */}
        <img
          src={heroBg}
          alt="Hands exchanging a blood drop with a city skyline at sunset"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Light overlay: heavy white on left fading to translucent right, so image shines through */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.80) 35%, rgba(255,255,255,0.38) 60%, rgba(0,3,43,0.10) 100%)',
          }}
        />

        {/* Subtle top vignette for navbar separation */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

        {/* Decorative red glow orb top-left */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[#FF0040]/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — text content on the light side */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF0040]/10 border border-[#FF0040]/30 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF0040] animate-pulse-red" />
                <span className="text-xs font-mono-label text-[#FF0040] tracking-wider font-semibold">342 ACTIVE REQUESTS RIGHT NOW</span>
              </div>

              <h1 className="font-display text-6xl md:text-7xl font-black text-[#00032B] leading-[0.95] mb-6" style={{ textShadow: '0 2px 20px rgba(255,255,255,0.8)' }}>
                Give <span className="text-[#FF0040]" style={{ textShadow: '0 0 30px rgba(255,0,64,0.3)' }}>Blood.</span><br />
                Save <span className="relative">
                  Lives.
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#FF0040" strokeWidth="3" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </h1>

              <p className="text-[#00032B]/70 text-lg leading-relaxed mb-10 max-w-xl font-medium">
                BloodLink is the fastest blood donation network in the world — connecting donors, patients, and hospitals in real time. One donation saves up to three lives.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register"
                  className="inline-flex items-center gap-2 bg-[#FF0040] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#cc0033] transition-all glow-red hover:scale-105 active:scale-95 shadow-lg shadow-[#FF0040]/30">
                  Get Started
                  <span className="text-lg">→</span>
                </Link>
                <Link to="/login"
                  className="inline-flex items-center gap-2 bg-[#00032B] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#FF0040] transition-all shadow-lg shadow-[#00032B]/20">
                  Sign In
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-[#00032B]/55">
                <Link to="/how-it-works" className="hover:text-[#FF0040] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00032B]/30" />How It Works
                </Link>
                <Link to="/about" className="hover:text-[#FF0040] transition-colors flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00032B]/30" />About Us
                </Link>
              </div>

              {/* Mini trust strip */}
              <div className="flex items-center gap-5 mt-10 pt-8 border-t border-[#00032B]/10">
                {[['12,400+', 'Donors'], ['3,200+', 'Lives Saved'], ['98', 'Hospitals']].map(([v, l]) => (
                  <div key={l}>
                    <p className="font-display font-black text-xl text-[#FF0040]">{v}</p>
                    <p className="text-xs text-[#00032B]/50 font-mono-label">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — live feed card floats over the image */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Glassmorphism card */}
                <div className="rounded-3xl p-6 max-w-sm ml-auto"
                  style={{
                    background: 'rgba(255,255,255,0.72)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.85)',
                    boxShadow: '0 20px 60px rgba(0,3,43,0.12), 0 4px 20px rgba(0,3,43,0.08)',
                  }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[#00032B] font-display font-bold text-lg">Live Requests</p>
                      <p className="text-[#00032B]/40 text-xs font-mono-label">Updated in real-time</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-red" />
                      <span className="text-green-700 text-xs font-mono-label font-semibold">LIVE</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mb-5">
                    {urgentRequests.map((req, i) => (
                      <div key={i} className={`rounded-xl p-3.5 border ${i === 0 ? 'bg-[#FF0040]/8 border-[#FF0040]/20' : 'bg-white/60 border-white/80'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-sm shrink-0 ${i === 0 ? 'bg-[#FF0040] text-white' : 'bg-[#00032B] text-white'}`}>
                            {req.type}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[#00032B] text-sm font-semibold truncate">{req.patient}</p>
                            <p className="text-[#00032B]/45 text-xs truncate">{req.hospital}</p>
                          </div>
                          <div className="text-right shrink-0">
                            {i === 0 && <span className="text-xs bg-[#FF0040] text-white px-2 py-0.5 rounded-full font-semibold">Urgent</span>}
                            <p className="text-[#00032B]/35 text-xs mt-1">{req.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link to="/login" className="block w-full text-center text-sm bg-[#00032B] text-white hover:bg-[#FF0040] transition-colors rounded-xl py-2.5 font-semibold">
                    Sign in to respond →
                  </Link>
                </div>

                {/* Floating stat badges */}
                <div className="absolute -top-5 -left-5 text-white rounded-2xl px-4 py-2.5 shadow-xl animate-float"
                  style={{ background: 'linear-gradient(135deg, #7B2FFF, #a56bff)', boxShadow: '0 8px 24px rgba(123,47,255,0.4)' }}>
                  <p className="font-display font-bold text-xl">3,200+</p>
                  <p className="text-xs text-purple-200">Lives Saved</p>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl border border-gray-100">
                  <p className="font-display font-black text-xl text-[#00032B]">{'< 2h'}</p>
                  <p className="text-xs text-gray-500">Avg Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`py-10 px-8 text-center ${i < 3 ? 'border-r border-[var(--border)]' : ''}`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} mb-4 text-white text-xl font-mono-label`}>{s.icon}</div>
                <p className="font-display text-4xl font-black text-[#00032B] mb-1">{s.value}</p>
                <p className="text-sm text-[var(--muted-foreground)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOOD TYPES ── */}
      <section className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">All Types Welcome</p>
              <h2 className="font-display text-4xl font-black text-[#00032B] leading-tight mb-5">
                Every blood type<br />is a lifeline
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
                From rare AB-negative to universal O-positive, our network has verified donors for every blood group. Click a type to find matching donors near you.
              </p>
              <Link to="/register" className="inline-flex items-center gap-2 bg-[#00032B] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#FF0040] transition-all">
                Register as Donor →
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {bloodTypes.map(bt => (
                <div key={bt}
                  onMouseEnter={() => setActiveType(bt)} onMouseLeave={() => setActiveType(null)}
                  className={`group aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-default ${
                    activeType === bt
                      ? 'bg-[#FF0040] border-[#FF0040] scale-110 shadow-lg shadow-[#FF0040]/30'
                      : 'bg-white border-[var(--border)]'
                  }`}>
                  <span className={`font-display font-black text-xl transition-colors ${activeType === bt ? 'text-white' : 'text-[#00032B]'}`}>{bt}</span>
                  <span className={`text-xs mt-1 font-mono-label transition-colors ${activeType === bt ? 'text-white/70' : 'text-[var(--muted-foreground)]'}`}>type</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#00032B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-[#FF0040]/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">Why BloodLink</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
              Built for speed.<br />Designed to save lives.
            </h2>
            <p className="text-white/45 max-w-xl mx-auto">The most sophisticated blood coordination platform ever built — combining real-time matching, verified donors, and hospital integration.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="group mesh-card rounded-2xl p-6 hover:border-opacity-30 transition-all hover:-translate-y-1"
                style={{ '--hover-color': f.color } as React.CSSProperties}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-mono-label mb-5 transition-all"
                  style={{ background: `${f.color}20`, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">The Process</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-[#00032B]">Three steps to save a life</h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#FF0040] via-[#7B2FFF] to-[#00B4FF]" />

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { n: '01', title: 'Register', desc: 'Sign up as a donor, requester, or hospital. Verification takes minutes. Your profile is immediately live in the network.', color: '#FF0040' },
                { n: '02', title: 'Connect', desc: 'Post a blood request or browse donors. Our system instantly matches compatible donors within your area.', color: '#7B2FFF' },
                { n: '03', title: 'Donate & Track', desc: 'Coordinate safely, complete the donation, and track status in real time. Receive impact reports after each donation.', color: '#00B4FF' },
              ].map(step => (
                <div key={step.n} className="flex flex-col items-center text-center">
                  <div className="w-28 h-28 rounded-3xl flex flex-col items-center justify-center mb-8 relative bg-white border-2 shadow-lg"
                    style={{ borderColor: step.color, boxShadow: `0 8px 32px ${step.color}25` }}>
                    <span className="font-mono-label text-xs font-bold mb-1" style={{ color: step.color }}>{step.n}</span>
                    <span className="font-display text-4xl font-black text-[#00032B]">{step.n[1]}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#00032B] mb-3">{step.title}</h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed text-sm max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENT REQUESTS ── */}
      <section className="py-20 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF0040]/10 border border-[#FF0040]/25 rounded-full px-3 py-1 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#FF0040] animate-pulse-red" />
                <span className="text-xs font-mono-label text-[#FF0040] tracking-wider">URGENT</span>
              </div>
              <h2 className="font-display text-3xl font-black text-[#00032B]">Active Blood Requests</h2>
              <p className="text-[var(--muted-foreground)] mt-1">Respond to save a life. Updated every 60 seconds.</p>
            </div>
                <Link to="/login" className="text-sm font-semibold text-[#FF0040] hover:text-[#cc0033] border border-[#FF0040]/30 px-4 py-2 rounded-lg hover:bg-[#FF0040]/5 transition-all">
              Sign in to respond →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {urgentRequests.map((req, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 hover:scale-[1.02] transition-all cursor-pointer group ${
                i === 0 ? 'bg-[#00032B] border-[#FF0040]' : 'bg-white border-[var(--border)] hover:border-[#00032B]'
              }`}>
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl ${
                    i === 0 ? 'bg-[#FF0040] text-white glow-red' : 'bg-[var(--muted)] text-[#00032B]'
                  }`}>{req.type}</div>
                  {i === 0 && <span className="text-xs bg-[#FF0040] text-white px-3 py-1 rounded-full font-semibold animate-pulse-red">EMERGENCY</span>}
                  {i !== 0 && <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold">Urgent</span>}
                </div>
                <p className={`font-display font-bold text-lg mb-1 ${i === 0 ? 'text-white' : 'text-[#00032B]'}`}>{req.patient}</p>
                <p className={`text-sm mb-1 ${i === 0 ? 'text-white/55' : 'text-[var(--muted-foreground)]'}`}>{req.hospital}</p>
                <p className={`text-xs mb-5 ${i === 0 ? 'text-white/35' : 'text-[var(--muted-foreground)]'}`}>{req.city} · {req.units} units · {req.time}</p>
                <Link to="/login"
                  className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-all ${
                    i === 0
                      ? 'bg-[#FF0040] text-white hover:bg-[#cc0033]'
                      : 'bg-[#00032B] text-white hover:bg-[#FF0040]'
                  }`}>
                  Sign in to respond →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#00032B] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7B2FFF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="font-display text-4xl font-black text-white">What people are saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="mesh-card rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF0040] to-[#7B2FFF] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs font-mono-label">{t.role}</p>
                  </div>
                </div>
                <p className="text-white/65 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-[#FF0040] text-sm">★</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-[#FF0040] to-[#cc0033] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#00032B]/20 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="font-mono-label text-white/60 text-xs tracking-widest uppercase mb-4">Ready to make a difference?</p>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            One donation.<br />Three lives saved.
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">Join 12,400 donors who are already part of the BloodLink network. Registration takes under 2 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-[#FF0040] font-bold px-10 py-4 rounded-xl hover:bg-[#00032B] hover:text-white transition-all text-lg shadow-xl">
              Register Now — It's Free
            </Link>
            <Link to="/login" className="border-2 border-white/40 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/10 transition-all text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
