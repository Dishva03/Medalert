import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

const AuthService = {
  /**
   * Login user
   * @param credentials User credentials
   * @returns Promise with user data and token
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      // Store token in localStorage
      localStorage.setItem('medalert-token', response.data.token);
      localStorage.setItem('medalert-user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Register new user
   * @param credentials User registration data
   * @returns Promise with user data and token
   */
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', credentials);
      // Store token in localStorage
      localStorage.setItem('medalert-token', response.data.token);
      localStorage.setItem('medalert-user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      // No need to call the backend since there's no logout endpoint
      // Just clear localStorage
      localStorage.removeItem('medalert-token');
      localStorage.removeItem('medalert-user');
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove items from localStorage even if there's an error
      localStorage.removeItem('medalert-token');
      localStorage.removeItem('medalert-user');
      throw error;
    }
  },

  /**
   * Get current user profile
   * @returns Promise with user data
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },
};

export default AuthService;