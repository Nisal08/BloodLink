# BloodLink Backend API

A fully functional MERN stack backend for **BloodLink** — a real-time blood donation network connecting donors, patients, and hospitals.

## 🩸 Overview

This backend powers a complete blood donation management platform with:

- **4 User Roles**: Donor, Requester, Hospital, Admin
- **JWT Authentication** with role-based access control
- **Blood Request Management** with full lifecycle (Pending → Accepted → In Progress → Completed)
- **Donor Matching** based on blood type compatibility
- **Real-time Notifications** for all user types
- **Donation History & Achievements** tracking
- **Hospital Blood Bank** inventory management
- **Admin Dashboard** with user management and reports

## 📋 Prerequisites

- **Node.js** ≥ 18.x
- **MongoDB** ≥ 6.x (local or Atlas)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Edit `.env` with your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/bloodlink
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 3. Seed the Database (Optional)

```bash
npm run seed
```

This creates sample data including:

| Role      | Email                            | Password      |
|-----------|----------------------------------|---------------|
| Donor     | marcus.rivera@email.com          | password123   |
| Requester | elena.req@email.com              | password123   |
| Hospital  | admin@citygeneralhospital.org    | password123   |
| Admin     | admin@bloodlink.com              | password123   |

### 4. Start the Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check

```
GET /api/health
```

---

### 🔐 Authentication

| Method | Endpoint             | Access  | Description            |
|--------|----------------------|---------|------------------------|
| POST   | `/api/auth/register` | Public  | Register new user      |
| POST   | `/api/auth/login`    | Public  | Login                  |
| GET    | `/api/auth/me`       | Private | Get current user       |
| POST   | `/api/auth/logout`   | Private | Logout                 |

**Register Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor",
  "bloodType": "O-",
  "city": "New York"
}
```

**Login Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "donor"
}
```

---

### 👤 User Profile & Settings

| Method | Endpoint                              | Access          | Description                 |
|--------|---------------------------------------|-----------------|-----------------------------|
| GET    | `/api/users/profile`                  | Private         | Get full profile            |
| PUT    | `/api/users/profile`                  | Private         | Update profile              |
| PUT    | `/api/users/change-password`          | Private         | Change password             |
| PUT    | `/api/users/notification-preferences` | Private         | Update notif prefs          |
| PUT    | `/api/users/privacy-settings`         | Private         | Update privacy settings     |
| PUT    | `/api/users/deactivate`               | Private         | Deactivate account          |
| DELETE | `/api/users/account`                  | Private         | Delete account permanently  |

---

### 🩸 Donors

| Method | Endpoint                                  | Access  | Description                      |
|--------|-------------------------------------------|---------|----------------------------------|
| GET    | `/api/donors`                             | Public  | Search/list donors               |
| GET    | `/api/donors/blood-demand`                | Public  | Get blood demand data            |
| GET    | `/api/donors/compatibility/:bloodType`    | Public  | Get compatibility info           |
| GET    | `/api/donors/:id`                         | Public  | Get donor profile by ID          |
| PUT    | `/api/donors/availability`                | Donor   | Toggle availability              |
| GET    | `/api/donors/stats/dashboard`             | Donor   | Get dashboard stats              |
| GET    | `/api/donors/history/me`                  | Donor   | Get donation history             |

**Query params for donor search:**
- `bloodType` — Filter by blood type
- `city` — Filter by city
- `search` — Search by name
- `available` — Filter available only (`true`)
- `page`, `limit` — Pagination

---

### 📋 Blood Requests

| Method | Endpoint                          | Access         | Description               |
|--------|-----------------------------------|----------------|---------------------------|
| GET    | `/api/requests`                   | Public         | Get all requests (board)  |
| GET    | `/api/requests/:id`               | Public         | Get single request        |
| POST   | `/api/requests`                   | Req/Hosp       | Create blood request      |
| GET    | `/api/requests/user/my`           | Private        | Get my requests           |
| GET    | `/api/requests/donor/matching`    | Donor          | Get matching requests     |
| PUT    | `/api/requests/:id/status`        | Private        | Update request status     |
| PUT    | `/api/requests/:id/cancel`        | Private        | Cancel request            |
| POST   | `/api/requests/:id/accept`        | Donor          | Accept request            |
| POST   | `/api/requests/:id/reject`        | Donor          | Reject request            |

**Create Request Body:**
```json
{
  "bloodType": "O-",
  "units": 3,
  "urgency": "Emergency",
  "hospitalName": "City General Hospital",
  "hospitalCity": "New York",
  "patientInfo": {
    "name": "Patient A",
    "description": "Emergency Surgery",
    "department": "Emergency"
  },
  "clinicalNotes": "Urgent surgery case",
  "isEmergency": true
}
```

**Status Flow:**
```
Pending → Accepted → In Progress → Completed
Pending → Rejected
Pending/Accepted → Cancelled
```

