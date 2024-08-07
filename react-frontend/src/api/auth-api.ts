import axios from "axios";
import { AuthData } from "../types/AuthData";
import packageJson from "../../package.json";

type AuthApi = {
  login: (authData: AuthData) => Promise<any>;
  logout: () => Promise<any>;
};

export const authApi: AuthApi = {
  login: async (authData) => {
    return await axios.post( `${packageJson.baseUrl}/login`, authData);
  },
  logout: async () => {
    return await axios.post("http://example.com/logout");
  }
};
