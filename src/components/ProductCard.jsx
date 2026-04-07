import React from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useLikes, useToggleLike } from "../hooks/useQueryLikes";
import { useCart, useAddToCart } from "../hooks/useQueryCart";

function ProductCard({ item }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const userId = user?.id;

  const { data: likes } = useLikes(userId);
  const { data: cart } = useCart(userId);

  const toggleLikeMutation = useToggleLike(userId);
  const addToCartMutation = useAddToCart(userId);

  /* array himoya */
  const safeLikes = Array.isArray(likes) ? likes : [];
  const safeCart = Array.isArray(cart) ? cart : [];

  const isLocallyLiked = safeLikes.some(
    (l) => String(l.productId) === String(item.id)
  );

  const lang = i18n.language.substring(0, 2);

  const displayTitle =
    item[`title_${lang}`] || item.title_en || item.title;

  const displayCategory =
    item[`category_${lang}`] ||
    item.category_en ||
    item.category;

  const handleToggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      message.warning(t("login_required", "Iltimos, tizimga kiring"));
      return;
    }

    const currentlyLiked = isLocallyLiked;

    const existingLike = safeLikes.find(
      (l) => String(l.productId) === String(item.id)
    );

    try {
      await toggleLikeMutation.mutateAsync({
        product: item,
        existingLike,
      });

      message.success(
        currentlyLiked
          ? t("removed_from_likes", "Yoqtirganlardan olib tashlandi")
          : t("added_to_likes", "Yoqtirganlarlariga qo'shildi")
      );
    } catch {
      message.error(t("error", "Xatolik yuz berdi"));
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      message.warning(t("login_required", "Iltimos, tizimga kiring"));
      return;
    }

    const existingItem = safeCart.find(
      (c) => String(c.productId) === String(item.id)
    );

    try {
      await addToCartMutation.mutateAsync({
        product: item,
        existingItem,
      });

      message.success(t("added_to_cart", "Savatga qo'shildi"));
    } catch {
      message.error(t("error", "Xatolik yuz berdi"));
    }
  };

  return (
    <div className="neu-flat rounded-[28px] p-4 flex flex-col relative transition hover:-translate-y-1 h-full group" style={{ minHeight: '320px' }}>
      <div className="happy-badge">Hot</div>
      <div
        className="h-48 rounded-[20px] neu-pressed bg-cover bg-center mb-4 relative overflow-hidden shrink-0"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-pink-300/20 to-emerald-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <button
          type="button"
          onClick={handleToggleLike}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-2xl transition
          ${
            isLocallyLiked
              ? "bg-red-500 text-white"
              : "bg-white/70"
          }`}
        >
          {isLocallyLiked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: 'var(--shop-accent)' }}>
          {displayCategory}
        </p>

        <h2 className="font-black line-clamp-2 text-base md:text-lg mb-2" style={{ color: 'var(--shop-text)' }}>
          {displayTitle}
        </h2>

        <div className="mt-auto">
          <p className="font-black text-xl mb-1" style={{ color: 'var(--shop-accent)' }}>${item.price}</p>
          <p className="text-xs font-bold uppercase" style={{ color: 'var(--shop-text-muted)' }}>{t('fast_sale', 'Tezkor chegirma')}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="neu-convex mt-4 py-3 rounded-full font-bold text-xs"
      >
        {t("add_to_cart", "Savatga qo'shish")}
      </button>
    </div>
  );
}

export default ProductCard;