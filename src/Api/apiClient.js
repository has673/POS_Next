import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optionally add interceptors for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Global API error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
