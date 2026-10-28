import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import User from '../models/User.js';

// Changes legacy discriminator values to the lowercase values used by the API.
// Default mode only reports counts. Pass --apply to perform the updates.
const roleMappings = [
  ['Donor', 'donor'],
  ['Requester', 'requester'],
  ['Hospital', 'hospital'],
  ['Admin', 'admin'],
];

const run = async () => {
  try {
    await connectDB();
    const collection = User.collection;
    let totalToChange = 0;

    console.log(`Checking collection: ${collection.name}`);
    for (const [oldRole, newRole] of roleMappings) {
      const count = await collection.countDocuments({ role: oldRole });
      totalToChange += count;
      console.log(`  ${oldRole} -> ${newRole}: ${count} record(s)`);
    }

    if (!process.argv.includes('--apply')) {
      console.log(`Dry run only. ${totalToChange} record(s) would be updated.`);
      console.log('If these counts look right, run: node migrations/normalizeUserRoles.js --apply');
      return;
    }

    for (const [oldRole, newRole] of roleMappings) {
      const result = await collection.updateMany(
        { role: oldRole },
        { $set: { role: newRole } }
      );
      console.log(`Updated ${result.modifiedCount} ${oldRole} record(s) to ${newRole}.`);
    }

    console.log('Role migration complete.');
  } catch (error) {
    console.error('Role migration failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
