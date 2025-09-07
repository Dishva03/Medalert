import mongoose, { Document, Schema } from 'mongoose';

export interface IMedicationStatus extends Document {
  user: mongoose.Types.ObjectId;
  medication: mongoose.Types.ObjectId;
  date: Date;
  taken: boolean;
  takenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const medicationStatusSchema = new Schema<IMedicationStatus>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    medication: {
      type: Schema.Types.ObjectId,
      ref: 'Medication',
      required: [true, 'Medication ID is required'],
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      }
    },
    taken: {
      type: Boolean,
      default: false,
    },
    takenAt: {
      type: Date,
    },
  },
  { 
    timestamps: true
  }
);

// Compound index to ensure uniqueness
medicationStatusSchema.index({ user: 1, medication: 1, date: 1 }, { unique: true });

// Create and export MedicationStatus model
export default mongoose.model<IMedicationStatus>('MedicationStatus', medicationStatusSchema);
