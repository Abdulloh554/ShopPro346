import React from 'react';
import { useTranslation } from "react-i18next";
import { Button, Empty } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from '../hooks/useQuaryCart';

function Card() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  
  const { data: cart = [], isLoading } = useCart(user?.id);
  const updateQuantityMutation = useUpdateCartQuantity(user?.id);
  const removeMutation = useRemoveFromCart(user?.id);

  // --- User tizimga kirmagan holat ---
  if (!user) {
    return (
      <div className="py-20 flex justify-center w-full min-h-screen neu-bg">
        <div className="neu-flat rounded-[40px] p-16 text-center neu-text min-w-[400px]">
          <h2 className="text-4xl font-black mb-4">{t('cart', 'Savat')}</h2>
          <p className="opacity-70 text-lg font-medium">
            {t('login_required_cart', "Iltimos, savatni ko'rish uchun tizimga kiring.")}
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen neu-bg flex items-center justify-center">
        <p className="text-2xl font-bold neu-text animate-pulse">
          {t("loading", "Yuklanmoqda...")}
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 min-h-screen neu-bg">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-10 neu-text uppercase tracking-tighter">
          {t('cart', 'Savat')}
        </h2>

        {cart.length === 0 ? (
          <div className="neu-flat rounded-[40px] p-16 text-center neu-text">
            <Empty description={<span className="neu-text opacity-70 text-lg">{t('cart_empty', "Savatingiz bo'sh...")}</span>} />
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => {
              const p = item.product || {};
              const title = p[`title_${i18n.language.substring(0, 2)}`] || p.title_en || p.title;
              return (
                <div key={item.id} className="neu-flat rounded-[30px] p-6 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-[20px] neu-pressed overflow-hidden flex-shrink-0">
                    <img src={p.image} alt={title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold neu-text mb-1">{title}</h3>
                    <p className="neu-text opacity-60 text-sm font-bold uppercase tracking-widest">${p.price}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 neu-pressed p-2 rounded-full">
                      <Button 
                         shape="circle" 
                        size="small" 
                        icon={<MinusOutlined />} 
                        onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity - 1, item })}
                        className="neu-convex border-none shadow-sm hover:scale-110"
                        disabled={item.quantity <= 1}
                      />
                      <span className="font-black neu-text w-8 text-center">{item.quantity}</span>
                      <Button 
                        shape="circle" 
                        size="small" 
                        icon={<PlusOutlined />} 
                        onClick={() => updateQuantityMutation.mutate({ id: item.id, quantity: item.quantity + 1, item })}
                        className="neu-convex border-none shadow-sm hover:scale-110"
                      />
                    </div>
                    
                    <div className="w-24 text-center">
                        <p className="font-black neu-text text-lg">${(p.price || 0) * item.quantity}</p>
                    </div>

                    <Button 
                      danger 
                      shape="circle" 
                      icon={<DeleteOutlined />} 
                      onClick={() => removeMutation.mutate(item.id)}
                      className="neu-convex border-none shadow-sm hover:scale-110 text-red-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;