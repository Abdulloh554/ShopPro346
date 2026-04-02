import React from "react";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import { useAuth } from "../context/AuthContext";
import { useLikes, useToggleLike } from "../hooks/useQuaryLikes";
import { useCart, useAddToCart } from "../hooks/useQuaryCart";

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
    (l) => l.productId === item.id
  );

  const lang = i18n.language.substring(0, 2);

  const displayTitle =
    item[`title_${lang}`] || item.title_en || item.title;

  const displayCategory =
    item[`category_${lang}`] ||
    item.category_en ||
    item.category;

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      message.warning(t("login_required", "Iltimos, tizimga kiring"));
      return;
    }

    const currentlyLiked = isLocallyLiked;

    const existingLike = safeLikes.find(
      (l) => l.productId === item.id
    );

    toggleLikeMutation.mutate({
      product: item,
      existingLike,
    });

    message.success(
      currentlyLiked
        ? t("removed_from_likes", "Yoqtirganlardan olib tashlandi")
        : t("added_to_likes", "Yoqtirganlarlariga qo'shildi")
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      message.warning(t("login_required", "Iltimos, tizimga kiring"));
      return;
    }

    const existingItem = safeCart.find(
      (c) => c.productId === item.id
    );

    addToCartMutation.mutate({
      product: item,
      existingItem,
    });

    message.success(t("added_to_cart", "Savatga qo'shildi"));
  };

  return (
    <div className="neu-flat rounded-[28px] p-4 flex flex-col relative transition hover:-translate-y-1 h-full">
      <div
        className="h-48 rounded-[20px] neu-pressed bg-cover bg-center mb-4 relative overflow-hidden shrink-0"
        style={{ backgroundImage: `url(${item.image})` }}
      >
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
        <p className="text-[10px] font-bold opacity-40 mb-1">
          {displayCategory}
        </p>

        <h2 className="font-bold line-clamp-2 text-sm md:text-base mb-2">
          {displayTitle}
        </h2>

        <div className="mt-auto">
          <p className="font-black text-lg">
            ${item.price}
          </p>
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