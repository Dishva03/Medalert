import api from './api';

export interface Reminder {
  _id?: string;
  medicationId: string;
  time: string;
  status: 'pending' | 'completed' | 'missed';
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const ReminderService = {
  /**
   * Get all reminders for the current user
   * @returns Promise with reminders array
   */
  getReminders: async (): Promise<Reminder[]> => {
    try {
      const response = await api.get('/reminders');
      return response.data;
    } catch (error) {
      console.error('Get reminders error:', error);
      throw error;
    }
  },

  /**
   * Get reminders for a specific medication
   * @param medicationId Medication ID
   * @returns Promise with reminders array
   */
  getRemindersByMedication: async (medicationId: string): Promise<Reminder[]> => {
    try {
      const response = await api.get(`/reminders/medication/${medicationId}`);
      return response.data;
    } catch (error) {
      console.error(`Get reminders for medication ${medicationId} error:`, error);
      throw error;
    }
  },

  /**
   * Create a new reminder
   * @param reminder Reminder data
   * @returns Promise with created reminder
   */
  createReminder: async (reminder: Reminder): Promise<Reminder> => {
    try {
      const response = await api.post('/reminders', reminder);
      return response.data;
    } catch (error) {
      console.error('Create reminder error:', error);
      throw error;
    }
  },

  /**
   * Update reminder status
   * @param id Reminder ID
   * @param status New status
   * @returns Promise with updated reminder
   */
  updateReminderStatus: async (
    id: string, 
    status: 'pending' | 'completed' | 'missed'
  ): Promise<Reminder> => {
    try {
      const response = await api.patch(`/reminders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Update reminder ${id} status error:`, error);
      throw error;
    }
  },

  /**
   * Delete a reminder
   * @param id Reminder ID
   * @returns Promise with deletion confirmation
   */
  deleteReminder: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete(`/reminders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Delete reminder ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Get today's reminders
   * @returns Promise with today's reminders
   */
  getTodayReminders: async (): Promise<Reminder[]> => {
    try {
      const response = await api.get('/reminders/today');
      return response.data;
    } catch (error) {
      console.error('Get today reminders error:', error);
      throw error;
    }
  },
};

export default ReminderService;