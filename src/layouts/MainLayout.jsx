import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5"; 
import { Select, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import Theme from "../components/Theme";

/* ================= LOGO ================= */
const ShopLogo = () => (
  <div className="flex items-center gap-2">
    <span
      className="
        font-black text-3xl tracking-tight
        neu-text font-sans
      "
    >
      SHOP
    </span>
  </div>
);

/* ================= NAVLINK STYLE ================= */
const navLinkClass = ({ isActive }) =>
  `relative px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all duration-300
  ${
    isActive
      ? "neu-pressed text-blue-500 dark:text-blue-400"
      : "neu-flat neu-text hover:text-blue-500 dark:hover:text-blue-400"
  }`;

const iconLinkClass = ({ isActive }) =>
  `flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 text-[24px]
  ${
    isActive
      ? "neu-pressed text-blue-500 dark:text-blue-400"
      : "neu-flat neu-text hover:text-blue-500 dark:hover:text-blue-400"
  }`;

const drawerLinkClass = ({ isActive }) =>
  `block py-4 px-6 text-xl font-bold tracking-wide rounded-2xl transition-all duration-300 mb-4
  ${
    isActive
      ? "neu-pressed text-blue-500 dark:text-blue-400"
      : "neu-flat neu-text"
  }`;

function MainLayout() {
  const { t, i18n } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const changeLanguage = (value) => {
    i18n.changeLanguage(value);
  };

  const NavItems = ({ inDrawer = false, onClick = () => {} }) => {
    const linkClass = inDrawer ? drawerLinkClass : navLinkClass;

    return (
      <>
        <NavLink to="/contact" className={linkClass} onClick={onClick}>
          {t('contact', 'Aloqa')}
        </NavLink>
        <NavLink to="/aboutus" className={linkClass} onClick={onClick}>
          {t('about_us', 'Biz haqimizda')}
        </NavLink>
        <NavLink to="/login" className={linkClass} onClick={onClick}>
          {t('login', 'Kirish')}
        </NavLink>
      </>
    );
  };

  const ActionIcons = () => (
    <div className="flex items-center gap-4">
      <NavLink to="/like" className={iconLinkClass}>
        <IoHeartOutline />
      </NavLink>
      <NavLink to="/card" className={iconLinkClass}>
        <FaCartPlus />
      </NavLink>
    </div>
  );

  return (
    <div className="min-h-screen neu-bg transition-colors duration-500 font-sans">
      {/* ================= HEADER ================= */}
      <header
        className="
          neu-bg sticky top-0 z-50 py-4
        "
      >
        <div className="flex items-center justify-between px-6 md:px-12 max-w-[1440px] mx-auto">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center neu-flat px-6 py-2 rounded-2xl">
            <ShopLogo />
          </NavLink>

          {/* DESKTOP NAVBAR */}
          <nav className="hidden md:flex items-center gap-6">
            <NavItems />
            
            <div className="w-px h-10 bg-gray-300 dark:bg-gray-600 mx-2"></div>

            <ActionIcons />

            {/* LANGUAGE */}
            <div className="neu-flat rounded-2xl px-2 py-1">
              <Select
                variant="borderless"
                value={i18n.language || "uz"}
                onChange={changeLanguage}
                className="
                  w-[70px] font-bold neu-text
                  [&_.ant-select-selector]:!bg-transparent
                "
                options={[
                  { value: "uz", label: "UZ" },
                  { value: "en", label: "EN" },
                  { value: "ru", label: "RU" },
                ]}
                dropdownStyle={{ borderRadius: 20 }}
              />
            </div>

            {/* THEME BUTTON */}
            <div className="neu-flat rounded-full">
              <Theme />
            </div>
          </nav>

          {/* MOBILE ACTIONS AND BURGER */}
          <div className="flex md:hidden items-center gap-4">
            <ActionIcons />
            <Button
              type="text"
              icon={<MenuOutlined className="neu-text text-xl" />}
              onClick={() => setDrawerVisible(true)}
              className="neu-flat w-12 h-12 rounded-full border-none shadow-none flex items-center justify-center"
            />
          </div>
        </div>
      </header>


      {/* MOBILE DRAWER */}
      <Drawer
        title={<ShopLogo />}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        className="neu-bg"
        styles={{ 
          wrapper: { background: 'transparent' }, 
          content: { background: 'transparent' },
          body: { background: 'transparent' },
          header: { borderBottom: 'none' }
        }}
        closeIcon={<span className="neu-text text-xl neu-flat w-8 h-8 rounded-full flex items-center justify-center">✕</span>}
      >
        <div className="flex flex-col flex-grow">
          <NavItems inDrawer={true} onClick={() => setDrawerVisible(false)} />
        </div>
        
        <div className="flex items-center justify-between mt-12 pt-6">
          <div className="neu-flat rounded-2xl px-2 py-1">
            <Select
              variant="borderless"
              value={i18n.language || "uz"}
              onChange={changeLanguage}
              className="w-[80px] font-bold neu-text [&_.ant-select-selector]:!bg-transparent"
              options={[
                { value: "uz", label: "UZ" },
                { value: "en", label: "EN" },
                { value: "ru", label: "RU" },
              ]}
            />
          </div>
          <div className="neu-flat rounded-full">
            <Theme />
          </div>
        </div>
      </Drawer>

      {/* ================= MAIN ================= */}
      <main className="pt-10 px-6 md:px-12 pb-20 max-w-[1440px] mx-auto relative z-10 neu-bg">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;