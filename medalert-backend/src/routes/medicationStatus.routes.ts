import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth.middleware';
import MedicationStatus from '../models/medicationStatus.model';
import Medication from '../models/medication.model';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/medication-status/:date?
// @desc    Get medication status for a specific date (defaults to today)
// @access  Private
router.get('/:date?', async (req: Request, res: Response) => {
  try {
    const dateParam = req.params.date;
    const targetDate = dateParam ? new Date(dateParam) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    // Get all medications for the user
    const medications = await Medication.find({ user: req.user._id });
    
    // Get status for each medication for the target date
    const medicationStatuses = await Promise.all(
      medications.map(async (med) => {
        let status = await MedicationStatus.findOne({
          user: req.user._id,
          medication: med._id,
          date: targetDate
        });

        // If no status exists, create a default one
        if (!status) {
          status = new MedicationStatus({
            user: req.user._id,
            medication: med._id,
            date: targetDate,
            taken: false
          });
        }

        return {
          medication: {
            _id: med._id,
            name: med.name,
            dosage: med.dosage,
            time: med.time,
            frequency: med.frequency,
            notes: med.notes
          },
          status: {
            taken: status.taken,
            takenAt: status.takenAt
          }
        };
      })
    );

    res.json(medicationStatuses);
  } catch (error) {
    console.error('Get medication status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/medication-status/toggle
// @desc    Toggle medication taken status
// @access  Private
router.post('/toggle', async (req: Request, res: Response) => {
  try {
    const { medicationId, date } = req.body;
    
    if (!medicationId) {
      return res.status(400).json({ message: 'Medication ID is required' });
    }

    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    // Find existing status or create new one
    let status = await MedicationStatus.findOne({
      user: req.user._id,
      medication: medicationId,
      date: targetDate
    });

    if (status) {
      // Toggle existing status
      status.taken = !status.taken;
      status.takenAt = status.taken ? new Date() : undefined;
      await status.save();
    } else {
      // Create new status
      status = await MedicationStatus.create({
        user: req.user._id,
        medication: medicationId,
        date: targetDate,
        taken: true,
        takenAt: new Date()
      });
    }

    res.json({
      medicationId,
      taken: status.taken,
      takenAt: status.takenAt
    });
  } catch (error) {
    console.error('Toggle medication status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/medication-status/:medicationId
// @desc    Update medication status for a specific date
// @access  Private
router.put('/:medicationId', async (req: Request, res: Response) => {
  try {
    const { medicationId } = req.params;
    const { taken, date } = req.body;
    
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    // Find existing status or create new one
    let status = await MedicationStatus.findOne({
      user: req.user._id,
      medication: medicationId,
      date: targetDate
    });

    if (status) {
      status.taken = taken;
      status.takenAt = taken ? new Date() : undefined;
      await status.save();
    } else {
      status = await MedicationStatus.create({
        user: req.user._id,
        medication: medicationId,
        date: targetDate,
        taken,
        takenAt: taken ? new Date() : undefined
      });
    }

    res.json({
      medicationId,
      taken: status.taken,
      takenAt: status.takenAt
    });
  } catch (error) {
    console.error('Update medication status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
