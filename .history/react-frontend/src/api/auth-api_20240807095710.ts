import axios from 'axios';

export const authApi = {
  login: async (userData) => {
    return await axios.post('http://example.com/login', userData);
  },
  logout: async () => {
    return await axios.post('http://example.com/logout');
  },
};