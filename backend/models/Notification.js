import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'request_received',
        'request_accepted',
        'request_rejected',
        'request_completed',
        'request_cancelled',
        'donor_found',
        'donor_confirmed',
        'emergency',
        'thank_you',
        'reminder',
        'achievement',
        'system',
        'shortage_alert',
        'report_ready',
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
    },
    // Related entities
    relatedRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BloodRequest',
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ recipient: 1, read: 1 });
notificationSchema.index({ recipient: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;