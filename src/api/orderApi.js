import api from "./axios";

export const createOrder = (data) => {
  return api.post("/orders", data);
};

export const getOrderDetail = (orderId) => {
  return api.get(`/orders/${orderId}`);
}

export const addItemToOrder = (orderId, data) => {
    return api.post(`/orders/${orderId}/items`, data);
};

export const closeOrder = (orderId) => {
    return api.patch(`/orders/${orderId}/close`);
};

export const getOrders = () => {
    return api.get("/orders");
};