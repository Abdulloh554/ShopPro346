import { api } from "./api";

export const getProduct = async (id) => {
    const response = await api.get(`products/${id}`);
    return response.data;
};

export const getProducts = async () => {
    const response = await api.get("products");
    return response.data;
};

export const postProduct = async (body) => {
    const response = await api.post("products", body);
    return response.data;
};

export const editProduct = async (id, body) => {
    const response = await api.put(`products/${id}`, body);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`products/${id}`);
    return response.data;
};

