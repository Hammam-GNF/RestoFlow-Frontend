import api from "./axios";

export const getFoods = () => {
  return api.get("/foods");
};