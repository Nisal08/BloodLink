import mongoose from 'mongoose';
import User from './User.js';

const donorSchema = new mongoose.Schema({
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood type is required for donors'],
  },
  weight: {
    type: Number, // in kg
    min: 45,
  },
  knownConditions: {
    type: String,
    default: 'None',
  },
  lastHealthCheck: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  lastDonated: {
    type: Date,
  },
  nextEligibleDate: {
    type: Date,
  },
  totalDonations: {
    type: Number,
    default: 0,
  },
  livesSaved: {
    type: Number,
    default: 0,
  },
  cooldownDays: {
    type: Number,
    default: 56, // 56-day cooldown between donations
  },
  // Emergency contact
  emergencyContact: {
    name: { type: String, default: '' },
    relation: { type: String, default: '' },
    phone: { type: String, default: '' },
  },
  // Donor stats
  responseRate: {
    type: Number,
    default: 100,
  },
  rating: {
    type: Number,
    default: 5.0,
    min: 0,
    max: 5,
  },
  // Achievements / badges
  achievements: [
    {
      name: String,
      description: String,
      unlockedAt: Date,
    },
  ],
  // Verification status
  medicalVerified: {
    type: Boolean,
    default: false,
  },
});

// Calculate next eligible date
donorSchema.methods.calculateNextEligible = function () {
  if (this.lastDonated) {
    const next = new Date(this.lastDonated);
    next.setDate(next.getDate() + this.cooldownDays);
    this.nextEligibleDate = next;
  }
  return this.nextEligibleDate;
};

// Check if donor is currently eligible
donorSchema.methods.isEligible = function () {
  if (!this.lastDonated) return true;
  return new Date() >= this.nextEligibleDate;
};

const Donor = User.discriminator('Donor', donorSchema);
export default Donor;