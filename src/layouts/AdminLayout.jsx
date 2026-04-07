import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdLogout,
  MdMenu,
  MdViewCarousel,
  MdReceipt,
} from "react-icons/md";
import { useState } from "react";

function AdminLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? "260px" : "80px" }}>
        <div style={styles.logoContainer}>
          {sidebarOpen ? (
            <h1 style={styles.logoText}>AdminPanel</h1>
          ) : (
            <h1 style={styles.logoText}>A</h1>
          )}
        </div>

        <nav style={styles.nav}>
          <NavItem
            icon={<MdDashboard />}
            label="Dashboard"
            open={sidebarOpen}
            active={isActive("/admin")}
            onClick={() => navigate("/admin")}
          />
          <NavItem
            icon={<MdShoppingCart />}
            label="Mahsulotlar"
            open={sidebarOpen}
            active={isActive("/admin/products")}
            onClick={() => navigate("/admin/products")}
          />
          <NavItem
            icon={<MdPeople />}
            label="Foydalanuvchilar"
            open={sidebarOpen}
            active={isActive("/admin/users")}
            onClick={() => navigate("/admin/users")}
          />
          <NavItem
            icon={<MdViewCarousel />}
            label="Karousel"
            open={sidebarOpen}
            active={isActive("/admin/carousels")}
            onClick={() => navigate("/admin/carousels")}
          />
          <NavItem
            icon={<MdReceipt />}
            label="Buyurtmalar"
            open={sidebarOpen}
            active={isActive("/admin/orders")}
            onClick={() => navigate("/admin/orders")}
          />
        </nav>

        <button onClick={handleLogout} style={styles.logoutBtn}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255, 77, 77, 0.25)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255, 77, 77, 0.1)"}
        >
          <MdLogout style={styles.icon} />
          {sidebarOpen && <span>Chiqish</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <header style={styles.header}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuBtn}>
            <MdMenu />
          </button>
          <div style={styles.userInfo}>
            <span style={styles.userName}>{user?.username || "Admin"}</span>
            <div style={styles.avatar}>
              <span style={styles.avatarText}>
                {(user?.username || "A").charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <div style={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

const NavItem = ({ icon, label, open, active, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const bgColor = active
    ? "rgba(0, 210, 255, 0.15)"
    : hovered
    ? "rgba(255, 255, 255, 0.07)"
    : "transparent";

  const color = active
    ? "#00d2ff"
    : hovered
    ? "#ffffff"
    : "rgba(255, 255, 255, 0.6)";

  const borderLeft = active ? "3px solid #00d2ff" : "3px solid transparent";

  return (
    <div
      style={{
        ...styles.navItem,
        background: bgColor,
        color: color,
        borderLeft: borderLeft,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={styles.icon}>{icon}</span>
      {open && <span style={styles.label}>{label}</span>}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "#f0f2f5",
    fontFamily: "'Inter', sans-serif",
  },
  sidebar: {
    background: "#1a1a2e",
    color: "#fff",
    transition: "width 0.3s ease",
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
    overflow: "hidden",
  },
  logoContainer: {
    padding: "0 20px 40px",
    textAlign: "center",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: "10px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
    background: "linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  nav: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "10px 10px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
    userSelect: "none",
  },
  icon: {
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    minWidth: "20px",
  },
  label: {
    marginLeft: "15px",
    fontSize: "14px",
    fontWeight: "500",
  },
  logoutBtn: {
    margin: "10px",
    padding: "12px 15px",
    background: "rgba(255, 77, 77, 0.1)",
    border: "none",
    color: "#ff4d4d",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    fontWeight: "600",
    transition: "background 0.2s",
    fontSize: "14px",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  header: {
    background: "#fff",
    height: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  menuBtn: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#333",
    display: "flex",
    alignItems: "center",
    padding: "6px",
    borderRadius: "8px",
    transition: "background 0.2s",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  userName: {
    fontWeight: "600",
    color: "#333",
    fontSize: "15px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    background: "linear-gradient(45deg, #00d2ff, #3a7bd5)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
  },
  content: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
};

export default AdminLayout;