import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/auth.middleware';
import Medication from '../models/medication.model';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @route   GET /api/meds
// @desc    Get all medications for logged in user
// @access  Private
router.get('/', async (req: Request, res: Response) => {
  try {
    const medications = await Medication.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    console.error('Get medications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/meds
// @desc    Create a new medication
// @access  Private
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Medication name is required'),
    body('dosage').notEmpty().withMessage('Dosage is required'),
    body('time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Time must be in HH:MM format'),
    body('frequency').notEmpty().withMessage('Frequency is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, dosage, time, frequency, notes } = req.body;

      // Create new medication
      const medication = await Medication.create({
        user: req.user._id,
        name,
        dosage,
        time,
        frequency,
        notes,
      });

      res.status(201).json(medication);
    } catch (error) {
      console.error('Create medication error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET /api/meds/:id
// @desc    Get a medication by ID
// @access  Private
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    // Check if medication belongs to user
    if (medication.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to access this medication' });
    }

    res.json(medication);
  } catch (error) {
    console.error('Get medication error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/meds/:id
// @desc    Update a medication
// @access  Private
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, dosage, time, frequency, notes } = req.body;

    // Find medication by ID
    let medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    // Check if medication belongs to user
    if (medication.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this medication' });
    }

    // Validate time format if provided
    if (time && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      return res.status(400).json({ message: 'Time must be in HH:MM format' });
    }

    // Update medication
    medication = await Medication.findByIdAndUpdate(
      req.params.id,
      { name, dosage, time, frequency, notes },
      { new: true, runValidators: true }
    );

    res.json(medication);
  } catch (error) {
    console.error('Update medication error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/meds/:id
// @desc    Delete a medication
// @access  Private
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    // Check if medication belongs to user
    if (medication.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this medication' });
    }

    await Medication.findByIdAndDelete(req.params.id);

    res.json({ message: 'Medication removed' });
  } catch (error) {
    console.error('Delete medication error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;