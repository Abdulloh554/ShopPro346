import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import Theme from "../components/Theme";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

/* ── LOGO ── */
const ShopLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div style={logoSt.box}>
      <span style={{ fontSize: "18px", lineHeight: 1 }}>🛍️</span>
    </div>
    <span style={logoSt.text}>Shop</span>
  </div>
);
const logoSt = {
  box: {
    width: "36px", height: "36px",
    background: "linear-gradient(135deg, #00d2ff, #3a7bd5)",
    borderRadius: "10px",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0,210,255,0.4)",
    flexShrink: 0,
  },
  text: {
    fontSize: "22px", fontWeight: "800",
    background: "linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    letterSpacing: "-0.5px",
  },
};

/* ── NAV LINK STYLES (use CSS vars) ── */
const navLinkSt = (isActive) => ({
  padding: "8px 16px",
  borderRadius: "10px",
  fontSize: "13px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  textDecoration: "none",
  transition: "all 0.2s",
  background: isActive ? "var(--shop-nav-active-bg)" : "transparent",
  color: isActive ? "var(--shop-nav-active)" : "var(--shop-nav-link)",
  borderBottom: isActive
    ? "2px solid var(--shop-nav-active-border)"
    : "2px solid transparent",
});

const drawerLinkSt = (isActive) => ({
  display: "block",
  padding: "12px 18px",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  transition: "all 0.2s",
  background: isActive ? "var(--shop-nav-active-bg)" : "rgba(128,128,128,0.06)",
  color: isActive ? "var(--shop-nav-active)" : "var(--shop-nav-link)",
  borderLeft: isActive
    ? "3px solid var(--shop-nav-active-border)"
    : "3px solid transparent",
  marginBottom: "6px",
});

const iconLinkSt = (isActive) => ({
  width: "38px", height: "38px",
  borderRadius: "50%",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: "19px",
  textDecoration: "none",
  transition: "all 0.2s",
  background: isActive ? "var(--shop-icon-hover)" : "var(--shop-icon-bg)",
  color: isActive ? "var(--shop-nav-active)" : "var(--shop-nav-link)",
  border: isActive
    ? "1.5px solid var(--shop-nav-active)"
    : "1.5px solid var(--shop-icon-border)",
});

/* ── NAV ITEMS ── */
const NavItems = ({ inDrawer = false, onClick = () => {} }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const linkFn = inDrawer ? drawerLinkSt : navLinkSt;
  return (
    <>
      <NavLink to="/contact" style={({ isActive }) => linkFn(isActive)} onClick={onClick}>
        {t("contact", "Aloqa")}
      </NavLink>
      <NavLink to="/aboutus" style={({ isActive }) => linkFn(isActive)} onClick={onClick}>
        {t("about_us", "Biz haqimizda")}
      </NavLink>
      {user ? (
        <NavLink to="/login" style={({ isActive }) => linkFn(isActive)} onClick={onClick}>
          {t("profile", "Profil")}
        </NavLink>
      ) : (
        <>
          <NavLink to="/login" style={({ isActive }) => linkFn(isActive)} onClick={onClick}>
            {t("login", "Kirish")}
          </NavLink>
          <NavLink to="/register" style={({ isActive }) => linkFn(isActive)} onClick={onClick}>
            {t("register", "Ro'yxatdan o'tish")}
          </NavLink>
        </>
      )}
    </>
  );
};

/* ── ACTION ICONS ── */
const ActionIcons = () => {
  const { user } = useAuth();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <NavLink to="/like"  style={({ isActive }) => iconLinkSt(isActive)}><IoHeartOutline /></NavLink>
      <NavLink to="/card"  style={({ isActive }) => iconLinkSt(isActive)}><FaCartPlus /></NavLink>
      {user && (
        <NavLink to="/login" style={({ isActive }) => iconLinkSt(isActive)}><FaUserCircle /></NavLink>
      )}
    </div>
  );
};

