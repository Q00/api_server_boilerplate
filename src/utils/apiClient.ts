import axios from 'axios';
export const apiClient = (url: string, headers?: object) => {
  return axios.create({
    baseURL: url,
    headers: headers || {},
  });
};
