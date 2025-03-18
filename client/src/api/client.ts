// client.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Create axios client
export const Client = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Be cautious with this
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

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
        // Handle refresh failure (logout user, redirect to login)
        updateToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Refresh token function
export const refreshToken = async (): Promise<string | null> => {
  try {
    const response = await Client.post("/auth/refresh", {
      withCredentials: true,
    });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
