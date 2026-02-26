import api from "./axios";

export const createOrder = (data) => {
  return api.post("/orders", data);
};