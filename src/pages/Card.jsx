import React from 'react';
import { useTranslation } from "react-i18next";
import { Button, Empty, message } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from '../hooks/useQueryCart';

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
        <div className="neu-flat rounded-[40px] p-16 text-center neu-text min-w-100">
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

  const subtotal = cart.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="py-12 min-h-screen neu-bg">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-10 neu-text uppercase tracking-tighter">
          {t('cart', 'Savat')}
        </h2>

        {cart.length === 0 ? (
          <div className="neu-flat rounded-[40px] p-16 text-center neu-text">
            <Empty description={<span className="neu-text opacity-70 text-lg">{t('cart_empty', "Savatingiz bo'sh...")}</span>} />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items List */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => {
                const p = item.product || {};
                const lang = i18n.language.substring(0, 2);
                const title = p[`title_${lang}`] || p.title_en || p.title;
                return (
                  <div key={item.id} className="neu-flat rounded-[30px] p-6 flex flex-col md:flex-row items-center gap-6 group transition-all hover:scale-[1.01]">
                    <div className="w-24 h-24 rounded-[20px] neu-pressed overflow-hidden shrink-0">
                      <img src={p.image} alt={title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
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
                          <p className="font-black neu-text text-lg">${((p.price || 0) * item.quantity).toFixed(2)}</p>
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

            {/* Order Summary Sidebar */}
            <div className="w-full lg:w-[380px]">
              <div className="neu-flat rounded-[40px] p-8 sticky top-24">
                <h3 className="text-2xl font-black neu-text mb-6 uppercase tracking-tight">
                  {t('order_summary', 'Buyurtma xulosasi')}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="neu-text opacity-60 font-medium">{t('subtotal', 'Oraliq jami')}</span>
                    <span className="neu-text font-bold text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="neu-text opacity-60 font-medium">{t('shipping', 'Yetkazib berish')}</span>
                    <span className="neu-text font-bold text-lg">
                      {shipping === 0 ? (
                        <span className="text-emerald-500 uppercase text-sm font-black tracking-widest">{t('free', 'Bepul')}</span>
                      ) : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="h-[2px] neu-pressed rounded-full my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="neu-text text-lg font-black">{t('total', 'Jami')}</span>
                    <span className="text-2xl font-black text-emerald-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="primary" 
                  block
                  className="h-16 rounded-full border-none shadow-lg text-lg font-black uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                  style={{ 
                    background: 'linear-gradient(45deg, #10b981 0%, #3b82f6 100%)',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                  }}
                  onClick={() => message.info(t('checkout_coming_soon', 'Tez orada rasmiylashtirish imkoniyati paydo bo\'ladi!'))}
                >
                  {t('checkout_btn', 'Rasmiylashtirish')}
                </Button>

                {shipping > 0 && (
                  <p className="mt-6 text-center text-xs font-bold text-blue-500 uppercase tracking-widest leading-relaxed">
                    ${(100 - subtotal).toFixed(2)} {t('more_for_free_shipping', 'ko\'proq harid qiling va yetkazib berish bepul bo\'lsin!')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;