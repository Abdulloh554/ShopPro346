import { api } from "./api";

// ========== API functions ==========

export const getLikes = async (userId) => {
  const response = await api.get(`likes?userId=${String(userId)}`);
  return response.data;
};

export const addLike = async ({ userId, productId, product }) => {
  const response = await api.post("likes", { 
    userId: String(userId), 
    productId: String(productId), 
    product 
  });
  return response.data;
};

export const removeLike = async (likeId) => {
  const response = await api.delete(`likes/${likeId}`);
  return response.data;
};

