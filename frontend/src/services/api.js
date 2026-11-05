import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getNutrition = (userId) =>
  API.get(`/nutrition/${userId}`);

export const getWorkouts = (userId) =>
  API.get(`/workouts/${userId}`);
