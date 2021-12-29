import axios, { AxiosInstance } from "axios";

import { IApiClient } from "./interfaces.api";
import apiConfig from "./config.api";

class ApiClient implements IApiClient {
  private readonly _http: AxiosInstance;
  get http() {
    return this._http;
  }

  constructor() {
    this._http = axios.create({
      baseURL: `${apiConfig.baseUrl}`,
    });

    // todo to extend http in FE level with this interceptor later on
    // this._http.interceptors.request.use((config) => {
    //   const rdx = store.getState() as AppState;
    //   const token = rdx.auth.token || undefined;

    //   if (token) {
    //     config.headers["Authorization"] = `Bearer ${token}`;
    //   }

    //   return config;
    // });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
