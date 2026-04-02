import { api } from "./api";

// ========== API functions ==========

export const getCart = async (userId) => {
  const response = await api.get(`cart?userId=${userId}`);
  return response.data;
};

export const addToCart = async ({ userId, productId, product, quantity = 1 }) => {
  const response = await api.post("cart", { userId, productId, product, quantity });
  return response.data;
};

export const updateCartItem = async (id, data) => {
  const response = await api.patch(`cart/${id}`, data);
  return response.data;
};

export const removeFromCart = async (id) => {
  const response = await api.delete(`cart/${id}`);
  return response.data;
};

