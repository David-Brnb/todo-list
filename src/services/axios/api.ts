import { auth } from "@/services/firebase/auth";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  let token = null;

  try {
    const { useAuthStore } = await import("@/stores/auth");
    token = useAuthStore.getState().token;
  } catch (e) {
    // Evitar errores de inicialización temprana
  }

  if (!token && auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken(true);
        const { useAuthStore } = await import("@/stores/auth");
        useAuthStore.setState({ token });
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
