import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth.middleware';
import Medication from '../models/medication.model';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Helper function to get the next occurrence of a time
const getNextOccurrence = (timeStr: string): Date => {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  const nextOccurrence = new Date(now);
  nextOccurrence.setHours(hours, minutes, 0, 0);
  
  // If the time has already passed today, set it for tomorrow
  if (nextOccurrence <= now) {
    nextOccurrence.setDate(nextOccurrence.getDate() + 1);
  }
  
  return nextOccurrence;
};

// @route   GET /api/reminders/upcoming
// @desc    Get upcoming medication reminders for the next 24 hours
// @access  Private
router.get('/upcoming', async (req: Request, res: Response) => {
  try {
    // Get all medications for the user
    const medications = await Medication.find({ user: req.user._id });
    
    // Current time
    const now = new Date();
    
    // 24 hours from now
    const tomorrow = new Date(now);
    tomorrow.setHours(tomorrow.getHours() + 24);
    
    // Generate upcoming reminders
    const upcomingReminders = [];
    
    for (const medication of medications) {
      for (const timeStr of medication.schedule) {
        const nextOccurrence = getNextOccurrence(timeStr);
        
        // Only include reminders in the next 24 hours
        if (nextOccurrence <= tomorrow) {
          upcomingReminders.push({
            medicationId: medication._id,
            medicationName: medication.name,
            dose: medication.dose,
            time: timeStr,
            nextOccurrence,
          });
        }
      }
    }
    
    // Sort reminders by time
    upcomingReminders.sort((a, b) => a.nextOccurrence.getTime() - b.nextOccurrence.getTime());
    
    res.json(upcomingReminders);
  } catch (error) {
    console.error('Get upcoming reminders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reminders/today
// @desc    Get today's medication reminders
// @access  Private
router.get('/today', async (req: Request, res: Response) => {
  try {
    // Get all medications for the user
    const medications = await Medication.find({ user: req.user._id });
    
    // Current date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Tomorrow date (without time)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Generate today's reminders
    const todayReminders = [];
    
    for (const medication of medications) {
      for (const timeStr of medication.schedule) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        
        const reminderTime = new Date(today);
        reminderTime.setHours(hours, minutes, 0, 0);
        
        todayReminders.push({
          medicationId: medication._id,
          medicationName: medication.name,
          dose: medication.dose,
          time: timeStr,
          reminderTime,
          isPast: reminderTime < new Date(),
        });
      }
    }
    
    // Sort reminders by time
    todayReminders.sort((a, b) => a.reminderTime.getTime() - b.reminderTime.getTime());
    
    res.json(todayReminders);
  } catch (error) {
    console.error('Get today\'s reminders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;