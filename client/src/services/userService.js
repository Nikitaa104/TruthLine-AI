
import API from '../api/axios';

export const userService = {
  updateLocation: async (locationData) => {
    const response = await API.put('/user/location', locationData);
    return response.data;
  },

  updatePreferences: async (preferences) => {
    const response = await API.put('/user/preferences', preferences);
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get('/user/profile');
    return response.data;
  }
};