// apiCall.tsx
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

const apiCall = (config: AxiosRequestConfig) => {
  return new Promise<ApiResponse<any>>(async (resolve, reject) => {
    try {
      const response: AxiosResponse<any> = await axios(config);
      resolve({
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default apiCall;