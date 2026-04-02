import { api } from "./api";

export const getCarousel = async (id) => {
    const response = await api.get(`carousels/${id}`);
    return response.data;
};

export const getCarousels = async () => {
    const response = await api.get("carousels");
    return response.data;
};

export const postCarousel = async (body) => {
    const response = await api.post("carousels", body);
    return response.data;
};

export const editCarousel = async (id, body) => {
    const response = await api.put(`carousels/${id}`, body);
    return response.data;
};

export const deleteCarousel = async (id) => {
    const response = await api.delete(`carousels/${id}`);
    return response.data;
};