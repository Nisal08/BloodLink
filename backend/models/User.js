import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ['donor', 'requester', 'hospital', 'admin'],
      required: [true, 'Role is required'],
    },
    phone: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    avatar: {
      type: String, // initials like "MR"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    // Notification preferences
    notificationPrefs: {
      email: {
        requestUpdates: { type: Boolean, default: true },
        donorAlerts: { type: Boolean, default: true },
        newsletter: { type: Boolean, default: false },
      },
      sms: {
        emergencyAlerts: { type: Boolean, default: true },
        donorRequests: { type: Boolean, default: true },
      },
      push: {
        allNotifications: { type: Boolean, default: true },
        emergencyOnly: { type: Boolean, default: false },
        platformUpdates: { type: Boolean, default: false },
      },
    },
    // Privacy settings
    privacy: {
      showProfilePublic: { type: Boolean, default: true },
      showDonationCount: { type: Boolean, default: true },
      allowRequesterContact: { type: Boolean, default: true },
      dataAnalytics: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
    discriminatorKey: 'role',
  }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate avatar from initials
userSchema.pre('save', function (next) {
  if (!this.avatar) {
    this.avatar = `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Get full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', userSchema);
export default User;