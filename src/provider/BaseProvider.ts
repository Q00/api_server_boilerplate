import { apiClient } from '../utils/apiClient';
import { AxiosInstance } from 'axios';

export abstract class BaseProvider {
  protected accessToken: string;
  protected instance: AxiosInstance | null;
  constructor() {
    this.accessToken = '';
    this.instance = null;
  }

  setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setInstance(url: string, headers: object) {
    this.instance = apiClient(url, headers);
    this.instance.interceptors.response.use(
      (response) => response,
      (err) => Promise.reject(err),
    );
  }

  getInstance() {
    return this.instance;
  }
}
