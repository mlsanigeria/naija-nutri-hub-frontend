import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://naija-nutri-hub.azurewebsites.net",
  // Removed default Content-Type header to allow Axios to automatically set it
  // based on the request data (e.g., 'multipart/form-data' for FormData, 'application/json' for objects).
});

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Axios request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Axios request error:", error);
    return Promise.reject(error);
  },
);