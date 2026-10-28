import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { BloodDropTile } from '../components/BloodDropIcon';
import { useAuth } from '../context/AuthContext';

type Role = 'donor' | 'requester' | 'hospital';
type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
};

const roleConfig = {
  donor: { icon: '◆', label: 'Blood Donor', desc: 'Register to donate and save lives', color: '#FF0040', gradient: 'from-[#FF0040] to-[#ff4d6d]', path: '/dashboard/donor' },
  requester: { icon: '◉', label: 'Individual Requester', desc: 'Request blood for yourself or family', color: '#7B2FFF', gradient: 'from-[#7B2FFF] to-[#a56bff]', path: '/dashboard/requester' },
  hospital: { icon: '◧', label: 'Hospital / Organization', desc: 'Manage institutional blood requests', color: '#00B4FF', gradient: 'from-[#00B4FF] to-[#4dd1ff]', path: '/dashboard/hospital' },
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const emptyForm: RegisterForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  organizationName: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { user, register } = useAuth();
  const [role, setRole] = useState<Role>('donor');
  const [bloodType, setBloodType] = useState('');
  const [form, setForm] = useState<RegisterForm>(emptyForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const config = roleConfig[role];

  if (user) {
    const dest = roleConfig[user.role as Role]?.path ?? '/';
    return <Navigate to={dest} replace />;
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (role === 'donor' && !bloodType) {
      setError('Please select your blood type.');
      return;
    }
    if (role === 'hospital' && !form.organizationName.trim()) {
      setError('Please enter your organization name.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    const payload: Record<string, string> = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      role,
    };

    if (role === 'donor') payload.bloodType = bloodType;
    if (role === 'hospital') payload.organizationName = form.organizationName.trim();

    setLoading(true);
    try {
      await register(payload);
      navigate(config.path);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#00032B]">
      {/* Left */}
      <div className="hidden lg:flex w-2/5 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 mesh-bg grid-pattern" />
        <div className="absolute top-1/3 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: `${config.color}20` }} />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <BloodDropTile size={38} rounded="rounded-xl" className="glow-red-sm" />
            <span className="font-display text-2xl font-bold text-white">Blood<span className="text-[#FF0040]">Link</span></span>
          </Link>
        </div>

        <div className="relative">
          <p className="font-mono-label text-xs tracking-widest uppercase mb-3" style={{ color: config.color }}>Join as {config.label}</p>
          <h2 className="font-display text-3xl font-black text-white mb-4 leading-tight">Build your donor profile in under 2 minutes.</h2>
          <p className="text-white/45 text-sm leading-relaxed">Over 12,000 donors and 98 hospitals trust BloodLink to coordinate life-saving donations across the country.</p>

          <div className="mt-8 flex flex-col gap-3">
            {['Free to join and always free', 'Verified & safe network', 'Real-time request matching', 'Impact tracking dashboard'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${config.color}25`, color: config.color }}>
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-white/60">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-white/35 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white underline hover:text-[#FF0040] transition-colors">Sign in →</Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-lg">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <BloodDropTile size={32} rounded="rounded-lg" />
              <span className="font-display text-xl font-bold text-[#00032B]">Blood<span className="text-[#FF0040]">Link</span></span>
            </Link>
          </div>

          <p className="font-mono-label text-xs text-[#FF0040] tracking-widest uppercase mb-2">Create account</p>
          <h1 className="font-display text-4xl font-black text-[#00032B] mb-6">Register</h1>

          {/* Role selector */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([id, cfg]) => (
              <button type="button" key={id} onClick={() => { setRole(id); setError(''); }}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 text-center transition-all ${
                  role === id ? 'border-current bg-white shadow-lg' : 'border-[var(--border)] bg-white hover:border-[#00032B]'
                }`}
                style={{ borderColor: role === id ? cfg.color : undefined }}>
                <span className="font-mono-label text-2xl" style={{ color: role === id ? cfg.color : '#9ca3af' }}>{cfg.icon}</span>
                <span className={`text-xs font-semibold leading-tight ${role === id ? '' : 'text-[var(--muted-foreground)]'}`}
                  style={{ color: role === id ? cfg.color : undefined }}>{cfg.label}</span>
              </button>
            ))}
          </div>

          <div className="text-sm text-[var(--muted-foreground)] bg-[var(--muted)] rounded-xl px-4 py-3 mb-6 font-medium">
            <span style={{ color: config.color }}>◆</span> {config.desc}
          </div>

          {error && (
            <div role="alert" className="bg-red-50 border border-[#FF0040]/30 text-[#FF0040] text-sm px-4 py-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">First Name</label>
                <input name="firstName" type="text" value={form.firstName} onChange={handleInputChange} placeholder="John" required maxLength={50}
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">Last Name</label>
                <input name="lastName" type="text" value={form.lastName} onChange={handleInputChange} placeholder="Doe" required maxLength={50}
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleInputChange} placeholder="you@example.com" required autoComplete="email"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleInputChange} placeholder="Min. 8 characters" required minLength={8} autoComplete="new-password"
                className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
            </div>

            {role === 'donor' && (
              <div>
                <label className="block text-xs font-semibold mb-2 text-[#00032B] uppercase tracking-wide">Blood Type</label>
                <div className="grid grid-cols-8 gap-1.5">
                  {bloodTypes.map(bt => (
                    <button type="button" key={bt} onClick={() => { setBloodType(bt); setError(''); }} aria-pressed={bloodType === bt}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border-2 ${
                        bloodType === bt ? 'bg-[#FF0040] border-[#FF0040] text-white glow-red-sm' : 'bg-white border-[var(--border)] text-[#00032B] hover:border-[#FF0040]'
                      }`}>{bt}</button>
                  ))}
                </div>
              </div>
            )}

            {role === 'hospital' && (
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-[#00032B] uppercase tracking-wide">Organization Name</label>
                <input name="organizationName" type="text" value={form.organizationName} onChange={handleInputChange} placeholder="City General Hospital" required maxLength={120}
                  className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white" />
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full text-white font-bold py-4 rounded-xl transition-all text-sm mt-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, boxShadow: `0 8px 24px ${config.color}40` }}>
              {loading ? 'Creating account...' : `Create ${config.label} Account →`}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--muted-foreground)] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF0040] font-semibold hover:text-[#cc0033]">Login →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
