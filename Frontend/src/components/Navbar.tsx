import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { BloodDropTile } from './BloodDropIcon';
import { useAuth } from '../context/AuthContext';

const ROLE_DASHBOARD: Record<string, string> = {
  donor: '/dashboard/donor',
  requester: '/dashboard/requester',
  hospital: '/dashboard/hospital',
  admin: '/dashboard/admin',
};

const ROLE_LABELS: Record<string, string> = {
  donor: 'Donor',
  requester: 'Requester',
  hospital: 'Hospital',
  admin: 'Admin',
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const dashboardPath = user ? (ROLE_DASHBOARD[user.role] ?? '/') : null;

  return (
    <nav className="bg-[#00032B] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <BloodDropTile size={34} rounded="rounded-lg" className="glow-red-sm group-hover:scale-105 transition-transform" />
            <span className="font-display text-xl font-bold text-white">Blood<span className="text-[#FF0040]">Link</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[['/', 'Home'], ['/how-it-works', 'How It Works'], ['/about', 'About']].map(([path, label]) => (
              <Link key={path} to={path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === path ? 'text-[#FF0040] bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {dashboardPath && (
                  <Link to={dashboardPath}
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    {ROLE_LABELS[user.role] ?? 'Dashboard'}
                  </Link>
                )}
                <button onClick={handleLogout}
                  className="text-sm font-semibold bg-white/10 text-white px-5 py-2 rounded-lg hover:bg-[#FF0040] hover:text-white transition-all border border-white/20 hover:border-[#FF0040]">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors px-3 py-2">Login</Link>
                <Link to="/register" className="text-sm font-semibold bg-[#FF0040] text-white px-5 py-2 rounded-lg hover:bg-[#cc0033] transition-all glow-red-sm hover:glow-red">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="2" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="2" y1="11" x2="20" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="2" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 flex flex-col gap-1">
            {[['/', 'Home'], ['/how-it-works', 'How It Works'], ['/about', 'About']].map(([path, label]) => (
              <Link key={path} to={path} onClick={() => setMenuOpen(false)}
                className="text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">{label}</Link>
            ))}
            {user ? (
              <>
                {dashboardPath && (
                  <Link to={dashboardPath} onClick={() => setMenuOpen(false)}
                    className="text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    My Dashboard
                  </Link>
                )}
                <button onClick={() => { setMenuOpen(false); handleLogout(); }}
                  className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold mt-2 text-center border border-white/20 hover:bg-[#FF0040] transition-all">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="bg-[#FF0040] text-white px-4 py-2 rounded-lg text-sm font-semibold mt-2 text-center">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
