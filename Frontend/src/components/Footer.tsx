import { Link } from 'react-router';
import { BloodDropTile } from './BloodDropIcon';

export default function Footer() {
  return (
    <footer className="bg-[#00032B] text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <BloodDropTile size={38} rounded="rounded-xl" className="glow-red-sm" />
              <span className="font-display text-2xl font-bold">Blood<span className="text-[#FF0040]">Link</span></span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">Connecting blood donors with patients in need. Every donation is a lifeline. Join 12,000+ donors making a difference.</p>
            <div className="flex gap-3 mt-6">
              {['twitter', 'instagram', 'facebook'].map(s => (
                <div key={s} className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center hover:bg-[#FF0040] transition-colors cursor-pointer">
                  <span className="text-white/60 text-xs uppercase font-mono-label">{s[0].toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {[
            { title: 'Platform', links: [['/', 'Home'], ['/find-donors', 'Find Donors'], ['/blood-requests', 'Blood Requests'], ['/how-it-works', 'How It Works']] },
            { title: 'Company', links: [['/about', 'About Us'], ['/contact', 'Contact'], ['/help', 'Help Center'], ['/register', 'Become a Donor']] },
            { title: 'Legal', links: [['/privacy', 'Privacy Policy'], ['/terms', 'Terms & Conditions'], ['/help', 'Support']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-display text-xs font-semibold uppercase tracking-widest text-[#FF0040] mb-4">{col.title}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map(([path, label]) => (
                  <Link key={path} to={path} className="text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs font-mono-label">© 2026 BloodLink Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#FF0040] animate-pulse-red" />
            <span className="text-white/40 text-xs font-mono-label">System operational · 99.9% uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
