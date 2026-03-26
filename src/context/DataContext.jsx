import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const API_URL = "http://localhost:3000";

export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("shop_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [likes, setLikes] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from server on login or refresh
  useEffect(() => {
    if (user && user.id) {
      const fetchData = async () => {
        try {
          const [likesRes, cartRes] = await Promise.all([
            axios.get(`${API_URL}/likes?userId=${user.id}`),
            axios.get(`${API_URL}/cart?userId=${user.id}`),
          ]);
          setLikes(likesRes.data);
          setCart(cartRes.data);
        } catch (err) {
          console.error("Failed to fetch data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLikes([]);
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const toggleLike = async (product) => {
    if (!user) {
      message.warning("Iltimos, avval tizimga kiring!");
      return;
    }

    const existingLike = likes.find((l) => l.productId === product.id);

    try {
      if (existingLike) {
        await axios.delete(`${API_URL}/likes/${existingLike.id}`);
        setLikes(likes.filter((l) => l.id !== existingLike.id));
      } else {
        const newLike = {
          userId: user.id,
          productId: product.id,
          productTitle: product.title_en || product.title,
        };
        const res = await axios.post(`${API_URL}/likes`, newLike);
        setLikes([...likes, res.data]);
      }
    } catch (err) {
      message.error("Xatolik yuz berdi!");
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      message.warning("Iltimos, avval tizimga kiring!");
      return;
    }

    const existingItem = cart.find((c) => c.productId === product.id);

    try {
      if (existingItem) {
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        await axios.put(`${API_URL}/cart/${existingItem.id}`, updatedItem);
        setCart(cart.map((c) => (c.id === existingItem.id ? updatedItem : c)));
      } else {
        const newItem = {
          userId: user.id,
          productId: product.id,
          quantity: 1,
          product: product, // Store partial product for quick access
        };
        const res = await axios.post(`${API_URL}/cart`, newItem);
        setCart([...cart, res.data]);
      }
      message.success("Savatga qo'shildi!");
    } catch (err) {
      message.error("Xatolik yuz berdi!");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API_URL}/cart/${id}`);
      setCart(cart.filter((c) => c.id !== id));
      message.info("Savatdan o'chirildi.");
    } catch (err) {
      message.error("Xatolik yuz berdi!");
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      const item = cart.find((c) => c.id === id);
      const updatedItem = { ...item, quantity };
      await axios.put(`${API_URL}/cart/${id}`, updatedItem);
      setCart(cart.map((c) => (c.id === id ? updatedItem : c)));
    } catch (err) {
      message.error("Xatolik yuz berdi!");
    }
  };

  const login = (userData) => {
    localStorage.setItem("shop_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("shop_user");
    setUser(null);
  };

  return (
    <DataContext.Provider
      value={{
        user,
        likes,
        cart,
        loading,
        toggleLike,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
