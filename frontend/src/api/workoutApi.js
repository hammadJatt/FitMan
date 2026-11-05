import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/workouts",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWorkouts = (userId) => API.get(`/${userId}`);
export const addWorkout = (data) => API.post("/", data);
export const deleteWorkout = (id) => API.delete(`/${id}`);
