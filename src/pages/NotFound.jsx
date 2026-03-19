import React from 'react';
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="py-20 flex justify-center w-full min-h-screen neu-bg">
      <div className="neu-flat rounded-[40px] p-16 text-center neu-text min-w-[400px]">
        <h2 className="text-4xl font-black mb-4 text-red-500">404</h2>
        <p className="opacity-70 text-lg font-medium">{t('not_found', 'Sahifa topilmadi...')}</p>
      </div>
    </div>
  );
}

export default NotFound;