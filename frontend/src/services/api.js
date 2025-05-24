import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const courseAPI = {
  generateCourse: (topic, duration = 30) =>
    api.post("/courses/generate", { topic, duration }),

  getAllCourses: () => api.get("/courses"),

  getCourse: (id) => api.get(`/courses/${id}`),
};

export default api;
