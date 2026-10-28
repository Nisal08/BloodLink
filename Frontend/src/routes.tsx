import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FindDonors from './pages/FindDonors';
import BloodRequests from './pages/BloodRequests';
import DonorDashboard from './pages/DonorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import RequesterDashboard from './pages/RequesterDashboard';
import {
  HowItWorks, About, ForgotPassword, NotFound,
  RequesterCreateRequest,
  Contact, Privacy, Terms, Help, DonorProfileView,
} from './pages/SimplePages';
import { AdminUsers, AdminDonors, AdminRequests, AdminOrganizations, AdminReports, AdminNotifications, AdminSettings } from './pages/AdminPages';
import { RequesterProfile, RequesterMyRequests, RequesterNotifications, RequesterSettings, RequesterFindDonors } from './pages/RequesterPages';
import DonorProfile from './pages/DonorProfile';
import { DonorAvailability, DonorRequests, DonorNotifications, DonorHistory, DonorSettings } from './pages/DonorPages';
import { HospitalProfile, HospitalCreateRequest, HospitalActiveRequests, HospitalHistory, HospitalNotifications, HospitalReports, HospitalSettings } from './pages/HospitalPages';
import ProtectedRoute from './components/ProtectedRoute';

export const router = createBrowserRouter([
  // Public routes
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
  { path: '/register', Component: Register },
  { path: '/find-donors', Component: FindDonors },
  { path: '/blood-requests', Component: BloodRequests },
  { path: '/how-it-works', Component: HowItWorks },
  { path: '/about', Component: About },
  { path: '/forgot-password', Component: ForgotPassword },
  { path: '/contact', Component: Contact },
  { path: '/privacy', Component: Privacy },
  { path: '/terms', Component: Terms },
  { path: '/help', Component: Help },
  { path: '/donors/:id', Component: DonorProfileView },

  // Protected routes — all dashboard pages
  {
    element: <ProtectedRoute />,
    children: [
      // Donor dashboard
      { path: '/dashboard/donor', Component: DonorDashboard },
      { path: '/dashboard/donor/profile', Component: DonorProfile },
      { path: '/dashboard/donor/availability', Component: DonorAvailability },
      { path: '/dashboard/donor/requests', Component: DonorRequests },
      { path: '/dashboard/donor/notifications', Component: DonorNotifications },
      { path: '/dashboard/donor/history', Component: DonorHistory },
      { path: '/dashboard/donor/settings', Component: DonorSettings },

      // Requester dashboard
      { path: '/dashboard/requester', Component: RequesterDashboard },
      { path: '/dashboard/requester/profile', Component: RequesterProfile },
      { path: '/dashboard/requester/create-request', Component: RequesterCreateRequest },
      { path: '/dashboard/requester/my-requests', Component: RequesterMyRequests },
      { path: '/dashboard/requester/notifications', Component: RequesterNotifications },
      { path: '/dashboard/requester/settings', Component: RequesterSettings },
      { path: '/dashboard/requester/find-donors', Component: RequesterFindDonors },

      // Hospital dashboard
      { path: '/dashboard/hospital', Component: HospitalDashboard },
      { path: '/dashboard/hospital/profile', Component: HospitalProfile },
      { path: '/dashboard/hospital/create-request', Component: HospitalCreateRequest },
      { path: '/dashboard/hospital/active-requests', Component: HospitalActiveRequests },
      { path: '/dashboard/hospital/history', Component: HospitalHistory },
      { path: '/dashboard/hospital/notifications', Component: HospitalNotifications },
      { path: '/dashboard/hospital/reports', Component: HospitalReports },
      { path: '/dashboard/hospital/settings', Component: HospitalSettings },

      // Admin dashboard
      { path: '/dashboard/admin', Component: AdminDashboard },
      { path: '/dashboard/admin/users', Component: AdminUsers },
      { path: '/dashboard/admin/users/:id', Component: AdminUsers },
      { path: '/dashboard/admin/donors', Component: AdminDonors },
      { path: '/dashboard/admin/requests', Component: AdminRequests },
      { path: '/dashboard/admin/organizations', Component: AdminOrganizations },
      { path: '/dashboard/admin/reports', Component: AdminReports },
      { path: '/dashboard/admin/notifications', Component: AdminNotifications },
      { path: '/dashboard/admin/settings', Component: AdminSettings },
    ],
  },

  { path: '*', Component: NotFound },
]);
