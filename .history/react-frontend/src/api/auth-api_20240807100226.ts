import axios from 'axios';
import { AuthData } from '../types/AuthData';

type AuthApi = {
    login: (userData: UserData) => Promise<any>;
    logout: () => Promise<any>;
  };

export const authApi = {
  login: async (userData) => {
    return await axios.post('http://example.com/login', userData);
  },
  logout: async () => {
    return await axios.post('http://example.com/logout');
  },
};