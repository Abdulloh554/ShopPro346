import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaInstagram, FaTelegram, FaFacebook } from 'react-icons/fa';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto py-8 neu-bg px-6 md:px-12 max-w-[1440px] w-full mx-auto z-10 relative">
      <div className="neu-flat rounded-[40px] p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-black text-3xl tracking-tight neu-text font-sans">
              SHOP
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full neu-flat neu-text hover:text-blue-500 transition-all duration-300 text-xl">
              <FaTelegram />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full neu-flat neu-text hover:text-pink-500 transition-all duration-300 text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full neu-flat neu-text hover:text-blue-600 transition-all duration-300 text-xl">
              <FaFacebook />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm font-bold opacity-50 neu-text">
          &copy; {new Date().getFullYear()} SHOP. {t('all_rights_reserved', 'Barcha huquqlar himoyalangan.')}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
