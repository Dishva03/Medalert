import mongoose, { Document, Schema } from 'mongoose';

export interface IMedication extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const medicationSchema = new Schema<IMedication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Medication name is required'],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, 'Dosage information is required'],
      trim: true,
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      validate: {
        validator: function(v: string) {
          // Validate that time is in HH:MM format
          return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v);
        },
        message: 'Time must be in HH:MM format'
      }
    },
    frequency: {
      type: String,
      required: [true, 'Frequency is required'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Create and export Medication model
export default mongoose.model<IMedication>('Medication', medicationSchema);