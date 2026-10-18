import mongoose from 'mongoose';
import User from './User.js';

const requesterSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  knownConditions: {
    type: String,
    default: 'None',
  },
  allergies: {
    type: String,
    default: '',
  },
  currentMedication: {
    type: String,
    default: '',
  },
  // Emergency contact
  emergencyContact: {
    name: { type: String, default: '' },
    relation: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
  totalRequests: {
    type: Number,
    default: 0,
  },
  activeRequests: {
    type: Number,
    default: 0,
  },
  preferredLanguage: {
    type: String,
    default: 'English (US)',
  },
});

const Requester = User.discriminator('Requester', requesterSchema);
export default Requester;