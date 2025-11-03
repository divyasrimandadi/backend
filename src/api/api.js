import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Auth
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");

// Admin
export const createGeofence = (data) => API.post("/admin/geofence", data);
export const activateAttendance = (data) => API.post("/admin/activate-attendance", data);
export const deactivateAttendance = (data) => API.post("/admin/deactivate-attendance", data);

// Student
export const markAttendance = (data) => API.post("/student/attendance", data);

export default API;
