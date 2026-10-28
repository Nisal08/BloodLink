import mongoose from 'mongoose';
import User from './User.js';

const adminSchema = new mongoose.Schema({
  department: {
    type: String,
    default: 'System Administration',
  },
});

const Admin = User.discriminator('Admin', adminSchema, 'admin');
export default Admin;