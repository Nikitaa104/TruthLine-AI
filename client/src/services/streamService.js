
import API from '../api/axios';

export const streamService = {
  getLiveFeed: async (params) => {
    const response = await API.get('/stream/live', { params });
    return response.data;
  },

  getAlertById: async (id) => {
    const response = await API.get(`/stream/alerts/${id}`);
    return response.data;
  }
};