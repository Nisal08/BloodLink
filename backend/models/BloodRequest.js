import mongoose from 'mongoose';

const bloodRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
    },
    // Who created the request
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    creatorRole: {
      type: String,
      enum: ['requester', 'hospital'],
      required: true,
    },
    // Blood type needed
    bloodType: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Blood type is required'],
    },
    // Units needed
    units: {
      type: Number,
      required: [true, 'Number of units is required'],
      min: 1,
      max: 20,
    },
    // Urgency level
    urgency: {
      type: String,
      enum: ['Normal', 'High', 'Emergency'],
      default: 'Normal',
    },
    // Status
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
    // Patient / case info
    patientInfo: {
      name: String,
      description: String,
      department: String,
      ward: String,
    },
    // Hospital details (even for requester-created requests)
    hospitalName: {
      type: String,
      required: [true, 'Hospital name is required'],
    },
    hospitalCity: {
      type: String,
    },
    // Contact for this request
    contact: {
      name: String,
      phone: String,
      email: String,
      ward: String,
    },
    // Clinical notes
    clinicalNotes: {
      type: String,
    },
    // Required by date
    requiredBy: {
      type: Date,
    },
    // Donors who have been matched / responded
    matchedDonors: [{
      donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donor',
      },
      status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending',
      },
      matchedAt: {
        type: Date,
        default: Date.now,
      },
      respondedAt: Date,
    }],
    // Request notes from requester
    note: {
      type: String,
    },
    // Which donor fulfilled this
    fulfilledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donor',
    },
    completedAt: {
      type: Date,
    },
    color: {
      type: String,
      default: '#FF0040',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate requestId
bloodRequestSchema.pre('save', async function (next) {
  if (!this.requestId) {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 9000) + 1000;
    const ts = Date.now().toString(36).slice(-4).toUpperCase();
    this.requestId = `REQ-${year}-${ts}${random}`;
  }
  next();
});

// Set color based on urgency
bloodRequestSchema.pre('save', function (next) {
  const colorMap = {
    Emergency: '#FF0040',
    High: '#7B2FFF',
    Normal: '#00B4FF',
  };
  this.color = colorMap[this.urgency] || '#00B4FF';
  next();
});

// Index for efficient queries
bloodRequestSchema.index({ status: 1, urgency: 1 });
bloodRequestSchema.index({ bloodType: 1, status: 1 });
bloodRequestSchema.index({ createdBy: 1 });
bloodRequestSchema.index({ hospitalCity: 1 });

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);
export default BloodRequest;