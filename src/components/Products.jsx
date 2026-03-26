import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../components/ProductPageNation";
import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { useData } from "../context/DataContext";

function Products() {
  const { t } = useTranslation();
  const { loading: dataLoading } = useData();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading || dataLoading)
    return (
      <div className="min-h-screen neu-bg flex items-center justify-center">
        <p className="text-2xl font-bold neu-text animate-pulse">
          {t("loading")}
        </p>
      </div>
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
            <ProductCard 
              key={item.id} 
              item={item} 
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-12 flex justify-center">
          <CustomPagination
            total={products.length}
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