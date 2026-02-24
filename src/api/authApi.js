import api from "./axios";

export const loginRequest = (data) => {
  return api.post("/login", data);
};