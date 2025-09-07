import api from './api';

export interface Medication {
  _id?: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notes?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const MedicationService = {
  /**
   * Get all medications for the current user
   * @returns Promise with medications array
   */
  getMedications: async (): Promise<Medication[]> => {
    try {
      const response = await api.get('/meds');
      return response.data;
    } catch (error) {
      console.error('Get medications error:', error);
      throw error;
    }
  },

  /**
   * Get a specific medication by ID
   * @param id Medication ID
   * @returns Promise with medication data
   */
  getMedicationById: async (id: string): Promise<Medication> => {
    try {
      const response = await api.get(`/meds/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Get medication ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Create a new medication
   * @param medication Medication data
   * @returns Promise with created medication
   */
  createMedication: async (medication: Medication): Promise<Medication> => {
    try {
      const response = await api.post('/meds', medication);
      return response.data;
    } catch (error) {
      console.error('Create medication error:', error);
      throw error;
    }
  },

  /**
   * Update an existing medication
   * @param id Medication ID
   * @param medication Updated medication data
   * @returns Promise with updated medication
   */
  updateMedication: async (id: string, medication: Medication): Promise<Medication> => {
    try {
      const response = await api.put(`/meds/${id}`, medication);
      return response.data;
    } catch (error) {
      console.error(`Update medication ${id} error:`, error);
      throw error;
    }
  },

  /**
   * Delete a medication
   * @param id Medication ID
   * @returns Promise with deletion confirmation
   */
  deleteMedication: async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.delete(`/meds/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Delete medication ${id} error:`, error);
      throw error;
    }
  },
};

export default MedicationService;