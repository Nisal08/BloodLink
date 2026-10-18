import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor',
      required: true,
    },
    bloodRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodRequest',
    },
    // Requester or hospital who received
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    recipientRole: {
      type: String,
      enum: ['requester', 'hospital'],
    },
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    units: {
      type: Number,
      default: 1,
    },
    hospitalName: {
      type: String,
    },
    hospitalCity: {
      type: String,
    },
    patientName: {
      type: String,
      default: 'Anonymous',
    },
    // Status of the donation itself
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
    scheduledDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    // Certificate
    hasCertificate: {
      type: Boolean,
      default: false,
    },
    certificateUrl: {
      type: String,
    },
    // Notes
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

donationSchema.index({ donor: 1, createdAt: -1 });
donationSchema.index({ recipient: 1 });
donationSchema.index({ status: 1 });

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;