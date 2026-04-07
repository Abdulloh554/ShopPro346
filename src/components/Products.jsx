import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useQueryProduct";
import CustomPagination from "../components/ProductPageNation";
import ProductCard from "./ProductCard";

const SORT_OPTIONS = [
  { value: "default", labelKey: "sort_default", labelFb: "Standart" },
  { value: "price_asc", labelKey: "sort_price_asc", labelFb: "Narx: arzon → qimmat" },
  { value: "price_desc", labelKey: "sort_price_desc", labelFb: "Narx: qimmat → arzon" },
  { value: "name_asc", labelKey: "sort_name_asc", labelFb: "Nom: A → Z" },
];

function Products() {
  const { t, i18n } = useTranslation();
  const { data: products } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const pageSize = 10;
  const lang = i18n.language?.substring(0, 2) || "uz";
  const safeProducts = Array.isArray(products) ? products : [];

  // Kategoriyalarni dinamik olish
  const categories = useMemo(() => {
    const cats = new Set();
    safeProducts.forEach((p) => {
      const cat = p[`category_${lang}`] || p.category_en || "";
      if (cat) cats.add(cat);
    });
    return ["all", ...Array.from(cats)];
  }, [safeProducts, lang]);

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let result = safeProducts;

    // Qidiruv
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) => {
        const title = (p[`title_${lang}`] || p.title_en || "").toLowerCase();
        const cat = (p[`category_${lang}`] || p.category_en || "").toLowerCase();
        return title.includes(q) || cat.includes(q);
      });
    }

    // Kategoriya
    if (activeCategory !== "all") {
      result = result.filter((p) => {
        const cat = p[`category_${lang}`] || p.category_en || "";
        return cat === activeCategory;
      });
    }

    // Saralash
    const sorted = [...result];
    if (sortBy === "price_asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name_asc") {
      sorted.sort((a, b) => {
        const aName = a[`title_${lang}`] || a.title_en || "";
        const bName = b[`title_${lang}`] || b.title_en || "";
        return aName.localeCompare(bName);
      });
    }

    return sorted;
  }, [safeProducts, search, activeCategory, sortBy, lang]);

  // Pagination: filter o'zgarganda 1-sahifaga qaytish
  const handleSearch = (val) => { setSearch(val); setCurrentPage(1); };
  const handleCategory = (cat) => { setActiveCategory(cat); setCurrentPage(1); };
  const handleSort = (val) => { setSortBy(val); setCurrentPage(1); };

  const startIndex = (currentPage - 1) * pageSize;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  return (
    <section className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Sarlavha */}
        <h1 className="text-4xl md:text-5xl font-black neu-text-joy mb-3 uppercase tracking-tighter">
          {t("products", "Mahsulotlar")}
          <span className="ml-4 text-lg">🛍️</span>
        </h1>
        <p className="text-lg md:text-xl font-semibold mb-8" style={{ color: 'var(--shop-text-muted)' }}>
          {t("find_your_favorite", "Eng zo'r mahsulotlarni toping!")}
        </p>

        {/* FILTER PANEL */}
        <div className="mb-8 flex flex-col gap-4">

          {/* Qidiruv + Sort qatori */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-xl pointer-events-none">
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={t("search_placeholder", "Mahsulot qidirish...")}
                className="w-full pl-12 pr-4 py-3 rounded-2xl font-semibold text-sm outline-none transition-all"
                style={{
                  background: "var(--shop-input-bg)",
                  border: "1.5px solid var(--shop-input-border)",
                  color: "var(--shop-input-text)",
                }}
              />
              {search && (
                <button
                  onClick={() => handleSearch("")}
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "var(--shop-text-muted)", fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-3 rounded-2xl font-semibold text-sm outline-none cursor-pointer transition-all"
              style={{
                background: "var(--shop-input-bg)",
                border: "1.5px solid var(--shop-input-border)",
                color: "var(--shop-input-text)",
                minWidth: "200px",
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey, opt.labelFb)}
                </option>
              ))}
            </select>
          </div>

          {/* Kategoriya tugmalari */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className="px-4 py-2 rounded-full font-bold text-sm transition-all duration-200"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, var(--shop-accent), var(--shop-accent2))"
                      : "var(--shop-input-bg)",
                    color: isActive ? "#fff" : "var(--shop-nav-link)",
                    boxShadow: isActive ? "0 4px 14px rgba(0,210,255,0.35)" : "none",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                    border: isActive ? "none" : "1.5px solid var(--shop-input-border)",
                    cursor: "pointer",
                  }}
                >
                  {cat === "all" ? t("all_categories", "Barchasi") : cat}
                </button>
              );
            })}
          </div>

          {/* Natija soni */}
          <p className="text-sm font-semibold text-purple-500">
            {filteredProducts.length > 0
              ? t("results_count", `${filteredProducts.length} ta mahsulot topildi`).replace("{{count}}", filteredProducts.length)
              : ""}
          </p>
        </div>

        {/* Mahsulotlar yo'q */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="text-6xl">🔍</span>
            <p className="text-xl font-bold text-purple-400">
              {t("no_products_found", "Mahsulot topilmadi")}
            </p>
            <p className="text-sm text-gray-400">
              {t("try_different_filter", "Boshqa kalit so'z yoki kategoriya sinab ko'ring")}
            </p>
            <button
              onClick={() => { handleSearch(""); handleCategory("all"); handleSort("default"); }}
              className="mt-2 px-6 py-2 rounded-full font-bold text-sm text-white transition"
              style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}
            >
              {t("reset_filters", "Filterni tozalash")}
            </button>
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {selectedProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-12 flex justify-center">
              <CustomPagination
                total={filteredProducts.length}
                pageSize={pageSize}
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default Products;