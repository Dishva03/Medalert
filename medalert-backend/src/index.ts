import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './db';
import authRoutes from './routes/auth.routes';
import medicationRoutes from './routes/medication.routes';
import reminderRoutes from './routes/reminder.routes';
import medicationStatusRoutes from './routes/medicationStatus.routes';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Set port
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://192.168.56.1:8080' // Added your frontend IP
  ],
  credentials: true
})); // CORS configuration
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/meds', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/medication-status', medicationStatusRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

export default app;