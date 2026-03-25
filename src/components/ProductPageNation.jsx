import React from "react";
import { Pagination } from "antd";

function ProductPageNation({ total, pageSize, current, onChange }) {
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        rootClassName="neu-pagination"
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
      />

      {/* Tailwind style override */}
      <style jsx global>{`
        .neu-pagination .ant-pagination-item {
          background: var(--color-neu-light);
          border: none;
          border-radius: 12px;
          box-shadow: 6px 6px 10px rgba(163,177,198,0.6), -6px -6px 10px rgba(255,255,255,0.8);
          transition: all 0.25s ease;
        }

        html.dark .neu-pagination .ant-pagination-item {
          background: var(--color-neu-dark);
          box-shadow: 6px 6px 12px rgba(15,17,21,0.6), -6px -6px 12px rgba(60,65,75,0.5);
        }

        .neu-pagination .ant-pagination-item:hover {
          transform: translateY(-2px);
        }

        /* ACTIVE PAGE FIX */
        .neu-pagination .ant-pagination-item-active {
          background: var(--color-neu-light) !important;
          border: none !important;
          box-shadow: inset 6px 6px 10px rgba(163,177,198,0.6),
            inset -6px -6px 10px rgba(255,255,255,0.8) !important;
        }

        html.dark .neu-pagination .ant-pagination-item-active {
          background: var(--color-neu-dark) !important;
          box-shadow: inset 6px 6px 12px rgba(15,17,21,0.6),
            inset -6px -6px 12px rgba(60,65,75,0.5) !important;
        }

        .neu-pagination .ant-pagination-item a {
          color: #3b4252 !important;
        }

        html.dark .neu-pagination .ant-pagination-item a {
          color: #d8dee9 !important;
        }

        .neu-pagination .ant-pagination-item-active a {
          font-weight: 800 !important;
        }

        /* blue focus ring remove */
        .neu-pagination .ant-pagination-item:focus-visible {
          outline: none;
        }

        .neu-pagination .ant-pagination-prev,
        .neu-pagination .ant-pagination-next {
          background: var(--color-neu-light);
          border-radius: 12px;
          box-shadow: 6px 6px 10px rgba(163,177,198,0.6),
            -6px -6px 10px rgba(255,255,255,0.8);
          border: none;
        }

        html.dark .neu-pagination .ant-pagination-prev,
        html.dark .neu-pagination .ant-pagination-next {
          background: var(--color-neu-dark);
          box-shadow: 6px 6px 12px rgba(15,17,21,0.6),
            -6px -6px 12px rgba(60,65,75,0.5);
        }

        .neu-pagination .ant-pagination-prev button,
        .neu-pagination .ant-pagination-next button {
          color: #3b4252 !important;
        }

        html.dark .neu-pagination .ant-pagination-prev button,
        html.dark .neu-pagination .ant-pagination-next button {
          color: #d8dee9 !important;
        }
      `}</style>
    </div>
  );
}

export default ProductPageNation;