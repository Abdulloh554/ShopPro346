import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../hooks/useQuaryProduct";
import CustomPagination from "../components/ProductPageNation";
import ProductCard from "./ProductCard";

function Products() {
  const { t } = useTranslation();
  const { data: products } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // ✅ products array bo'lmasa bo'sh array ishlatamiz
  const safeProducts = Array.isArray(products) ? products : [];

  const startIndex = (currentPage - 1) * pageSize;
  const selectedProducts = safeProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <section className="neu-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-black neu-text mb-10 uppercase tracking-tighter">
          {t("products")}
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {selectedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-12 flex justify-center">
          <CustomPagination
            total={safeProducts.length}
            pageSize={pageSize}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </section>
  );
}

export default Products;