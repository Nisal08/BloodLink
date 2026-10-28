import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { BloodDropTile } from './BloodDropIcon';

interface SidebarItem { label: string; icon: string; path: string; }
interface Props { role: 'donor' | 'requester' | 'hospital' | 'admin'; userName?: string; activePath?: string; }

const donorItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '◈', path: '/dashboard/donor' },
  { label: 'My Profile', icon: '◉', path: '/dashboard/donor/profile' },
  { label: 'Availability', icon: '◷', path: '/dashboard/donor/availability' },
  { label: 'Blood Requests', icon: '◆', path: '/dashboard/donor/requests' },
  { label: 'Notifications', icon: '◎', path: '/dashboard/donor/notifications' },
  { label: 'Donation History', icon: '▤', path: '/dashboard/donor/history' },
  { label: 'Settings', icon: '◌', path: '/dashboard/donor/settings' },
];
const requesterItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '◈', path: '/dashboard/requester' },
  { label: 'My Profile', icon: '◉', path: '/dashboard/requester/profile' },
  { label: 'Create Request', icon: '◙', path: '/dashboard/requester/create-request' },
  { label: 'My Requests', icon: '◆', path: '/dashboard/requester/my-requests' },
  { label: 'Find Donors', icon: '◍', path: '/find-donors' },
  { label: 'Notifications', icon: '◎', path: '/dashboard/requester/notifications' },
  { label: 'Settings', icon: '◌', path: '/dashboard/requester/settings' },
];
const hospitalItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '◈', path: '/dashboard/hospital' },
  { label: 'Org Profile', icon: '◉', path: '/dashboard/hospital/profile' },
  { label: 'Create Request', icon: '◙', path: '/dashboard/hospital/create-request' },
  { label: 'Find Donors', icon: '◍', path: '/find-donors' },
  { label: 'Active Requests', icon: '◆', path: '/dashboard/hospital/active-requests' },
  { label: 'Request History', icon: '▤', path: '/dashboard/hospital/history' },
  { label: 'Notifications', icon: '◎', path: '/dashboard/hospital/notifications' },
  { label: 'Reports', icon: '◧', path: '/dashboard/hospital/reports' },
  { label: 'Settings', icon: '◌', path: '/dashboard/hospital/settings' },
];
const adminItems: SidebarItem[] = [
  { label: 'Dashboard', icon: '◈', path: '/dashboard/admin' },
  { label: 'Users', icon: '◉', path: '/dashboard/admin/users' },
  { label: 'Donors', icon: '◆', path: '/dashboard/admin/donors' },
  { label: 'Blood Requests', icon: '▤', path: '/dashboard/admin/requests' },
  { label: 'Organizations', icon: '◧', path: '/dashboard/admin/organizations' },
  { label: 'Reports', icon: '◍', path: '/dashboard/admin/reports' },
  { label: 'Notifications', icon: '◎', path: '/dashboard/admin/notifications' },
  { label: 'Settings', icon: '◌', path: '/dashboard/admin/settings' },
];

const itemMap = { donor: donorItems, requester: requesterItems, hospital: hospitalItems, admin: adminItems };
const roleLabels = { donor: 'Donor', requester: 'Requester', hospital: 'Hospital', admin: 'Admin' };

export default function DashboardSidebar({ role, userName = 'User', activePath }: Props) {
  const navigate = useNavigate();
  const items = itemMap[role];

  return (
    <div className="w-64 shrink-0 bg-[#00032B] min-h-screen flex flex-col border-r border-white/8">
      {/* Header */}
      <div className="p-5 border-b border-white/8">
        <Link to="/" className="flex items-center gap-2.5 mb-6">
          <BloodDropTile size={34} rounded="rounded-lg" className="glow-red-sm" />
          <span className="font-display text-lg font-bold text-white">Blood<span className="text-[#FF0040]">Link</span></span>
        </Link>

        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF0040] to-[#ff4d6d] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {userName[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            <span className="text-xs text-[#FF0040] font-mono-label font-medium">{roleLabels[role]}</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-xs font-mono-label text-white/25 uppercase tracking-widest px-3 py-2 mt-1">Navigation</p>
        {items.map(item => {
          const isActive = activePath === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#FF0040] text-white glow-red-sm'
                  : 'text-white/55 hover:text-white hover:bg-white/6'
              }`}>
              <span className={`font-mono-label text-base leading-none ${isActive ? 'text-white' : 'text-white/35'}`}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/8">
        <button onClick={() => navigate('/')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/6 transition-all w-full">
          <span className="font-mono-label text-base leading-none text-white/25">→</span>
          Logout
        </button>
      </div>
    </div>
  );
}
