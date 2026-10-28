import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import DashboardSidebar from '../components/DashboardSidebar';

const stats = [
  { label: 'Total Users', value: '12,847', sub: '+124 this week', icon: '◉', path: '/dashboard/admin/users', from: '#FF0040', to: '#ff4d6d' },
  { label: 'Total Donors', value: '8,413', sub: '+87 this week', icon: '◆', path: '/dashboard/admin/donors', from: '#7B2FFF', to: '#a56bff' },
  { label: 'Active Requests', value: '342', sub: '28 emergency', icon: '▤', path: '/dashboard/admin/requests', from: '#FF7B00', to: '#ffac4d' },
  { label: 'Reported Accounts', value: '17', sub: '5 unresolved', icon: '◍', path: '/dashboard/admin/reports', from: '#00B4FF', to: '#4dd1ff' },
];

const recentUsers = [
  { id: 1, name: 'Aisha Patel', email: 'aisha@email.com', role: 'Donor', status: 'Active', joined: 'Sept 21', avatar: 'AP', color: '#FF0040' },
  { id: 2, name: 'Carlos Mendez', email: 'carlos@email.com', role: 'Requester', status: 'Active', joined: 'Sept 20', avatar: 'CM', color: '#7B2FFF' },
  { id: 3, name: 'Sunrise Medical', email: 'admin@sunrise.org', role: 'Hospital', status: 'Pending', joined: 'Sept 20', avatar: 'SM', color: '#00B4FF' },
  { id: 4, name: 'Yuki Tanaka', email: 'yuki@email.com', role: 'Donor', status: 'Active', joined: 'Sept 19', avatar: 'YT', color: '#00E5A0' },
  { id: 5, name: 'Robert Osei', email: 'robert@email.com', role: 'Donor', status: 'Inactive', joined: 'Sept 18', avatar: 'RO', color: '#FF7B00' },
];

export default function AdminDashboard() {
  const location = useLocation();
  const [users, setUsers] = useState(recentUsers);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const deactivate = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'Inactive' } : u));
    setConfirmId(null);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <DashboardSidebar role="admin" userName="Admin User" activePath={location.pathname} />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-[var(--border)] px-8 py-5 sticky top-0 z-10">
          <p className="font-mono-label text-xs text-[var(--muted-foreground)] uppercase tracking-widest">System</p>
          <h1 className="font-display text-xl font-black text-[#00032B]">Admin Dashboard</h1>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(s => (
              <Link key={s.label} to={s.path}
                className="bg-white rounded-2xl border border-[var(--border)] p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full -translate-y-1/2 translate-x-1/3 opacity-10"
                  style={{ background: s.from }} />
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-mono-label text-lg mb-4 text-white relative z-10"
                  style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                  {s.icon}
                </div>
                <p className="font-display text-3xl font-black text-[#00032B] mb-0.5 group-hover:text-[#FF0040] transition-colors">{s.value}</p>
                <p className="text-sm font-semibold text-[#00032B] mb-0.5">{s.label}</p>
                <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{s.sub}</p>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Users table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[var(--border)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
                <div>
                  <h2 className="font-display font-bold text-[#00032B]">Recent Users</h2>
                  <p className="text-xs font-mono-label text-[var(--muted-foreground)]">Latest registrations</p>
                </div>
                <Link to="/dashboard/admin/users" className="text-xs font-semibold text-[#FF0040] hover:text-[#cc0033]">View all →</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      {['User', 'Role', 'Status', 'Joined', ''].map(h => (
                        <th key={h} className="text-left px-6 py-3 text-xs font-mono-label text-[var(--muted-foreground)] uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-[var(--background)] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                              style={{ background: user.color }}>
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#00032B]">{user.name}</p>
                              <p className="text-xs text-[var(--muted-foreground)] font-mono-label">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono-label text-[var(--muted-foreground)]">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            user.status === 'Active' ? 'bg-green-100 text-green-700' :
                            user.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'
                          }`}>{user.status}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono-label text-[var(--muted-foreground)]">{user.joined}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/dashboard/admin/users/${user.id}`} className="text-xs border border-[var(--border)] px-3 py-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors font-semibold">View</Link>
                            <button onClick={() => setConfirmId(user.id)}
                              className="text-xs border border-orange-200 text-orange-600 px-3 py-1.5 rounded-lg hover:bg-orange-50 transition-colors font-semibold">Deactivate</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-br from-[#00032B] via-[#0d0f3a] to-[#1a0030] rounded-2xl p-6 text-white">
                <p className="font-mono-label text-xs text-white/35 uppercase tracking-widest mb-4">Platform health</p>
                {[
                  { label: 'API Uptime', val: '99.9%', color: '#00E5A0', w: '99%' },
                  { label: 'Match Rate', val: '94.2%', color: '#FF0040', w: '94%' },
                  { label: 'Donor Activity', val: '68%', color: '#7B2FFF', w: '68%' },
                ].map(m => (
                  <div key={m.label} className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-white/55 font-mono-label">{m.label}</span>
                      <span className="text-xs font-bold" style={{ color: m.color }}>{m.val}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: m.w, background: m.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {[
                { label: 'User Management', path: '/dashboard/admin/users', icon: '◉', color: '#FF0040' },
                { label: 'Blood Requests', path: '/dashboard/admin/requests', icon: '◆', color: '#7B2FFF' },
                { label: 'Reports', path: '/dashboard/admin/reports', icon: '◍', color: '#00B4FF' },
              ].map(item => (
                <Link key={item.path} to={item.path}
                  className="bg-white rounded-2xl border border-[var(--border)] p-4 flex items-center gap-4 hover:border-[#00032B] hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-mono-label text-lg text-white group-hover:scale-110 transition-transform"
                    style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <span className="font-semibold text-sm text-[#00032B]">{item.label}</span>
                  <span className="ml-auto text-[var(--muted-foreground)] group-hover:text-[#FF0040] transition-colors">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {confirmId !== null && (
        <div className="fixed inset-0 bg-[#00032B]/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-7 max-w-sm w-full shadow-2xl border border-[var(--border)]">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 font-mono-label text-xl mb-5">◎</div>
            <h3 className="font-display text-xl font-black text-[#00032B] mb-2">Deactivate Account</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">This user won't be able to access BloodLink until reactivated by an admin.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmId(null)} className="flex-1 border-2 border-[var(--border)] py-3 rounded-xl text-sm font-semibold hover:bg-[var(--muted)] transition-colors">Cancel</button>
              <button onClick={() => deactivate(confirmId)} className="flex-1 bg-orange-500 text-white py-3 rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors">Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
