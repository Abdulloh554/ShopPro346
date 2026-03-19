import { NavLink, Outlet } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoHeartCircle } from "react-icons/io5";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

// Yangi SVG Logo (headerga juda mos)
const ShopLogo = () => (
  <div className="flex items-center gap-3">
    {/* Ikonka qismi */}
    <svg
      width="42"
      height="42"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <defs>
        <linearGradient id="shopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
          <stop offset="100%" stopColor="#6366f1" /> {/* indigo-500 */}
        </linearGradient>
      </defs>

      {/* Savat tanasi */}
      <path
        d="M12 18 L38 18 L42 34 L8 34 L12 18 Z"
        fill="none"
        stroke="url(#shopGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tutqich */}
      <path
        d="M15 18 Q 10 8 5 18"
        fill="none"
        stroke="url(#shopGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M35 18 Q 40 8 45 18"
        fill="none"
        stroke="url(#shopGrad)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* G'ildiraklar */}
      <circle cx="14" cy="38" r="5" fill="#4f46e5" />
      <circle cx="36" cy="38" r="5" fill="#4f46e5" />
    </svg>

    {/* Matn qismi */}
    <span
      className="
        font-black text-3xl tracking-tight
        bg-gradient-to-r from-indigo-600 to-indigo-500 
        bg-clip-text text-transparent
      "
    >
      SHOP
    </span>
  </div>
);

const navLinkClass = ({ isActive }) =>
  `relative font-bold transition-all duration-300 ease-out
   hover:text-indigo-400
   ${
     isActive
       ? "text-indigo-500 after:scale-x-100"
       : "text-gray-700 after:scale-x-0"
   }
   after:content-['']
   after:absolute
   after:left-0
   after:-bottom-1
   after:h-[2px]
   after:w-full
   after:bg-indigo-400
   after:origin-left
   after:transition-transform
   after:duration-300`;

const iconLinkClass = ({ isActive }) =>
  `mt-[-10px] inline-block transition-all duration-300 ease-out
   ${isActive ? "scale-110" : ""}`;

function MainLayout() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="shadow-xl bg-white">
        <div className="flex items-center justify-between px-[80px] py-[25px]">

          {/* ===== LOGO – yangi SVG ===== */}
          <NavLink to="/home" className="flex items-center">
            <ShopLogo />
          </NavLink>

          {/* ===== NAVBAR ===== */}
          <nav className="flex items-center gap-[30px]">

            <NavLink to="/home" className={navLinkClass}>
              {t("home")}
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              {t("contact")}
            </NavLink>

            <NavLink to="/aboutus" className={navLinkClass}>
              {t("about")}
            </NavLink>

            {/* ❤️ LIKE */}
            <NavLink to="/like" className={iconLinkClass}>
              <div className="relative">
                <IoHeartCircle
                  className="
                    text-red-500
                    text-[40px]
                    transition-all
                    duration-300
                    hover:text-red-600
                    hover:-translate-y-1
                    hover:drop-shadow-[0_6px_10px_rgba(239,68,68,0.6)]
                  "
                />
              </div>
            </NavLink>

            {/* 🛒 CART */}
            <NavLink to="/card" className={iconLinkClass}>
              <div className="relative">
                <FaCartPlus
                  className="
                    text-gray-700
                    text-[40px]
                    transition-all
                    duration-300
                    hover:text-indigo-500
                    hover:-translate-y-1
                    hover:drop-shadow-[0_6px_10px_rgba(99,102,241,0.4)]
                  "
                />
              </div>
            </NavLink>

            {/* LOGIN */}
            <NavLink to="/login" className={navLinkClass}>
              {t("login")}
            </NavLink>

            {/* LANGUAGE SELECT */}
            <Select
              showSearch
              placeholder={t("language")}
              value={i18n.language || "uz"}
              onChange={changeLanguage}
              className="w-[140px]"
              options={[
                { value: "uz", label: "UZ" },
                { value: "en", label: "EN" },
                { value: "ru", label: "RU" },
              ]}
            />
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;