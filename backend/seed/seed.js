import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';

// Import models
import Donor from '../models/Donor.js';
import Requester from '../models/Requester.js';
import Hospital from '../models/Hospital.js';
import Admin from '../models/Admin.js';
import BloodRequest from '../models/BloodRequest.js';
import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    const User = (await import('../models/User.js')).default;
    await Promise.all([
      User.deleteMany({}),
      BloodRequest.deleteMany({}),
      Donation.deleteMany({}),
      Notification.deleteMany({}),
    ]);

    console.log('🩸 Seeding BloodLink database...');

    // ─── Donors ──────────────────────────────────────────────────────────
    const donors = await Donor.create([
      {
        firstName: 'Marcus', lastName: 'Rivera', email: 'marcus.rivera@email.com',
        password: 'password123', phone: '+1 (212) 555-0127',
        city: 'New York', dateOfBirth: new Date('1988-06-08'),
        bloodType: 'O-', weight: 78, knownConditions: 'None',
        lastHealthCheck: 'Aug 2026', isAvailable: true,
        lastDonated: new Date('2026-08-20'), totalDonations: 14, livesSaved: 14,
        nextEligibleDate: new Date('2026-10-15'),
        emergencyContact: { name: 'Sofia Rivera', relation: 'Spouse', phone: '+1 (212) 555-0188' },
        isVerified: true, medicalVerified: true,
        achievements: [
          { name: 'First Drop', description: 'First donation', unlockedAt: new Date('2024-03-15') },
          { name: 'Life Saver', description: '5 donations', unlockedAt: new Date('2025-01-20') },
          { name: 'Hero', description: '10 donations', unlockedAt: new Date('2026-04-08') },
        ],
      },
      {
        firstName: 'Priya', lastName: 'Sharma', email: 'priya.sharma@email.com',
        password: 'password123', phone: '+1 (617) 555-0193',
        city: 'Boston', bloodType: 'AB+', weight: 62, isAvailable: true,
        totalDonations: 8, livesSaved: 8, isVerified: true, lastDonated: new Date('2026-08-15'),
        nextEligibleDate: new Date('2026-10-10'),
      },
      {
        firstName: 'James', lastName: 'Okafor', email: 'james.okafor@email.com',
        password: 'password123', phone: '+1 (312) 555-0145',
        city: 'Chicago', bloodType: 'B+', weight: 85, isAvailable: false,
        totalDonations: 22, livesSaved: 22, isVerified: true, lastDonated: new Date('2026-07-30'),
        nextEligibleDate: new Date('2026-09-25'),
      },
      {
        firstName: 'Elena', lastName: 'Vasquez', email: 'elena.vasquez@email.com',
        password: 'password123', phone: '+1 (212) 555-0184',
        city: 'New York', bloodType: 'A+', weight: 58, isAvailable: true,
        totalDonations: 5, livesSaved: 5, isVerified: true, lastDonated: new Date('2026-08-28'),
        nextEligibleDate: new Date('2026-10-23'),
      },
      {
        firstName: 'David', lastName: 'Kim', email: 'david.kim@email.com',
        password: 'password123', phone: '+1 (206) 555-0145',
        city: 'Seattle', bloodType: 'O+', weight: 75, isAvailable: true,
        totalDonations: 11, livesSaved: 11, isVerified: true, lastDonated: new Date('2026-09-05'),
        nextEligibleDate: new Date('2026-10-31'),
      },
      {
        firstName: 'Fatima', lastName: 'Al-Hassan', email: 'fatima.alhassan@email.com',
        password: 'password123', phone: '+1 (713) 555-0167',
        city: 'Houston', bloodType: 'A-', weight: 64, isAvailable: false,
        totalDonations: 17, livesSaved: 17, isVerified: true, lastDonated: new Date('2026-08-10'),
        nextEligibleDate: new Date('2026-10-05'),
      },
      {
        firstName: 'Luca', lastName: 'Bianchi', email: 'luca.bianchi@email.com',
        password: 'password123', phone: '+1 (310) 555-0189',
        city: 'Los Angeles', bloodType: 'B-', weight: 80, isAvailable: true,
        totalDonations: 3, livesSaved: 3, isVerified: true, lastDonated: new Date('2026-09-08'),
        nextEligibleDate: new Date('2026-11-03'),
      },
      {
        firstName: 'Ana', lastName: 'Pérez', email: 'ana.perez@email.com',
        password: 'password123', phone: '+1 (305) 555-0177',
        city: 'Miami', bloodType: 'AB-', weight: 56, isAvailable: true,
        totalDonations: 9, livesSaved: 9, isVerified: true, lastDonated: new Date('2026-08-22'),
        nextEligibleDate: new Date('2026-10-17'),
      },
      {
        firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki.tanaka@email.com',
        password: 'password123', phone: '+1 (212) 555-0199',
        city: 'New York', bloodType: 'A+', weight: 60, isAvailable: true,
        totalDonations: 6, livesSaved: 6, isVerified: true, lastDonated: new Date('2026-09-01'),
        nextEligibleDate: new Date('2026-10-27'),
      },
      {
        firstName: 'Carlos', lastName: 'Mendez', email: 'carlos.mendez@email.com',
        password: 'password123', phone: '+1 (214) 555-0155',
        city: 'Dallas', bloodType: 'O-', weight: 82, isAvailable: true,
        totalDonations: 19, livesSaved: 19, isVerified: true, lastDonated: new Date('2026-09-03'),
        nextEligibleDate: new Date('2026-10-29'),
      },
      {
        firstName: 'Kwame', lastName: 'Asante', email: 'kwame.asante@email.com',
        password: 'password123', phone: '+1 (404) 555-0133',
        city: 'Atlanta', bloodType: 'B+', weight: 77, isAvailable: true,
        totalDonations: 31, livesSaved: 31, isVerified: true, lastDonated: new Date('2026-08-28'),
        nextEligibleDate: new Date('2026-10-23'),
      },
      {
        firstName: 'Nadia', lastName: 'Kovač', email: 'nadia.kovac@email.com',
        password: 'password123', phone: '+1 (312) 555-0178',
        city: 'Chicago', bloodType: 'O+', weight: 65, isAvailable: true,
        totalDonations: 7, livesSaved: 7, isVerified: true, lastDonated: new Date('2026-09-10'),
        nextEligibleDate: new Date('2026-11-05'),
      },
    ]);

    console.log(`   ✅ ${donors.length} donors created`);

    // ─── Requesters ───────────────────────────────────────────────────────
    const requesters = await Requester.create([
      {
        firstName: 'Elena', lastName: 'Vasquez', email: 'elena.req@email.com',
        password: 'password123', phone: '+1 (212) 555-0184',
        city: 'New York', bloodType: 'A+',
        knownConditions: 'Type 2 Diabetes', allergies: 'Penicillin',
        currentMedication: 'Metformin 500mg',
        emergencyContact: { name: 'Carlos Vasquez', relation: 'Brother', phone: '+1 (212) 555-0199' },
        isVerified: true, totalRequests: 3, activeRequests: 1,
      },
      {
        firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@email.com',
        password: 'password123', phone: '+1 (617) 555-0144',
        city: 'Boston', bloodType: 'O-',
        isVerified: true, totalRequests: 1, activeRequests: 1,
      },
      {
        firstName: 'Michael', lastName: 'Chen', email: 'michael.chen@email.com',
        password: 'password123', phone: '+1 (312) 555-0155',
        city: 'Chicago', bloodType: 'B+',
        isVerified: true, totalRequests: 2, activeRequests: 0,
      },
    ]);

    console.log(`   ✅ ${requesters.length} requesters created`);

    // ─── Hospitals ────────────────────────────────────────────────────────
    const hospitals = await Hospital.create([
      {
        firstName: 'Admin', lastName: 'User', email: 'admin@citygeneralhospital.org',
        password: 'password123',
        phone: '+1 (212) 555-8000', city: 'New York',
        organizationName: 'City General Hospital',
        registrationNumber: 'HOS-2024-NY-00847',
        hospitalType: 'Public Teaching Hospital',
        establishedYear: 1962,
        emergencyHotline: '+1 (212) 555-9000',
        mainReception: '+1 (212) 555-8000',
        fax: '+1 (212) 555-8001',
        address: '215 E 68th St, New York, NY 10065',
        website: 'www.citygeneralhospital.org',
        bedCapacity: 850, activeStaff: 2400, annualPatients: 120000,
        traumaLevel: 'Level I Trauma Center',
        departments: ['Emergency Medicine', 'Cardiology', 'Oncology', 'Neurology',
          'Trauma Surgery', 'ICU / Critical Care', 'Pediatrics', 'Hematology'],
        bloodBank: {
          totalCapacity: 500, lowStockThreshold: 30, criticalThreshold: 15,
          inventory: [
            { bloodType: 'A+', units: 42, maxUnits: 60 }, { bloodType: 'A-', units: 18, maxUnits: 40 },
            { bloodType: 'B+', units: 35, maxUnits: 60 }, { bloodType: 'B-', units: 9, maxUnits: 30 },
            { bloodType: 'AB+', units: 22, maxUnits: 30 }, { bloodType: 'AB-', units: 7, maxUnits: 20 },
            { bloodType: 'O+', units: 55, maxUnits: 80 }, { bloodType: 'O-', units: 12, maxUnits: 50 },
          ],
          autoAlertTypes: ['O-', 'O+', 'B-'],
        },
        certifications: [
          { name: 'JCI Accreditation', year: '2023', isValid: true },
          { name: 'ISO 9001:2015', year: '2022', isValid: true },
          { name: 'AABB Certification', year: '2024', isValid: true },
          { name: 'CAP Accreditation', year: '2021', isValid: false },
        ],
        keyContacts: [
          { role: 'Hospital Director', name: 'Dr. Patricia Chen', extension: '8100' },
          { role: 'Blood Bank Director', name: 'Dr. Samuel Osei', extension: '8220' },
          { role: 'Emergency Lead', name: 'Dr. Raj Patel', extension: '9001' },
          { role: 'BloodLink Admin', name: 'Nurse Linda Torres', extension: '8005' },
        ],
        isVerified: true,
      },
    ]);

    console.log(`   ✅ ${hospitals.length} hospitals created`);

    // ─── Admin ────────────────────────────────────────────────────────────
    const admin = await Admin.create({
  firstName: 'System', lastName: 'Admin', email: 'admin@bloodlink.com',
  password: 'password123', isVerified: true,
});

    console.log(`   ✅ 1 admin created`);

    // ─── Blood Requests ───────────────────────────────────────────────────
    const requests = await BloodRequest.create([
      {
        createdBy: requesters[1]._id, creatorRole: 'requester',
        bloodType: 'O-', units: 3, urgency: 'Emergency', status: 'Pending',
        hospitalName: 'City General Hospital', hospitalCity: 'New York',
        patientInfo: { name: 'Sarah Johnson', description: 'Emergency Surgery' },
        note: 'Urgent need for emergency surgery patient',
      },
      {
        createdBy: requesters[2]._id, creatorRole: 'requester',
        bloodType: 'AB+', units: 2, urgency: 'High', status: 'Accepted',
        hospitalName: "St. Mary's Medical", hospitalCity: 'Boston',
        patientInfo: { description: 'Post-operative Recovery' },
        fulfilledBy: donors[1]._id,
        matchedDonors: [{ donor: donors[1]._id, status: 'accepted', respondedAt: new Date() }],
      },
      {
        createdBy: hospitals[0]._id, creatorRole: 'hospital',
        bloodType: 'B+', units: 4, urgency: 'Emergency', status: 'In Progress',
        hospitalName: 'City General Hospital', hospitalCity: 'New York',
        patientInfo: { name: 'Trauma Victim', description: 'Trauma Surgery', department: 'Emergency' },
        fulfilledBy: donors[2]._id,
        matchedDonors: [{ donor: donors[2]._id, status: 'accepted', respondedAt: new Date() }],
      },
      {
        createdBy: hospitals[0]._id, creatorRole: 'hospital',
        bloodType: 'A+', units: 1, urgency: 'Normal', status: 'Completed',
        hospitalName: 'City General Hospital', hospitalCity: 'New York',
        patientInfo: { description: 'Scheduled Surgery', department: 'Cardiology' },
        fulfilledBy: donors[3]._id,
        completedAt: new Date('2026-09-19'),
        matchedDonors: [{ donor: donors[3]._id, status: 'completed', respondedAt: new Date() }],
      },
      {
        createdBy: requesters[0]._id, creatorRole: 'requester',
        bloodType: 'O+', units: 2, urgency: 'Normal', status: 'Pending',
        hospitalName: 'University Hospital', hospitalCity: 'Seattle',
        patientInfo: { description: 'Anemia Treatment' },
      },
      {
        createdBy: hospitals[0]._id, creatorRole: 'hospital',
        bloodType: 'B-', units: 5, urgency: 'High', status: 'Rejected',
        hospitalName: 'Lakewood Medical', hospitalCity: 'Denver',
        patientInfo: { description: 'Accident Victim' },
      },
    ]);

    console.log(`   ✅ ${requests.length} blood requests created`);

    // ─── Donations ────────────────────────────────────────────────────────
    const donations = await Donation.create([
      {
        donor: donors[0]._id, bloodRequest: requests[0]._id,
        recipient: requesters[1]._id, recipientRole: 'requester',
        bloodType: 'O-', units: 1,
        hospitalName: 'City General Hospital', hospitalCity: 'New York',
        patientName: 'Sarah J.', status: 'Completed',
        completedDate: new Date('2026-08-20'), hasCertificate: true,
      },
      {
        donor: donors[0]._id,
        recipient: hospitals[0]._id, recipientRole: 'hospital',
        bloodType: 'O-', units: 1,
        hospitalName: "St. Mary's Medical", hospitalCity: 'Boston',
        status: 'Completed',
        completedDate: new Date('2026-06-14'), hasCertificate: true,
      },
      {
        donor: donors[0]._id,
        recipient: hospitals[0]._id, recipientRole: 'hospital',
        bloodType: 'O-', units: 1,
        hospitalName: 'Regional Medical Center', hospitalCity: 'Chicago',
        status: 'Completed',
        completedDate: new Date('2026-04-08'), hasCertificate: false,
      },
    ]);

    console.log(`   ✅ ${donations.length} donations created`);

    // ─── Notifications ────────────────────────────────────────────────────
    const notifications = await Notification.create([
      {
        recipient: donors[0]._id, type: 'request_received',
        title: 'Emergency Donation Request',
        body: 'Sarah Johnson needs O- blood urgently at City General Hospital.',
        link: '/dashboard/donor/requests', read: false,
      },
      {
        recipient: donors[0]._id, type: 'achievement',
        title: 'Milestone: 14 Donations!',
        body: "Congratulations Marcus! You've completed 14 donations and are officially a BloodLink Hero.",
        read: false,
      },
      {
        recipient: requesters[0]._id, type: 'emergency',
        title: 'Emergency Request Alert',
        body: 'Your emergency blood request at City General Hospital has been escalated.',
        link: '/dashboard/requester/my-requests', read: false,
      },
      {
        recipient: requesters[0]._id, type: 'donor_found',
        title: 'Donor Match Found',
        body: 'Marcus Rivera (O-) has been matched to your request at Regional Medical Center.',
        link: '/dashboard/requester/my-requests', read: false,
      },
      {
        recipient: hospitals[0]._id, type: 'emergency',
        title: 'Emergency Request Activated',
        body: 'REQ-2026-001 (O- · 3 units) is now EMERGENCY. Donor alert sent to 47 nearby O- donors.',
        link: '/dashboard/hospital/active-requests', read: false,
      },
      {
        recipient: hospitals[0]._id, type: 'shortage_alert',
        title: 'O- Blood Bank Low',
        body: 'Your O- stock is at 12 units (24% capacity). Consider posting an emergency request.',
        read: false,
      },
    ]);

    console.log(`   ✅ ${notifications.length} notifications created`);

    console.log('\n🎉 Seed complete! Database is ready.');
    console.log('\n📧 Login credentials (all passwords: password123):');
    console.log('   Donor:    marcus.rivera@email.com');
    console.log('   Requester: elena.req@email.com');
    console.log('   Hospital: admin@citygeneralhospital.org');
    console.log('   Admin:    admin@bloodlink.com');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seed();