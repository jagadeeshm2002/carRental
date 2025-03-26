// client.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// export const BASE_URL = "http://localhost:3000/api/v1";
export const BASE_URL = "https://carrental-vwdj.onrender.com/api/v1";

// Create axios client
export const Client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Token management without hooks
let currentToken: string | null = null;

export const updateToken = (token: string | null) => {
  currentToken = token;
  if (token) {
    localStorage.setItem("jwt_token", token);
    Client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Client.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  } else {
    localStorage.removeItem("jwt_token");
    delete Client.defaults.headers.common["Authorization"];
  }
};

// Set up request interceptor
Client.interceptors.request.use((config) => {
  const token = currentToken || localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Set up response interceptor
Client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Explicitly type the error.config as AxiosRequestConfig
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: number;
    };
    if (
      error.response?.status === 401 &&
      (!originalRequest._retry || originalRequest._retry < 3)
    ) {
      originalRequest._retry = (originalRequest._retry || 0) + 1;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          updateToken(newToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          return Client(originalRequest);
        }
      } catch (refreshError) {
        if (originalRequest._retry < 3) {
          // Retry the refresh token request
          return Client(originalRequest);
        } else {
          // Handle refresh failure after 3 attempts (logout user, redirect to login)
          updateToken(null);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Refresh token function
export const refreshToken = async (): Promise<string | null> => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await Client.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      const { accessToken } = response.data;
      return accessToken;
    } catch (error) {
      console.error(`Error refreshing token (attempt ${attempt}):`, error);
      if (attempt === 3) {
        return null;
      }
      // Wait for a short time before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return null;
};
