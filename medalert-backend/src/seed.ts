import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './db';
import User from './models/user.model';
import Medication from './models/medication.model';

// Load environment variables
dotenv.config();

// Sample data
const users = [
  {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  },
];

const medications = [
  {
    name: 'Aspirin',
    dose: '100mg',
    schedule: ['08:00', '20:00'],
    notes: 'Take with food',
  },
  {
    name: 'Vitamin D',
    dose: '1000 IU',
    schedule: ['09:00'],
    notes: 'Take with breakfast',
  },
  {
    name: 'Ibuprofen',
    dose: '200mg',
    schedule: ['08:00', '14:00', '20:00'],
    notes: 'For headache',
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Medication.deleteMany({});

    console.log('Existing data cleared');

    // Create users
    const createdUsers = await User.create(users);
    console.log(`${createdUsers.length} users created`);

    // Create medications for the first user
    const userId = createdUsers[0]._id;

    const medicationsWithUser = medications.map(med => ({
      ...med,
      user: userId,
    }));

    const createdMedications = await Medication.create(medicationsWithUser);
    console.log(`${createdMedications.length} medications created for user ${userId}`);

    console.log('Database seeded successfully!');
    console.log('\nTest User Credentials:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

    // Disconnect from database
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await disconnectDB();
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();