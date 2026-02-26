import api from "./axios";

export const getTables = () => {
  return api.get("/tables");
};