---

### 🔔 Notifications

| Method | Endpoint                      | Access  | Description               |
|--------|-------------------------------|---------|---------------------------|
| GET    | `/api/notifications`          | Private | Get notifications         |
| GET    | `/api/notifications/unread-count` | Private | Get unread count      |
| PUT    | `/api/notifications/read-all` | Private | Mark all as read          |
| PUT    | `/api/notifications/:id/read` | Private | Mark single as read       |

**Query params:**
- `filter` — `all` or `unread`
- `page`, `limit` — Pagination

---

### 🏥 Hospital

| Method | Endpoint                               | Access   | Description                 |
|--------|----------------------------------------|----------|-----------------------------|
| GET    | `/api/hospitals/stats/dashboard`       | Hospital | Get dashboard stats         |
| GET    | `/api/hospitals/active-requests`       | Hospital | Get active requests         |
| GET    | `/api/hospitals/history`               | Hospital | Get request history         |
| POST   | `/api/hospitals/reports/generate`      | Hospital | Generate report             |
| PUT    | `/api/hospitals/blood-bank`            | Hospital | Update blood bank inventory |

---

### 🛡️ Admin

| Method | Endpoint                              | Access | Description             |
|--------|---------------------------------------|--------|-------------------------|
| GET    | `/api/admin/stats`                    | Admin  | Dashboard stats         |
| GET    | `/api/admin/users`                    | Admin  | List all users          |
| GET    | `/api/admin/users/:id`                | Admin  | Get user details        |
| PUT    | `/api/admin/users/:id/status`         | Admin  | Update user status      |
| DELETE | `/api/admin/users/:id`                | Admin  | Delete user             |
| GET    | `/api/admin/donors`                   | Admin  | List all donors         |
| GET    | `/api/admin/requests`                 | Admin  | List all requests       |
| GET    | `/api/admin/organizations`            | Admin  | List hospitals/orgs     |
| GET    | `/api/admin/reports`                  | Admin  | Get report data         |
| POST   | `/api/admin/notifications`            | Admin  | Send notifications      |

---

## 🩸 Blood Type Compatibility

| Blood Type | Can Donate To                              | Can Receive From               |
|------------|--------------------------------------------|--------------------------------|
| O-         | All types (universal donor)                | O-                             |
| O+         | O+, A+, B+, AB+                            | O+, O-                         |
| A-         | A+, A-, AB+, AB-                           | A-, O-                         |
| A+         | A+, AB+                                    | A+, A-, O+, O-                 |
| B-         | B+, B-, AB+, AB-                           | B-, O-                         |
| B+         | B+, AB+                                    | B+, B-, O+, O-                 |
| AB-        | AB+, AB-                                   | A-, B-, O-, AB-                |
| AB+        | AB+ only (universal recipient)             | All types                      |

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                    # MongoDB connection
├── controllers/
│   ├── adminController.js       # Admin operations
│   ├── authController.js        # Auth (register, login)
│   ├── bloodRequestController.js# Blood request CRUD & matching
│   ├── donorController.js       # Donor-specific operations
│   ├── hospitalController.js    # Hospital operations
│   ├── notificationController.js# Notification management
│   └── userController.js        # Profile & settings
├── middleware/
│   ├── auth.js                  # JWT auth & role authorization
│   ├── error.js                 # Global error handler
│   └── validate.js              # Request validation
├── models/
│   ├── BloodRequest.js          # Blood request schema
│   ├── Donation.js              # Donation record schema
│   ├── Donor.js                 # Donor profile schema
│   ├── Hospital.js              # Hospital profile schema
│   ├── Notification.js          # Notification schema
│   ├── Requester.js             # Requester profile schema
│   └── User.js                  # Base user schema
├── routes/
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── donorRoutes.js
│   ├── hospitalRoutes.js
│   ├── notificationRoutes.js
│   ├── requestRoutes.js
│   └── userRoutes.js
├── seed/
│   └── seed.js                  # Database seeder
├── utils/
│   ├── bloodCompatibility.js    # Blood type matching logic
│   └── helpers.js               # Utility functions
├── .env                         # Environment variables
├── package.json
└── server.js                    # Entry point
```

---

## 🔒 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

Tokens are obtained via `/api/auth/register` or `/api/auth/login` and expire after 30 days.

---

## ⚡ Key Features

- **Auto-notifications**: Emergency requests automatically alert compatible donors
- **Blood compatibility**: Full donor-recipient matching with medical accuracy
- **Donor cooldown**: 56-day cooldown enforced between donations
- **Achievement system**: Donor badges (First Drop, Life Saver, Hero, Legend, Champion)
- **Blood bank management**: Hospitals can track inventory by blood type
- **Report generation**: Hospitals can generate detailed activity reports
- **Privacy controls**: Users control profile visibility and data sharing