import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';

/* ─── shared shell ───────────────────────────────────────────────────────── */
function Shell({ title, subtitle, children, actions }: {
  title: string; subtitle?: string; children: ReactNode; actions?: ReactNode;
}) {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="admin" userName="System Admin" activePath={location.pathname} />
      <div className="flex-1 overflow-auto">
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">Admin</p>
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

/* ─── shared helpers ─────────────────────────────────────────────────────── */
type UserStatus = 'Active' | 'Inactive' | 'Suspended';
const statusStyle: Record<UserStatus, string> = {
  Active:    'bg-green-100 text-green-700',
  Inactive:  'bg-gray-100 text-gray-500',
  Suspended: 'bg-red-100 text-[#FF0040]',
};

interface User {
  id: number; name: string; email: string; role: 'Donor' | 'Requester' | 'Hospital' | 'Admin';
  blood?: string; city: string; phone: string; joined: string; status: UserStatus; avatar: string; color: string;
  donations?: number; requests?: number;
}

const ALL_USERS: User[] = [
  { id: 1,  name: 'Marcus Rivera',     email: 'marcus.rivera@email.com',   role: 'Donor',     blood: 'O-',  city: 'New York',    phone: '+1 212-555-0127', joined: 'Mar 2024', status: 'Active',    avatar: 'MR', color: '#FF0040', donations: 14 },
  { id: 2,  name: 'Priya Sharma',      email: 'priya.sharma@email.com',    role: 'Donor',     blood: 'AB+', city: 'Boston',      phone: '+1 617-555-0193', joined: 'Jun 2024', status: 'Active',    avatar: 'PS', color: '#7B2FFF', donations: 8  },
  { id: 3,  name: 'James Okafor',      email: 'james.okafor@email.com',    role: 'Donor',     blood: 'B+',  city: 'Chicago',     phone: '+1 312-555-0145', joined: 'Jan 2024', status: 'Active',    avatar: 'JO', color: '#00B4FF', donations: 22 },
  { id: 4,  name: 'Fatima Al-Hassan',  email: 'fatima.al@email.com',       role: 'Donor',     blood: 'A-',  city: 'Houston',     phone: '+1 713-555-0177', joined: 'Aug 2024', status: 'Inactive',  avatar: 'FA', color: '#FF7B00', donations: 17 },
  { id: 5,  name: 'Luca Bianchi',      email: 'luca.bianchi@email.com',    role: 'Donor',     blood: 'B-',  city: 'Los Angeles', phone: '+1 213-555-0188', joined: 'Sep 2024', status: 'Active',    avatar: 'LB', color: '#00E5A0', donations: 3  },
  { id: 6,  name: 'Elena Vasquez',     email: 'elena.vasquez@email.com',   role: 'Requester', blood: 'A+',  city: 'New York',    phone: '+1 212-555-0184', joined: 'Jan 2025', status: 'Active',    avatar: 'EV', color: '#7B2FFF', requests: 3   },
  { id: 7,  name: 'David Chen',        email: 'david.chen@email.com',      role: 'Requester', blood: 'O+',  city: 'Seattle',     phone: '+1 206-555-0111', joined: 'Mar 2025', status: 'Active',    avatar: 'DC', color: '#FF0040', requests: 5   },
  { id: 8,  name: 'Ana Pérez',         email: 'ana.perez@email.com',       role: 'Requester', blood: 'AB-', city: 'Miami',       phone: '+1 305-555-0155', joined: 'Apr 2025', status: 'Suspended', avatar: 'AP', color: '#00B4FF', requests: 1   },
  { id: 9,  name: 'City General',      email: 'admin@citygeneral.org',     role: 'Hospital',  city: 'New York',    phone: '+1 212-555-9000', joined: 'Jan 2024', status: 'Active',    avatar: 'CG', color: '#00E5A0' },
  { id: 10, name: "St. Mary's Medical",email: 'admin@stmarys.org',         role: 'Hospital',  city: 'Boston',      phone: '+1 617-555-8000', joined: 'Feb 2024', status: 'Active',    avatar: 'SM', color: '#7B2FFF' },
  { id: 11, name: 'Regional Medical',  email: 'admin@regional.org',        role: 'Hospital',  city: 'Chicago',     phone: '+1 312-555-7000', joined: 'Mar 2024', status: 'Inactive',  avatar: 'RM', color: '#FF7B00' },
  { id: 12, name: 'System Admin',      email: 'admin@bloodlink.io',        role: 'Admin',     city: 'Remote',      phone: '+1 800-555-0000', joined: 'Jan 2024', status: 'Active',    avatar: 'SA', color: '#FF0040' },
];

/* ─── edit modal ─────────────────────────────────────────────────────────── */
function EditModal({ user, onClose, onSave }: { user: User; onClose: () => void; onSave: (u: User) => void }) {
  const [form, setForm] = useState({ ...user });
  return (
    <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-7 max-w-lg w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-black text-[#00032B]">Edit User</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#FF0040] hover:text-white transition-colors font-bold">✕</button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          {[
            { l: 'Full Name',  k: 'name',  t: 'text'  },
            { l: 'Email',      k: 'email', t: 'email' },
            { l: 'Phone',      k: 'phone', t: 'tel'   },
            { l: 'City',       k: 'city',  t: 'text'  },
          ].map(f => (
            <div key={f.k}>
              <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
              <input type={f.t} value={(form as any)[f.k]}
                onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
                className="w-full border-2 border-[var(--border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
            </div>
          ))}
        </div>
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Account Status</label>
          <div className="flex gap-2">
            {(['Active','Inactive','Suspended'] as UserStatus[]).map(s => (
              <button key={s} onClick={() => setForm(p => ({ ...p, status: s }))}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.status === s ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)]'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Cancel</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

/* ─── deactivate confirm modal ───────────────────────────────────────────── */
function DeactivateModal({ user, onClose, onConfirm }: { user: User; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
        <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xl mb-5">⚠</div>
        <h3 className="font-display text-xl font-black text-[#00032B] mb-2">
          {user.status === 'Active' ? 'Deactivate' : 'Activate'} Account?
        </h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-6">
          {user.status === 'Active'
            ? `This will prevent ${user.name} from accessing BloodLink. You can reactivate anytime.`
            : `This will restore ${user.name}'s access to BloodLink.`}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white ${user.status === 'Active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'} transition-all`}>
            {user.status === 'Active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── shared user table ──────────────────────────────────────────────────── */
function UserTable({ users, onEdit, onToggle }: {
  users: User[];
  onEdit: (u: User) => void;
  onToggle: (u: User) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--background)] border-b border-[var(--border)]">
              {['User','Role','Blood','Contact','City','Joined','Status','Actions'].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {users.map(u => (
              <tr key={u.id} className={`hover:bg-[var(--background)] transition-colors ${u.status === 'Suspended' ? 'opacity-60' : ''}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-xs shrink-0"
                      style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}bb)` }}>
                      {u.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#00032B] leading-tight">{u.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    u.role === 'Donor'     ? 'bg-[#FF0040]/10 text-[#FF0040]' :
                    u.role === 'Requester' ? 'bg-[#7B2FFF]/10 text-[#7B2FFF]' :
                    u.role === 'Hospital'  ? 'bg-[#00B4FF]/10 text-[#00B4FF]' :
                                             'bg-[#00032B]/10 text-[#00032B]'
                  }`}>{u.role}</span>
                </td>
                <td className="px-5 py-3.5">
                  {u.blood ? <span className="font-display font-black text-[#FF0040]">{u.blood}</span> : <span className="text-[var(--muted-foreground)]">—</span>}
                </td>
                <td className="px-5 py-3.5 font-mono-label text-xs text-[var(--muted-foreground)]">{u.phone}</td>
                <td className="px-5 py-3.5 text-sm text-[var(--muted-foreground)]">{u.city}</td>
                <td className="px-5 py-3.5 font-mono-label text-xs text-[var(--muted-foreground)]">{u.joined}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <button onClick={() => onEdit(u)}
                      className="text-xs border border-[var(--border)] px-2.5 py-1.5 rounded-lg font-semibold hover:border-[#00032B] hover:text-[#00032B] transition-colors whitespace-nowrap">
                      Edit
                    </button>
                    <button onClick={() => onToggle(u)}
                      className={`text-xs border px-2.5 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                        u.status === 'Active'
                          ? 'border-amber-400 text-amber-600 hover:bg-amber-50'
                          : 'border-green-400 text-green-600 hover:bg-green-50'
                      }`}>
                      {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="font-display font-bold text-[#00032B]">No users found</p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── shared user management page ───────────────────────────────────────── */
function UserManagePage({
  title, subtitle, filterRole, actions,
}: {
  title: string; subtitle: string;
  filterRole?: User['role'] | null;
  actions?: ReactNode;
}) {
  const [users, setUsers] = useState(ALL_USERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'All'>('All');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [toggleUser, setToggleUser] = useState<User | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const base = filterRole ? users.filter(u => u.role === filterRole) : users;
  const visible = base.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = (updated: User) => {
    setUsers(p => p.map(u => u.id === updated.id ? updated : u));
    showToast(`${updated.name} updated successfully`);
  };

  const handleToggle = (user: User) => {
    const next: UserStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    setUsers(p => p.map(u => u.id === user.id ? { ...u, status: next } : u));
    showToast(`${user.name} ${next === 'Active' ? 'activated' : 'deactivated'}`);
  };

  const counts = { All: base.length, Active: base.filter(u => u.status === 'Active').length, Inactive: base.filter(u => u.status === 'Inactive').length, Suspended: base.filter(u => u.status === 'Suspended').length };

  return (
    <Shell title={title} subtitle={`${base.length} ${subtitle}`} actions={actions}>
      {toast && (
        <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
          ✓ {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total',     value: counts.All,       from: '#7B2FFF', to: '#a56bff' },
          { label: 'Active',    value: counts.Active,    from: '#00E5A0', to: '#4dffc6' },
          { label: 'Inactive',  value: counts.Inactive,  from: '#FF7B00', to: '#ffac4d' },
          { label: 'Suspended', value: counts.Suspended, from: '#FF0040', to: '#FF0040' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[var(--border)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
              {s.value}
            </div>
            <div>
              <p className="font-display text-xl font-black text-[#00032B]">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-4 mb-5 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-mono-label text-sm">◍</span>
          <input type="text" placeholder="Search name or email..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border-2 border-[var(--border)] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {(['All','Active','Inactive','Suspended'] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${statusFilter === s ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'}`}>
              {s} <span className="ml-1 opacity-70">{(counts as any)[s]}</span>
            </button>
          ))}
        </div>
        {(search || statusFilter !== 'All') && (
          <button onClick={() => { setSearch(''); setStatusFilter('All'); }}
            className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033]">Clear ×</button>
        )}
      </div>

      <p className="text-xs font-mono-label text-[var(--muted-foreground)] mb-3 uppercase tracking-wide">{visible.length} results</p>

      <UserTable users={visible} onEdit={setEditUser} onToggle={setToggleUser} />

      {editUser     && <EditModal       user={editUser}   onClose={() => setEditUser(null)}   onSave={handleSave} />}
      {toggleUser   && <DeactivateModal user={toggleUser} onClose={() => setToggleUser(null)} onConfirm={() => handleToggle(toggleUser)} />}
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   USERS
═══════════════════════════════════════════════════════════════════════════ */
export function AdminUsers() {
  return (
    <UserManagePage title="All Users" subtitle="registered users across all roles" filterRole={null}
      actions={
        <Link to="/dashboard/admin/settings"
          className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
          + Create Admin
        </Link>
      }
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DONORS
═══════════════════════════════════════════════════════════════════════════ */
export function AdminDonors() {
  return (
    <UserManagePage title="Donor Management" subtitle="registered donors" filterRole="Donor" />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BLOOD REQUESTERS
═══════════════════════════════════════════════════════════════════════════ */
export function AdminRequests() {
  return (
    <UserManagePage title="Blood Requesters" subtitle="registered requesters" filterRole="Requester" />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ORGANIZATIONS
═══════════════════════════════════════════════════════════════════════════ */
interface Hospital {
  id: number; name: string; email: string; city: string; phone: string;
  type: string; joined: string; status: UserStatus; avatar: string; color: string;
  beds: number; accredited: boolean;
  docs: { name: string; type: string; date: string; verified: boolean }[];
}

const HOSPITALS: Hospital[] = [
  {
    id: 1, name: 'City General Hospital',   email: 'admin@citygeneral.org',   city: 'New York',  phone: '+1 212-555-9000',
    type: 'Level I Trauma', joined: 'Jan 2024', status: 'Active',   avatar: 'CG', color: '#00E5A0', beds: 850, accredited: true,
    docs: [
      { name: 'JCI Accreditation Certificate',  type: 'PDF', date: 'Jan 2023', verified: true  },
      { name: 'Hospital Registration License',  type: 'PDF', date: 'Mar 2024', verified: true  },
      { name: 'AABB Blood Bank Certification',  type: 'PDF', date: 'Feb 2024', verified: true  },
      { name: 'ISO 9001:2015 Certificate',      type: 'PDF', date: 'Nov 2022', verified: false },
    ],
  },
  {
    id: 2, name: "St. Mary's Medical Center",email: 'admin@stmarys.org',       city: 'Boston',    phone: '+1 617-555-8000',
    type: 'Community Hospital', joined: 'Feb 2024', status: 'Active',   avatar: 'SM', color: '#7B2FFF', beds: 420, accredited: true,
    docs: [
      { name: 'Hospital Operating License',     type: 'PDF', date: 'Apr 2024', verified: true  },
      { name: 'Blood Bank Authorization',       type: 'PDF', date: 'Feb 2024', verified: true  },
    ],
  },
  {
    id: 3, name: 'Regional Medical Center',  email: 'admin@regional.org',      city: 'Chicago',   phone: '+1 312-555-7000',
    type: 'Level II Trauma', joined: 'Mar 2024', status: 'Inactive', avatar: 'RM', color: '#FF7B00', beds: 310, accredited: false,
    docs: [
      { name: 'Pending Registration',           type: 'PDF', date: 'Sep 2024', verified: false },
    ],
  },
  {
    id: 4, name: 'Lakewood Medical',         email: 'admin@lakewood.org',      city: 'Denver',    phone: '+1 720-555-6000',
    type: 'Specialty Center', joined: 'Jun 2024', status: 'Active',   avatar: 'LM', color: '#00B4FF', beds: 180, accredited: true,
    docs: [
      { name: 'Specialty Center License',       type: 'PDF', date: 'Jun 2024', verified: true  },
      { name: 'Hematology Dept. Certification', type: 'PDF', date: 'Jul 2024', verified: true  },
    ],
  },
];

export function AdminOrganizations() {
  const [hospitals, setHospitals]  = useState(HOSPITALS);
  const [search, setSearch]        = useState('');
  const [statusFilter, setStatus]  = useState<UserStatus | 'All'>('All');
  const [expanded, setExpanded]    = useState<number | null>(null);
  const [removeId, setRemoveId]    = useState<number | null>(null);
  const [toast, setToast]          = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };

  const visible = hospitals.filter(h => {
    const ms = !search || h.name.toLowerCase().includes(search.toLowerCase()) || h.city.toLowerCase().includes(search.toLowerCase());
    const mst = statusFilter === 'All' || h.status === statusFilter;
    return ms && mst;
  });

  const toggle = (id: number) => {
    setHospitals(p => p.map(h => h.id === id ? { ...h, status: h.status === 'Active' ? 'Inactive' as UserStatus : 'Active' as UserStatus } : h));
    showToast('Hospital status updated');
  };

  const remove = (id: number) => {
    setHospitals(p => p.filter(h => h.id !== id));
    setRemoveId(null);
    showToast('Hospital removed from BloodLink');
  };

  return (
    <Shell title="Organizations" subtitle={`${hospitals.length} hospitals registered on BloodLink`}
      actions={
        <button className="bg-[#00032B] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FF0040] transition-all">
          + Add Hospital
        </button>
      }>

      {toast && (
        <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
          ✓ {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Hospitals',   value: hospitals.length,                              from: '#7B2FFF', to: '#a56bff' },
          { label: 'Active',            value: hospitals.filter(h => h.status === 'Active').length, from: '#00E5A0', to: '#4dffc6' },
          { label: 'Accredited',        value: hospitals.filter(h => h.accredited).length,    from: '#00B4FF', to: '#60d0ff' },
          { label: 'Pending Review',    value: hospitals.filter(h => !h.accredited).length,   from: '#FF7B00', to: '#ffac4d' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[var(--border)] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
              {s.value}
            </div>
            <div>
              <p className="font-display text-xl font-black text-[#00032B]">{s.value}</p>
              <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-4 mb-5 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] font-mono-label text-sm">◍</span>
          <input type="text" placeholder="Search hospitals..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border-2 border-[var(--border)] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {(['All','Active','Inactive'] as const).map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${statusFilter === s ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {visible.map(h => {
          const isOpen = expanded === h.id;
          return (
            <div key={h.id} className="bg-white rounded-2xl border-2 border-[var(--border)] overflow-hidden hover:border-[#00032B]/25 transition-all">
              {/* Main row */}
              <div className="flex items-center gap-5 p-5 flex-wrap">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-lg text-white shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${h.color}, ${h.color}bb)` }}>
                  {h.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-0.5">
                    <p className="font-display font-bold text-[#00032B]">{h.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusStyle[h.status]}`}>{h.status}</span>
                    {h.accredited
                      ? <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">✓ Accredited</span>
                      : <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full">⚠ Pending</span>}
                  </div>
                  <div className="flex gap-4 text-xs text-[var(--muted-foreground)] font-mono-label flex-wrap">
                    <span>{h.type}</span>
                    <span>◆ {h.beds} beds</span>
                    <span>◎ {h.city}</span>
                    <span>◷ Joined {h.joined}</span>
                    <span>{h.email}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setExpanded(isOpen ? null : h.id)}
                    className="text-xs border border-[var(--border)] px-3 py-1.5 rounded-lg font-semibold hover:border-[#00032B] transition-colors">
                    {isOpen ? 'Collapse ↑' : 'Documents ↓'}
                  </button>
                  <button onClick={() => toggle(h.id)}
                    className={`text-xs border px-3 py-1.5 rounded-lg font-semibold transition-colors ${h.status === 'Active' ? 'border-amber-400 text-amber-600 hover:bg-amber-50' : 'border-green-400 text-green-600 hover:bg-green-50'}`}>
                    {h.status === 'Active' ? 'Revoke Access' : 'Grant Access'}
                  </button>
                  <button onClick={() => setRemoveId(h.id)}
                    className="text-xs border border-[#FF0040]/30 text-[#FF0040] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#FF0040]/5 transition-colors">
                    Remove
                  </button>
                </div>
              </div>

              {/* Documents panel */}
              {isOpen && (
                <div className="border-t border-[var(--border)] bg-[var(--background)] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold text-[#00032B] uppercase tracking-wide font-mono-label">Hospital Documents ({h.docs.length})</p>
                    <button className="text-xs text-[#FF0040] font-semibold hover:text-[#cc0033]">+ Upload Document</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {h.docs.map(d => (
                      <div key={d.name} className="bg-white rounded-xl border border-[var(--border)] p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${d.verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {d.type}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#00032B] leading-tight truncate">{d.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{d.date}</p>
                            <span className={`text-xs font-bold ${d.verified ? 'text-green-600' : 'text-amber-600'}`}>
                              {d.verified ? '✓ Verified' : '⚠ Unverified'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button className="text-xs border border-[var(--border)] px-2 py-1 rounded-lg hover:border-[#00032B] transition-colors font-semibold">View</button>
                          {!d.verified && (
                            <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg font-semibold hover:bg-green-600 transition-colors">Verify</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Remove modal */}
      {removeId !== null && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center text-[#FF0040] font-bold text-xl mb-5">!</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2">Remove Hospital?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">
              <strong className="text-[#00032B]">{hospitals.find(h => h.id === removeId)?.name}</strong> will be removed from BloodLink. All their requests and data will be archived.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setRemoveId(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold">Cancel</button>
              <button onClick={() => remove(removeId)} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">Remove</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   REPORTS
═══════════════════════════════════════════════════════════════════════════ */
interface Report {
  id: string; hospital: string; hospitalColor: string; type: string; period: string;
  generated: string; generatedBy: string; size: string; sections: number;
}

const REPORTS_DATA: Report[] = [
  { id: 'RPT-2026-0921-CGH', hospital: 'City General Hospital',   hospitalColor: '#00E5A0', type: 'Monthly',   period: 'Sept 1–21, 2026', generated: 'Sept 21, 2026', generatedBy: 'City General Admin', size: '2.4 MB', sections: 8 },
  { id: 'RPT-2026-0901-CGH', hospital: 'City General Hospital',   hospitalColor: '#00E5A0', type: 'Monthly',   period: 'Aug 1–31, 2026',  generated: 'Sep 1, 2026',  generatedBy: 'City General Admin', size: '2.1 MB', sections: 8 },
  { id: 'RPT-2026-0901-SMH', hospital: "St. Mary's Medical",     hospitalColor: '#7B2FFF', type: 'Monthly',   period: 'Aug 1–31, 2026',  generated: 'Sep 1, 2026',  generatedBy: "St. Mary's Admin",   size: '1.8 MB', sections: 6 },
  { id: 'RPT-2026-Q3-CGH',   hospital: 'City General Hospital',   hospitalColor: '#00E5A0', type: 'Quarterly', period: 'Q3 2026',          generated: 'Sep 15, 2026', generatedBy: 'Admin System',       size: '5.2 MB', sections: 12 },
  { id: 'RPT-2026-0801-LMH', hospital: 'Lakewood Medical',        hospitalColor: '#00B4FF', type: 'Monthly',   period: 'Jul 1–31, 2026',  generated: 'Aug 1, 2026',  generatedBy: 'Lakewood Admin',     size: '1.2 MB', sections: 5 },
  { id: 'RPT-2026-0701-RMC', hospital: 'Regional Medical Center', hospitalColor: '#FF7B00', type: 'Monthly',   period: 'Jun 1–30, 2026',  generated: 'Jul 1, 2026',  generatedBy: 'Admin System',       size: '0.9 MB', sections: 4 },
];

export function AdminReports() {
  const [reports, setReports] = useState(REPORTS_DATA);
  const [search, setSearch]   = useState('');
  const [typeFilter, setType] = useState('All');
  const [hospFilter, setHosp] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };

  const hospitals = [...new Set(REPORTS_DATA.map(r => r.hospital))];
  const types = ['All', 'Monthly', 'Quarterly', 'Annual', 'Custom'];

  const visible = reports.filter(r => {
    const ms = !search || r.id.toLowerCase().includes(search.toLowerCase()) || r.hospital.toLowerCase().includes(search.toLowerCase());
    const mt = typeFilter === 'All' || r.type === typeFilter;
    const mh = hospFilter === 'All' || r.hospital === hospFilter;
    return ms && mt && mh;
  });

  const grouped = hospitals.reduce((acc, h) => {
    acc[h] = visible.filter(r => r.hospital === h);
    return acc;
  }, {} as Record<string, Report[]>);

  const doDelete = (id: string) => { setReports(p => p.filter(r => r.id !== id)); setDeleteId(null); showToast('Report deleted'); };

  return (
    <Shell title="Reports" subtitle={`${reports.length} reports across ${hospitals.length} hospitals`}
      actions={
        <button onClick={() => setShowCreate(true)}
          className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
          + Create Report
        </button>
      }>

      {toast && (
        <div className="fixed top-20 right-6 bg-[#00032B] text-white text-sm px-5 py-3 rounded-xl shadow-xl z-50 border border-[#FF0040]/30 font-semibold">
          ✓ {toast}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[var(--border)] p-4 mb-6 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] text-sm">◍</span>
          <input type="text" placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full border-2 border-[var(--border)] rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
        </div>
        <div className="flex gap-1.5">
          {types.map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${typeFilter === t ? 'bg-[#00032B] border-[#00032B] text-white' : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[#00032B]'}`}>
              {t}
            </button>
          ))}
        </div>
        <select value={hospFilter} onChange={e => setHosp(e.target.value)}
          className="border-2 border-[var(--border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
          <option value="All">All Hospitals</option>
          {hospitals.map(h => <option key={h}>{h}</option>)}
        </select>
      </div>

      {/* Grouped by hospital */}
      {Object.entries(grouped).filter(([, rpts]) => rpts.length > 0).map(([hospital, rpts]) => {
        const color = REPORTS_DATA.find(r => r.hospital === hospital)?.hospitalColor || '#FF0040';
        return (
          <div key={hospital} className="mb-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                style={{ background: color }}>{hospital[0]}</div>
              <h3 className="font-display font-bold text-[#00032B]">{hospital}</h3>
              <span className="text-xs font-mono-label text-[var(--muted-foreground)] bg-[var(--muted)] px-2.5 py-1 rounded-full">{rpts.length} reports</span>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[var(--background)] border-b border-[var(--border)]">
                      {['Report ID','Type','Period','Generated','By','Sections','Size','Actions'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted-foreground)] font-mono-label uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {rpts.map(r => (
                      <tr key={r.id} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-4 py-3.5 font-mono-label text-xs text-[var(--muted-foreground)]">{r.id}</td>
                        <td className="px-4 py-3.5">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.type === 'Monthly' ? 'bg-blue-100 text-blue-700' : r.type === 'Quarterly' ? 'bg-purple-100 text-[#7B2FFF]' : 'bg-amber-100 text-amber-700'}`}>
                            {r.type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-[var(--muted-foreground)] font-mono-label whitespace-nowrap">{r.period}</td>
                        <td className="px-4 py-3.5 text-xs text-[var(--muted-foreground)] font-mono-label whitespace-nowrap">{r.generated}</td>
                        <td className="px-4 py-3.5 text-xs text-[#00032B] font-medium">{r.generatedBy}</td>
                        <td className="px-4 py-3.5 font-bold text-center">{r.sections}</td>
                        <td className="px-4 py-3.5 text-xs text-[var(--muted-foreground)] font-mono-label">{r.size}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex gap-1.5">
                            <button className="text-xs border border-[var(--border)] px-2.5 py-1.5 rounded-lg font-semibold hover:border-[#00032B] transition-colors">View</button>
                            <button className="text-xs bg-[#00032B] text-white px-2.5 py-1.5 rounded-lg font-semibold hover:bg-[#FF0040] transition-colors">⬇</button>
                            <button onClick={() => setDeleteId(r.id)}
                              className="text-xs border border-[#FF0040]/30 text-[#FF0040] px-2.5 py-1.5 rounded-lg font-semibold hover:bg-[#FF0040]/5 transition-colors">✕</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      })}

      {visible.length === 0 && (
        <div className="bg-white rounded-2xl border border-[var(--border)] p-14 text-center">
          <p className="font-display font-bold text-[#00032B] mb-1">No reports found</p>
          <p className="text-sm text-[var(--muted-foreground)]">Try adjusting filters or create a new report.</p>
        </div>
      )}

      {/* Create report modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-black text-[#00032B]">Create New Report</h3>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#FF0040] hover:text-white transition-colors font-bold">✕</button>
            </div>
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Hospital</label>
                <select defaultValue="" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  <option value="">Select hospital</option>
                  {hospitals.map(h => <option key={h}>{h}</option>)}
                  <option>All Hospitals (System-wide)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">Report Type</label>
                <select defaultValue="Monthly" className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors bg-white">
                  <option>Monthly</option><option>Quarterly</option><option>Annual</option><option>Custom</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">From</label>
                  <input type="date" className="w-full border-2 border-[var(--border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">To</label>
                  <input type="date" className="w-full border-2 border-[var(--border)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowCreate(false)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold">Cancel</button>
              <button onClick={() => { setShowCreate(false); showToast('Report generation started'); }}
                className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
                Generate →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF0040]/10 flex items-center justify-center text-[#FF0040] font-bold text-xl mb-5">!</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2">Delete Report?</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-2 font-mono-label">{deleteId}</p>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">This report will be permanently deleted and cannot be recovered.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold">Cancel</button>
              <button onClick={() => doDelete(deleteId)} className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">Delete</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════════════════════════════════ */
type ANType = 'new_user' | 'hospital_request' | 'report_ready' | 'system' | 'emergency' | 'flag';
const aNMeta: Record<ANType, { icon: string; color: string; bg: string }> = {
  emergency:       { icon: '!',  color: 'text-white',                        bg: 'bg-[#FF0040]'   },
  new_user:        { icon: '◉', color: 'text-[#7B2FFF]',                    bg: 'bg-purple-100'  },
  hospital_request:{ icon: '+',  color: 'text-[#00B4FF]',                    bg: 'bg-blue-100'    },
  report_ready:    { icon: '★', color: 'text-amber-600',                    bg: 'bg-amber-100'   },
  system:          { icon: '◎', color: 'text-[var(--muted-foreground)]',    bg: 'bg-[var(--muted)]' },
  flag:            { icon: '⚑', color: 'text-orange-600',                   bg: 'bg-orange-100'  },
};

const ADMIN_NOTIFS = [
  { id: 1, type: 'emergency'        as ANType, title: 'Platform Emergency Alert',         body: '3 simultaneous emergency requests active across New York hospitals. Blood supply critical for O-.',  time: '1 hr ago',   read: false },
  { id: 2, type: 'new_user'         as ANType, title: '12 New Users This Week',           body: '8 donors and 4 requesters registered this week. 2 accounts pending identity verification.',         time: '3 hrs ago',  read: false, link: '/dashboard/admin/users'          },
  { id: 3, type: 'hospital_request' as ANType, title: 'New Hospital Registration',        body: 'Memorial Hospital (Houston, TX) submitted a registration request. Documents pending review.',        time: '5 hrs ago',  read: false, link: '/dashboard/admin/organizations'  },
  { id: 4, type: 'flag'             as ANType, title: 'Suspicious Activity Flagged',      body: 'User ID #8 (Ana Pérez) flagged for 5 failed login attempts. Account auto-suspended.',               time: '7 hrs ago',  read: false, link: '/dashboard/admin/users'          },
  { id: 5, type: 'report_ready'     as ANType, title: 'Q3 2026 System Report Ready',      body: 'Platform-wide Q3 2026 report generated: 2,341 requests · 1,784 donations · 203 emergency cases.',   time: 'Sept 20',    read: true,  link: '/dashboard/admin/reports'        },
  { id: 6, type: 'system'           as ANType, title: 'Database Backup Complete',         body: 'Scheduled nightly backup completed successfully. Size: 18.4 GB. Next backup: Sept 22, 02:00 UTC.',   time: 'Sept 20',    read: true  },
  { id: 7, type: 'hospital_request' as ANType, title: "St. Mary's Document Verified",    body: "St. Mary's Medical submitted and verified their AABB Blood Bank Certification.",                      time: 'Sept 19',    read: true,  link: '/dashboard/admin/organizations'  },
  { id: 8, type: 'system'           as ANType, title: 'Scheduled Maintenance Reminder',   body: 'Platform maintenance window: Sept 22, 00:00–02:00 UTC. All hospital admins have been notified.',     time: 'Sept 18',    read: true  },
];

export function AdminNotifications() {
  const [notifs, setNotifs] = useState(ADMIN_NOTIFS);
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
          const meta = aNMeta[n.type];
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
                  {(n as any).link && (
                    <Link to={(n as any).link} onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 text-xs text-[#FF0040] font-semibold mt-2 hover:text-[#cc0033] transition-colors">
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
   SETTINGS
═══════════════════════════════════════════════════════════════════════════ */
export function AdminSettings() {
  const [activeSection, setActiveSection] = useState('platform');
  const [saved, setSaved] = useState('');
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [adminCreated, setAdminCreated] = useState(false);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });

  const [notifPrefs, setNotifPrefs] = useState({
    emailNewUsers: true, emailHospitalRequests: true, emailEmergency: true, emailReportReady: true, emailSystem: false,
    smsEmergency: true, smsFlagged: true,
    pushAll: true, pushEmergencyOnly: false,
  });
  const [platform, setPlatform] = useState({
    maintenanceMode: false, registrationOpen: true, autoVerifyDonors: false, requireHospitalDocs: true,
  });

  const handleSave = (s: string) => { setSaved(s); setTimeout(() => setSaved(''), 2500); };

  const handleCreateAdmin = () => {
    if (!adminForm.name || !adminForm.email || !adminForm.password) return;
    setAdminCreated(true);
    setTimeout(() => { setShowCreateAdmin(false); setAdminCreated(false); setAdminForm({ name: '', email: '', phone: '', password: '', confirm: '' }); }, 2000);
  };

  const sections = [
    { id: 'platform', label: 'Platform Settings',   icon: '◆', color: '#FF0040' },
    { id: 'password', label: 'Change Password',      icon: '◈', color: '#7B2FFF' },
    { id: 'notifs',   label: 'Notification Prefs',   icon: '◎', color: '#00B4FF' },
    { id: 'admins',   label: 'Admin Accounts',       icon: '◉', color: '#FF7B00' },
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

  const currentAdmins = ALL_USERS.filter(u => u.role === 'Admin');

  return (
    <Shell title="Settings" subtitle="Platform configuration, admin accounts, and system preferences">
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
                {s.id === 'admins' && <span className="ml-auto text-xs bg-white/25 px-1.5 py-0.5 rounded-full">{currentAdmins.length}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          {/* Platform Settings */}
          {activeSection === 'platform' && (
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Platform Configuration</h2>
                <div className="grid sm:grid-cols-2 gap-5 mb-6">
                  {[
                    { l: 'Platform Name',      v: 'BloodLink' },
                    { l: 'Support Email',       v: 'support@bloodlink.io' },
                    { l: 'Emergency Hotline',   v: '+1 800-555-0000' },
                    { l: 'Admin Portal URL',    v: 'admin.bloodlink.io' },
                  ].map(f => (
                    <div key={f.l}>
                      <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                      <input defaultValue={f.v} className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-3">Platform Controls</p>
                <div className="bg-[var(--background)] rounded-xl px-4 divide-y divide-[var(--border)] mb-5">
                  <Toggle checked={platform.maintenanceMode}
                    onChange={() => setPlatform(p => ({ ...p, maintenanceMode: !p.maintenanceMode }))}
                    label="Maintenance Mode" desc="Disables user-facing access — only admins can log in" />
                  <Toggle checked={platform.registrationOpen}
                    onChange={() => setPlatform(p => ({ ...p, registrationOpen: !p.registrationOpen }))}
                    label="Open Registration" desc="Allow new donors and requesters to register" />
                  <Toggle checked={platform.autoVerifyDonors}
                    onChange={() => setPlatform(p => ({ ...p, autoVerifyDonors: !p.autoVerifyDonors }))}
                    label="Auto-Verify Donors" desc="Automatically verify donor accounts on registration" />
                  <Toggle checked={platform.requireHospitalDocs}
                    onChange={() => setPlatform(p => ({ ...p, requireHospitalDocs: !p.requireHospitalDocs }))}
                    label="Require Hospital Documents" desc="Hospitals must upload and get verified docs before going active" />
                </div>
                <button onClick={() => handleSave('Platform settings')}
                  className="bg-[#FF0040] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
                  Save Platform Settings →
                </button>
              </div>

              <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white">
                <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-4">System Health</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Uptime',       value: '99.9%',   ok: true  },
                    { label: 'DB Status',    value: 'Healthy', ok: true  },
                    { label: 'API Latency',  value: '42ms',    ok: true  },
                    { label: 'Alerts',       value: '2',       ok: false },
                  ].map(s => (
                    <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl p-3 text-center">
                      <div className={`w-2 h-2 rounded-full mx-auto mb-1.5 ${s.ok ? 'bg-green-400' : 'bg-amber-400'}`} />
                      <p className="font-display font-black text-lg">{s.value}</p>
                      <p className="text-xs text-white/40 font-mono-label">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Password */}
          {activeSection === 'password' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Change Admin Password</h2>
              <div className="flex flex-col gap-4 max-w-sm">
                {[
                  { l: 'Current Password', p: 'Enter current password' },
                  { l: 'New Password', p: 'Min. 12 characters recommended' },
                  { l: 'Confirm Password', p: 'Repeat new password' },
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

          {/* Notifications */}
          {activeSection === 'notifs' && (
            <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
              <h2 className="font-display font-bold text-[#00032B] text-lg mb-6">Notification Preferences</h2>
              {[
                { heading: 'Email Alerts', icon: '◎', color: '#00B4FF', items: [
                  { k: 'emailNewUsers',         l: 'New user registrations',     d: 'Alert when new users sign up' },
                  { k: 'emailHospitalRequests', l: 'Hospital access requests',   d: 'New hospitals requesting to join' },
                  { k: 'emailEmergency',        l: 'Platform emergencies',       d: 'Critical blood shortage alerts' },
                  { k: 'emailReportReady',      l: 'Report generated',           d: 'When a hospital or admin generates a report' },
                  { k: 'emailSystem',           l: 'System status updates',      d: 'Backups, maintenance, errors' },
                ]},
                { heading: 'SMS', icon: '◆', color: '#FF0040', items: [
                  { k: 'smsEmergency', l: 'Emergency platform alerts', d: 'Critical events via SMS' },
                  { k: 'smsFlagged',   l: 'Flagged account alerts',    d: 'Suspicious activity notifications' },
                ]},
                { heading: 'Push', icon: '◈', color: '#7B2FFF', items: [
                  { k: 'pushAll',           l: 'All notifications', d: 'Browser push notifications' },
                  { k: 'pushEmergencyOnly', l: 'Emergency only',    d: 'Only critical alerts' },
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
                className="bg-[#00B4FF] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-sky-600 transition-all">
                Save Preferences →
              </button>
            </div>
          )}

          {/* Admin Accounts — special feature */}
          {activeSection === 'admins' && (
            <div className="flex flex-col gap-5">
              <div className="bg-gradient-to-br from-[#00032B] to-[#1a1d4e] rounded-2xl p-6 text-white flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-mono-label text-xs text-white/40 uppercase tracking-widest mb-1">Admin-Only Feature</p>
                  <h2 className="font-display text-xl font-black">Admin Account Management</h2>
                  <p className="text-white/55 text-sm mt-1">Only existing admins can create or remove admin accounts.</p>
                </div>
                <button onClick={() => setShowCreateAdmin(true)}
                  className="bg-[#FF0040] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all shrink-0">
                  + Create Admin Account
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--border)]">
                  <h3 className="font-display font-bold text-[#00032B]">Active Admin Accounts</h3>
                </div>
                <div className="divide-y divide-[var(--border)]">
                  {currentAdmins.map(u => (
                    <div key={u.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[var(--background)] transition-colors flex-wrap">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                        style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}bb)` }}>
                        {u.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-[#00032B]">{u.name}</p>
                          {u.name === 'System Admin' && (
                            <span className="text-xs bg-[#FF0040] text-white font-bold px-2 py-0.5 rounded-full">Super Admin</span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{u.email} · Joined {u.joined}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusStyle[u.status]}`}>{u.status}</span>
                        {u.name !== 'System Admin' && (
                          <button className="text-xs border border-[#FF0040]/30 text-[#FF0040] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#FF0040]/5 transition-colors">
                            Remove
                          </button>
                        )}
                        {u.name === 'System Admin' && (
                          <span className="text-xs text-[var(--muted-foreground)] font-mono-label">Cannot remove</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <span className="text-amber-600 font-bold text-lg shrink-0">⚠</span>
                  <div>
                    <p className="font-semibold text-sm text-amber-900">Admin Account Security</p>
                    <p className="text-xs text-amber-700 mt-1">Admin accounts have full platform access. Only create accounts for trusted personnel. All admin actions are logged and audited. The Super Admin account cannot be removed or deactivated.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Danger Zone */}
          {activeSection === 'danger' && (
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h2 className="font-display font-bold text-[#00032B] text-lg mb-5">Danger Zone</h2>
                <div className="flex flex-col gap-4">
                  {[
                    { l: 'Enable Maintenance Mode', d: 'Immediately lock out all non-admin users from the platform.', a: 'Enable', style: 'border-amber-400 text-amber-600 hover:bg-amber-50' },
                    { l: 'Export All Platform Data', d: 'Download full backup of all users, requests, reports, and logs.',  a: 'Export',  style: 'border-[var(--border)] text-[#00032B] hover:border-[#00032B]' },
                    { l: 'Purge Inactive Accounts',  d: 'Permanently delete accounts that have been inactive for 12+ months.', a: 'Purge', style: 'border-orange-400 text-orange-600 hover:bg-orange-50' },
                  ].map(item => (
                    <div key={item.l} className="flex items-center justify-between p-4 rounded-xl border-2 border-[var(--border)] hover:border-[#00032B]/20 transition-colors">
                      <div>
                        <p className="font-semibold text-sm text-[#00032B]">{item.l}</p>
                        <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.d}</p>
                      </div>
                      <button className={`text-xs border-2 px-4 py-2 rounded-lg font-semibold transition-colors shrink-0 ml-4 ${item.style}`}>{item.a}</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--border)] p-7">
                <h3 className="font-display font-bold text-[#00032B] mb-2">Activity Audit Log</h3>
                <p className="text-xs text-[var(--muted-foreground)] mb-4">Recent administrator actions</p>
                {[
                  { action: 'Deactivated user Ana Pérez (ID #8)',           admin: 'System Admin', time: '7 hrs ago',  type: 'warn' },
                  { action: 'Verified City General Hospital documents',      admin: 'System Admin', time: 'Sept 20',    type: 'ok'   },
                  { action: 'Generated Q3 2026 system-wide report',         admin: 'System Admin', time: 'Sept 15',    type: 'info' },
                  { action: 'Removed Regional Medical Center (user request)',admin: 'System Admin', time: 'Sept 10',    type: 'warn' },
                ].map((l, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-[var(--border)] last:border-0">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${l.type === 'ok' ? 'bg-green-400' : l.type === 'warn' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#00032B] font-medium">{l.action}</p>
                      <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{l.admin} · {l.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateAdmin && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            {adminCreated ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-3xl bg-green-100 flex items-center justify-center text-green-500 font-bold text-3xl mx-auto mb-4">✓</div>
                <p className="font-display text-xl font-black text-[#00032B]">Admin Account Created!</p>
                <p className="text-sm text-[var(--muted-foreground)] mt-2">Credentials sent to {adminForm.email}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-black text-[#00032B]">Create Admin Account</h3>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Admin-only feature · Actions are logged</p>
                  </div>
                  <button onClick={() => setShowCreateAdmin(false)} className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[#FF0040] hover:text-white transition-colors font-bold">✕</button>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-700 font-medium">
                  ⚠ New admin will have full platform access. Only create for trusted personnel.
                </div>
                <div className="flex flex-col gap-4 mb-5">
                  {[
                    { l: 'Full Name',  k: 'name',     t: 'text',     p: 'Admin full name' },
                    { l: 'Email',      k: 'email',    t: 'email',    p: 'admin@bloodlink.io' },
                    { l: 'Phone',      k: 'phone',    t: 'tel',      p: '+1 (___) ___-____' },
                    { l: 'Password',   k: 'password', t: 'password', p: 'Min. 12 characters' },
                    { l: 'Confirm',    k: 'confirm',  t: 'password', p: 'Repeat password' },
                  ].map(f => (
                    <div key={f.k}>
                      <label className="block text-xs font-semibold text-[#00032B] uppercase tracking-wide mb-1.5">{f.l}</label>
                      <input type={f.t} placeholder={f.p} value={(adminForm as any)[f.k]}
                        onChange={e => setAdminForm(p => ({ ...p, [f.k]: e.target.value }))}
                        className="w-full border-2 border-[var(--border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF0040] transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowCreateAdmin(false)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold">Cancel</button>
                  <button onClick={handleCreateAdmin}
                    className="flex-1 bg-[#FF0040] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#cc0033] transition-all">
                    Create Admin →
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
