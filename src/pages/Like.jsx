import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from "react-i18next";
import ProductCard from '../components/ProductCard';
import { useData } from '../context/DataContext';

function Like() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { likes, loading: dataLoading, user } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const likedProducts = products.filter(p => likes.some(l => l.productId === p.id));

  if (loading || dataLoading)
    return (
      <div className="min-h-screen neu-bg flex items-center justify-center">
        <p className="text-2xl font-bold neu-text animate-pulse">
          {t("loading")}
        </p>
      </div>
    );

  if (!user) {
    return (
      <div className="py-20 flex justify-center w-full min-h-screen neu-bg">
        <div className="neu-flat rounded-[40px] p-16 text-center neu-text min-w-[400px]">
          <h2 className="text-4xl font-black mb-4">{t('likes', 'Yoqtirganlar')}</h2>
          <p className="opacity-70 text-lg font-medium">{t('login_required_likes', "Iltimos, yoqtirganlarni ko'rish uchun tizimga kiring.")}</p>
        </div>
      </div>
    );
  }

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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Like;