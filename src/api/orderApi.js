import api from "./axios";

export const createOrder = (data) => {
  return api.post("/orders", data);
};

export const getOrderDetail = (orderId) => {
  return api.get(`/orders/${orderId}`);
}