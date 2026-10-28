import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('bloodlink_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data: Record<string, string>) => API.post('/auth/register', data);
export const loginUser = (data: { email: string; password: string; role: string }) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Donors
export const getDonors = (params?: Record<string, string>) => API.get('/donors', { params });
export const getDonorById = (id: string) => API.get(`/donors/${id}`);
export const getBloodDemand = () => API.get('/donors/blood-demand');
export const toggleAvailability = () => API.put('/donors/availability');
export const getDonorStats = () => API.get('/donors/stats/dashboard');
export const getDonorHistory = (params?: Record<string, string>) => API.get('/donors/history/me', { params });

// Blood Requests
export const getRequests = (params?: Record<string, string>) => API.get('/requests', { params });
export const getRequest = (id: string) => API.get(`/requests/${id}`);
export const createRequest = (data: Record<string, string>) => API.post('/requests', data);
export const getMyRequests = (params?: Record<string, string>) => API.get('/requests/user/my', { params });
export const getMatchingRequests = (params?: Record<string, string>) => API.get('/requests/donor/matching', { params });
export const updateRequestStatus = (id: string, data: Record<string, string>) => API.put(`/requests/${id}/status`, data);
export const acceptRequest = (id: string) => API.post(`/requests/${id}/accept`);
export const rejectRequest = (id: string) => API.post(`/requests/${id}/reject`);
export const cancelRequest = (id: string) => API.put(`/requests/${id}/cancel`);

// Users
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (data: Record<string, string>) => API.put('/users/profile', data);
export const changePassword = (data: Record<string, string>) => API.put('/users/change-password', data);

// Notifications
export const getNotifications = (params?: Record<string, string>) => API.get('/notifications', { params });
export const getUnreadCount = () => API.get('/notifications/unread-count');
export const markAsRead = (id: string) => API.put(`/notifications/${id}/read`);
export const markAllAsRead = () => API.put('/notifications/read-all');

// Hospital
export const getHospitalStats = () => API.get('/hospitals/stats/dashboard');
export const getActiveRequests = (params?: Record<string, string>) => API.get('/hospitals/active-requests', { params });
export const getHistory = (params?: Record<string, string>) => API.get('/hospitals/history', { params });
export const generateReport = (data: Record<string, string>) => API.post('/hospitals/reports/generate', data);

// Admin
export const getAdminStats = () => API.get('/admin/stats');
export const getAllUsers = (params?: Record<string, string>) => API.get('/admin/users', { params });

export default API;