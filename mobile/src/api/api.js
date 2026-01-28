import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API = axios.create({
  baseURL: "http://192.168.1.11:5000",
});

API.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getDashboard = () => API.get("/dashboard");
export const getStreamToken = (id) => API.get(`/video/${id}/playback-token`);
export const getStreamUrl = (id, token) =>
  API.get(`/video/${id}/stream?token=${token}`);
export const getProfile = () => API.get("/auth/me");
