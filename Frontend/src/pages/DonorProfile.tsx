import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/api';

type DonorProfileData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  dateOfBirth?: string;
  bloodType?: string;
  weight?: number;
  knownConditions?: string;
  lastHealthCheck?: string;
  isVerified?: boolean;
  medicalVerified?: boolean;
  totalDonations?: number;
  livesSaved?: number;
  nextEligibleDate?: string;
};

type ProfileForm = {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  dateOfBirth: string;
  bloodType: string;
  weight: string;
  knownConditions: string;
  lastHealthCheck: string;
};

const emptyForm: ProfileForm = {
  firstName: '',
  lastName: '',
  phone: '',
  city: '',
  dateOfBirth: '',
  bloodType: '',
  weight: '',
  knownConditions: '',
  lastHealthCheck: '',
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function toForm(data: DonorProfileData): ProfileForm {
  let dateOfBirth = '';
  if (data.dateOfBirth) {
    const date = new Date(data.dateOfBirth);
    if (!Number.isNaN(date.getTime())) dateOfBirth = date.toISOString().slice(0, 10);
  }
  return {
    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
    phone: data.phone ?? '',
    city: data.city ?? '',
    dateOfBirth,
    bloodType: data.bloodType ?? '',
    weight: data.weight == null ? '' : String(data.weight),
    knownConditions: data.knownConditions ?? '',
    lastHealthCheck: data.lastHealthCheck ?? '',
  };
}

function errorText(error: unknown) {
  return error instanceof Error ? error.message : 'Could not complete the request.';
}

export default function DonorProfileConnected() {
  const location = useLocation();
  const { user } = useAuth();
  const [profile, setProfile] = useState<DonorProfileData | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getProfile();
        const data = response.data.data as DonorProfileData;
        if (active) {
          setProfile(data);
          setForm(toForm(data));
        }
      } catch (err: unknown) {
        if (active) setError(errorText(err));
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadProfile();
    return () => { active = false; };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);

    const payload: Record<string, string> = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      bloodType: form.bloodType,
      knownConditions: form.knownConditions.trim(),
      lastHealthCheck: form.lastHealthCheck.trim(),
    };
    if (form.dateOfBirth) payload.dateOfBirth = form.dateOfBirth;
    if (form.weight.trim()) payload.weight = form.weight.trim();

    try {
      const response = await updateProfile(payload);
      const data = response.data.data as DonorProfileData;
      setProfile(data);
      setForm(toForm(data));
      setEditing(false);
      setSaved(true);
    } catch (err: unknown) {
      setError(errorText(err));
    } finally {
      setSaving(false);
    }
  };

  const displayName = [profile?.firstName ?? user?.firstName, profile?.lastName ?? user?.lastName]
    .filter(Boolean).join(' ') || 'Donor';

  const inputClass = 'w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white disabled:bg-gray-50 disabled:text-gray-500';

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="donor" userName={displayName} activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Donor</p>
            <h1 className="font-display text-xl font-black text-[#00032B]">My Profile</h1>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Your profile information from BloodLink</p>
          </div>
          {!loading && profile && (
            <button type="button" onClick={() => { setEditing((current) => !current); setError(''); setSaved(false); }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#00032B] text-white hover:bg-[#FF0040] transition-colors">
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          )}
        </div>

        <div className="p-8 max-w-5xl">
          {loading && <div className="rounded-2xl bg-white border border-[var(--border)] p-6 text-sm text-[var(--muted-foreground)]">Loading your profile…</div>}
          {error && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div>}
          {saved && <div role="status" className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-800">Profile updated successfully.</div>}

          {!loading && profile && (
            <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7 flex flex-col items-center text-center h-fit">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FF0040] to-[#FF7B00] flex items-center justify-center text-white font-display font-black text-3xl shadow-lg">
                  {profile.firstName?.[0]?.toUpperCase() ?? 'D'}{profile.lastName?.[0]?.toUpperCase() ?? ''}
                </div>
                <p className="font-display text-xl font-black text-[#00032B] mt-4">{displayName}</p>
                <p className="text-sm text-[var(--muted-foreground)]">Blood donor · {profile.bloodType || 'Blood type not set'}</p>
                <span className={`mt-3 text-xs font-semibold px-3 py-1 rounded-full ${profile.isVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {profile.isVerified ? 'Verified account' : 'Not yet verified'}
                </span>
                <div className="mt-6 w-full border-t border-[var(--border)] pt-5 flex flex-col gap-3">
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">Total donations</span><strong>{profile.totalDonations ?? 0}</strong></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">Lives saved</span><strong>{profile.livesSaved ?? 0}</strong></div>
                  <div className="flex justify-between text-sm"><span className="text-[var(--muted-foreground)]">Medical verification</span><strong>{profile.medicalVerified ? 'Verified' : 'Pending'}</strong></div>
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-6">
                <section className="bg-white rounded-2xl border border-[var(--border)] p-6">
                  <h2 className="font-display font-bold text-[#00032B] mb-5">Personal Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">First name
                      <input className={`${inputClass} mt-1.5`} name="firstName" value={form.firstName} onChange={handleChange} required maxLength={50} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Last name
                      <input className={`${inputClass} mt-1.5`} name="lastName" value={form.lastName} onChange={handleChange} required maxLength={50} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Email address
                      <input className={`${inputClass} mt-1.5`} value={profile.email ?? ''} type="email" disabled />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Phone number
                      <input className={`${inputClass} mt-1.5`} name="phone" value={form.phone} onChange={handleChange} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">City
                      <input className={`${inputClass} mt-1.5`} name="city" value={form.city} onChange={handleChange} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Date of birth
                      <input className={`${inputClass} mt-1.5`} name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} disabled={!editing} />
                    </label>
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-[var(--border)] p-6">
                  <h2 className="font-display font-bold text-[#00032B] mb-5">Donor and Medical Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Blood type
                      <select className={`${inputClass} mt-1.5`} name="bloodType" value={form.bloodType} onChange={handleChange} disabled={!editing} required>
                        <option value="">Select blood type</option>
                        {bloodTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                      </select>
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Weight (kg)
                      <input className={`${inputClass} mt-1.5`} name="weight" type="number" min="45" value={form.weight} onChange={handleChange} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)]">Last health check
                      <input className={`${inputClass} mt-1.5`} name="lastHealthCheck" value={form.lastHealthCheck} onChange={handleChange} disabled={!editing} />
                    </label>
                    <label className="text-xs font-semibold text-[var(--muted-foreground)] sm:col-span-2">Known medical conditions
                      <input className={`${inputClass} mt-1.5`} name="knownConditions" value={form.knownConditions} onChange={handleChange} disabled={!editing} />
                    </label>
                  </div>
                </section>

                {editing && (
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => { setForm(toForm(profile)); setEditing(false); setError(''); }}
                      className="px-5 py-3 rounded-xl border border-[var(--border)] text-sm font-bold text-[#00032B] hover:bg-gray-50">Cancel</button>
                    <button type="submit" disabled={saving}
                      className="px-5 py-3 rounded-xl bg-[#FF0040] text-sm font-bold text-white hover:bg-[#cc0033] disabled:opacity-50">
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
