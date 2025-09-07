import api from './api';

export interface MedicationStatusResponse {
  medication: {
    _id: string;
    name: string;
    dosage: string;
    time: string;
    frequency: string;
    notes?: string;
  };
  status: {
    taken: boolean;
    takenAt?: string;
  };
}

export interface ToggleStatusRequest {
  medicationId: string;
  date?: string;
}

export interface ToggleStatusResponse {
  medicationId: string;
  taken: boolean;
  takenAt?: string;
}

const MedicationStatusService = {
  /**
   * Get medication status for a specific date (defaults to today)
   * @param date Optional date string (YYYY-MM-DD format)
   * @returns Promise with medication status array
   */
  getMedicationStatus: async (date?: string): Promise<MedicationStatusResponse[]> => {
    try {
      const url = date ? `/medication-status/${date}` : '/medication-status';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Get medication status error:', error);
      throw error;
    }
  },

  /**
   * Toggle medication taken status
   * @param request Toggle status request
   * @returns Promise with updated status
   */
  toggleMedicationStatus: async (request: ToggleStatusRequest): Promise<ToggleStatusResponse> => {
    try {
      const response = await api.post('/medication-status/toggle', request);
      return response.data;
    } catch (error) {
      console.error('Toggle medication status error:', error);
      throw error;
    }
  },

  /**
   * Update medication status for a specific date
   * @param medicationId Medication ID
   * @param taken Whether medication was taken
   * @param date Optional date string (YYYY-MM-DD format)
   * @returns Promise with updated status
   */
  updateMedicationStatus: async (
    medicationId: string, 
    taken: boolean, 
    date?: string
  ): Promise<ToggleStatusResponse> => {
    try {
      const response = await api.put(`/medication-status/${medicationId}`, {
        taken,
        date
      });
      return response.data;
    } catch (error) {
      console.error('Update medication status error:', error);
      throw error;
    }
  },
};

export default MedicationStatusService;
