"use client"
import { AxiosInstance } from "axios";
import {useSession} from "next-auth/react";
import {IUserSession} from "@/common/interfaces/users.interfaces.ts";


const useInterceptors = (apiInstance: AxiosInstance) => {
  const { accessToken} = useSession() as unknown as IUserSession;

  if (accessToken) {
    apiInstance.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          config.headers.credenentials = true;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  // if (refreshToken) {
  //   apiInstance.interceptors.response.use(
  //     response => response,
  //     async error => {
  //       const originalRequest = error.config;
  //
  //       if (error.response.status === 401 && !originalRequest._retry) {
  //         originalRequest._retry = true;
  //         try {
  //           const body = {
  //             refreshToken,
  //             expiresInMins: 30,
  //           };
  //           const response = await apiInstance.post(baseUrl + "/auth/refresh", body);
  //
  //           originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //           return apiInstance(originalRequest);
  //         } catch (refreshError) {
  //           console.error("Token refresh error:", refreshError);
  //           return Promise.reject(refreshError);
  //         }
  //       }
  //       console.error("Request error:", error);
  //       return Promise.reject(error);
  //     },
  //   );
  // }

  return [apiInstance];
};

export default useInterceptors;
