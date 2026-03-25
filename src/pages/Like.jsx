import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ProductCard from '../components/ProductCard';

function Like() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState(() => {
    try {
      const saved = localStorage.getItem("liked_products");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3002/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("liked_products", JSON.stringify(liked));
  }, [liked]);

  const toggleLike = (id) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const likedProducts = products.filter(p => liked[p.id]);

  if (loading)
    return (
      <div className="min-h-screen neu-bg flex items-center justify-center">
        <p className="text-2xl font-bold neu-text animate-pulse">
          {t("loading")}
        </p>
      </div>
    );

  return (
    <div className="py-12 min-h-screen neu-bg">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-10 neu-text uppercase tracking-tighter">
          {t('likes', 'Yoqtirganlar')}
        </h2>
        
        {likedProducts.length === 0 ? (
          <div className="neu-flat rounded-[40px] p-16 text-center neu-text">
            <p className="opacity-70 text-lg font-medium">
              {t('likes_empty', "Ro'yxat bo'sh...")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {likedProducts.map((item) => (
              <ProductCard 
                key={item.id} 
                item={item} 
                liked={liked} 
                toggleLike={toggleLike} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Like;