/* ── MAIN LAYOUT ── */
function MainLayout() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--shop-bg)",
      fontFamily: "'Inter', -apple-system, sans-serif",
      transition: "background 0.35s ease",
    }}>

      {/* Scoped responsive & AntD overrides */}
      <style>{`
        .ml-desktop { display: flex !important; }
        .ml-mobile   { display: none  !important; }
        @media (max-width: 767px) {
          .ml-desktop { display: none  !important; }
          .ml-mobile   { display: flex  !important; }
        }
        .shop-header .ant-select-selector  { background: transparent !important; }
        .shop-header .ant-select-arrow,
        .shop-header .ant-select-selection-item { color: var(--shop-nav-link) !important; }
      `}</style>

      {/* ═══ HEADER ═══ */}
      <header className="shop-header" style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "var(--shop-header)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderBottom: "1px solid var(--shop-header-border)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.18)",
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto",
          padding: "0 28px", height: "68px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "12px",
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <ShopLogo />
          </NavLink>

          {/* Desktop nav */}
          <nav className="ml-desktop" style={{ alignItems: "center", gap: "4px", flexWrap: "nowrap" }}>
            <NavItems />
            <span style={{
              display: "inline-block", width: "1px", height: "26px",
              background: "var(--shop-divider)", margin: "0 10px", flexShrink: 0,
            }} />
            <ActionIcons />
            <div style={{
              background: "var(--shop-box-bg)", borderRadius: "10px",
              border: "1px solid var(--shop-box-border)", overflow: "hidden",
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <Select
                variant="borderless"
                value={i18n.language || "uz"}
                onChange={(v) => i18n.changeLanguage(v)}
                style={{ width: 68, fontWeight: 700, color: "var(--shop-nav-link)" }}
                options={[
                  { value: "uz", label: "UZ" },
                  { value: "en", label: "EN" },
                  { value: "ru", label: "RU" },
                ]}
                popupMatchSelectWidth={false}
              />
            </div>
            <div style={{
              background: "var(--shop-box-bg)", borderRadius: "999px",
              border: "1px solid var(--shop-box-border)",
              transition: "background 0.3s, border-color 0.3s",
            }}>
              <Theme />
            </div>
          </nav>

          {/* Mobile */}
          <div className="ml-mobile" style={{ alignItems: "center", gap: "10px" }}>
            <ActionIcons />
            <button onClick={() => setMenuOpen(true)} style={{
              background: "var(--shop-box-bg)",
              border: "1.5px solid var(--shop-box-border)",
              color: "var(--shop-nav-link)",
              width: "40px", height: "40px",
              borderRadius: "10px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MdMenu style={{ fontSize: "22px" }} />
            </button>
          </div>
        </div>
      </header>

      {/* ═══ MOBILE DRAWER ═══ */}
      {menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)", zIndex: 100,
            }}
          />
          <div style={{
            position: "fixed", top: 0, right: 0,
            height: "100%", width: "min(300px, 85vw)",
            background: "var(--shop-drawer-bg)",
            borderLeft: "1px solid var(--shop-drawer-border)",
            zIndex: 101, display: "flex", flexDirection: "column",
            padding: "24px 20px",
            boxShadow: "-20px 0 60px rgba(0,0,0,0.3)",
            transition: "background 0.35s ease",
          }}>
            {/* Drawer header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "28px", paddingBottom: "20px",
              borderBottom: "1px solid var(--shop-drawer-border)",
            }}>
              <ShopLogo />
              <button onClick={() => setMenuOpen(false)} style={{
                background: "var(--shop-box-bg)",
                border: "1.5px solid var(--shop-box-border)",
                color: "var(--shop-nav-link)",
                width: "34px", height: "34px", borderRadius: "50%",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <MdClose style={{ fontSize: "20px" }} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <NavItems inDrawer onClick={() => setMenuOpen(false)} />
            </nav>

            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              paddingTop: "20px", borderTop: "1px solid var(--shop-drawer-border)",
            }}>
              <div style={{
                background: "var(--shop-box-bg)", borderRadius: "10px",
                border: "1px solid var(--shop-box-border)", overflow: "hidden",
              }}>
                <Select
                  variant="borderless"
                  value={i18n.language || "uz"}
                  onChange={(v) => i18n.changeLanguage(v)}
                  style={{ width: 80, fontWeight: 700, color: "var(--shop-nav-link)" }}
                  options={[
                    { value: "uz", label: "UZ" },
                    { value: "en", label: "EN" },
                    { value: "ru", label: "RU" },
                  ]}
                />
              </div>
              <div style={{
                background: "var(--shop-box-bg)", borderRadius: "999px",
                border: "1px solid var(--shop-box-border)",
              }}>
                <Theme />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══ MAIN CONTENT ═══ */}
      <main style={{ flex: 1, width: "100%", margin: "0 auto", padding: 0 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;