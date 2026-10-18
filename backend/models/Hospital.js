import mongoose from 'mongoose';
import User from './User.js';

const hospitalSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true,
  },
  registrationNumber: {
    type: String,
    trim: true,
  },
  hospitalType: {
    type: String,
    enum: ['Public Teaching Hospital', 'Private Hospital', 'Community Hospital', 'Specialty Center'],
    default: 'Public Teaching Hospital',
  },
  establishedYear: {
    type: Number,
  },
  emergencyHotline: {
    type: String,
  },
  mainReception: {
    type: String,
  },
  fax: {
    type: String,
  },
  address: {
    type: String,
  },
  website: {
    type: String,
  },
  bedCapacity: {
    type: Number,
  },
  activeStaff: {
    type: Number,
  },
  annualPatients: {
    type: Number,
  },
  traumaLevel: {
    type: String,
    enum: ['Level I Trauma Center', 'Level II Trauma Center', 'Level III Trauma Center', 'Non-Trauma'],
    default: 'Level I Trauma Center',
  },
  departments: [{
    type: String,
  }],
  // Blood bank inventory
  bloodBank: {
    totalCapacity: { type: Number, default: 500 },
    lowStockThreshold: { type: Number, default: 30 }, // percent
    criticalThreshold: { type: Number, default: 15 }, // percent
    inventory: [{
      bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      },
      units: { type: Number, default: 0 },
      maxUnits: { type: Number, default: 60 },
    }],
    autoAlertTypes: [String],
  },
  // Certifications
  certifications: [{
    name: String,
    year: String,
    isValid: Boolean,
  }],
  // Key contacts
  keyContacts: [{
    role: String,
    name: String,
    extension: String,
  }],
  // Stats
  activeRequests: {
    type: Number,
    default: 0,
  },
  donorsContacted: {
    type: Number,
    default: 0,
  },
  fulfilledThisMonth: {
    type: Number,
    default: 0,
  },
  emergencyAlerts: {
    type: Number,
    default: 0,
  },
});

const Hospital = User.discriminator('Hospital', hospitalSchema);
export default Hospital;