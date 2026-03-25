import React from "react";
import { useTranslation } from "react-i18next";

function ProductCard({ item, liked, toggleLike }) {
  const { t, i18n } = useTranslation();

  const displayTitle = item[`title_${i18n.language.substring(0, 2)}`] || item.title_en || item.title;
  const displayCategory = item[`category_${i18n.language.substring(0, 2)}`] || item.category_en || item.category;

  return (
    <div
      className="neu-flat rounded-[28px] p-4 flex flex-col relative transition hover:-translate-y-1 h-full"
    >
      {/* IMAGE */}
      <div
        className="h-48 rounded-[20px] neu-pressed bg-cover bg-center mb-4 relative overflow-hidden shrink-0"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        {/* LIKE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(item.id);
          }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-md flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm z-10"
        >
          {liked[item.id] ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="flex-1 flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-widest neu-text opacity-40 mb-1">
            {displayCategory}
          </p>
          <h2 className="font-bold neu-text line-clamp-2 text-sm md:text-base mb-2">
            {displayTitle}
          </h2>
          <div className="mt-auto">
            <p className="neu-text font-black text-lg">
              ${item.price}
            </p>
          </div>
      </div>

      <button className="neu-convex mt-4 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:text-blue-500 transition-colors">
        {t("add_to_cart")}
      </button>
    </div>
  );
}

export default ProductCard;
