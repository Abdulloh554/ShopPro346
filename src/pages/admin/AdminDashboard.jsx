import { useEffect, useState } from "react";
import { getProducts } from "../../api/ProductApi";
import { api } from "../../api/api";
import {
  MdShoppingCart,
  MdPeople,
  MdInventory2,
  MdTrendingUp,
  MdArrowUpward,
} from "react-icons/md";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    cart: 0,
    likes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, users, cart, likes] = await Promise.all([
          api.get("products"),
          api.get("users"),
          api.get("cart"),
          api.get("likes"),
        ]);
        setStats({
          products: products.data.length,
          users: users.data.length,
          cart: cart.data.length,
          likes: likes.data.length,
        });
        setRecentProducts(products.data.slice(0, 5));
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Jami Mahsulotlar",
      value: stats.products,
      icon: <MdInventory2 />,
      gradient: "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
      bg: "rgba(0, 210, 255, 0.08)",
    },
    {
      label: "Foydalanuvchilar",
      value: stats.users,
      icon: <MdPeople />,
      gradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
      bg: "rgba(168, 85, 247, 0.08)",
    },
    {
      label: "Savatdagi Mahsulotlar",
      value: stats.cart,
      icon: <MdShoppingCart />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      bg: "rgba(245, 158, 11, 0.08)",
    },
    {
      label: "Yoqtirilgan",
      value: stats.likes,
      icon: <MdTrendingUp />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      bg: "rgba(16, 185, 129, 0.08)",
    },
  ];

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Ma'lumotlar yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      {/* Welcome Banner */}
      <div style={styles.welcomeBanner}>
        <div>
          <h2 style={styles.welcomeTitle}>Xush kelibsiz, Admin! 👋</h2>
          <p style={styles.welcomeSubtitle}>
            Do'koningizning bugungi ko'rsatkichlari
          </p>
        </div>
        <div style={styles.dateBox}>
          {new Date().toLocaleDateString("uz-UZ", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        {cards.map((card, i) => (
          <div key={i} style={{ ...styles.statCard, background: card.bg }}>
            <div style={{ ...styles.iconBox, background: card.gradient }}>
              {card.icon}
            </div>
            <div style={styles.statInfo}>
              <p style={styles.statLabel}>{card.label}</p>
              <h3 style={styles.statValue}>{card.value}</h3>
              <span style={styles.statBadge}>
                <MdArrowUpward style={{ fontSize: "12px" }} /> Aktiv
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products Table */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeader}>
          <h3 style={styles.tableTitle}>So'nggi mahsulotlar</h3>
          <span style={styles.tableCount}>{stats.products} ta</span>
        </div>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHead}>
                <th style={styles.th}>Rasm</th>
                <th style={styles.th}>Nomi</th>
                <th style={styles.th}>Kategoriya</th>
                <th style={styles.th}>Narxi</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map((p) => (
                <tr key={p.id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <img
                      src={p.image}
                      alt={p.title_en}
                      style={styles.productImg}
                      onError={(e) => (e.target.src = "https://picsum.photos/40")}
                    />
                  </td>
                  <td style={styles.td}>
                    <span style={styles.productName}>{p.title_uz}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.categoryBadge}>{p.category_uz}</span>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.price}>${p.price}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    gap: "16px",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(0,210,255,0.2)",
    borderTop: "4px solid #00d2ff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    color: "#888",
    fontSize: "14px",
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    borderRadius: "20px",
    padding: "28px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    flexWrap: "wrap",
    gap: "16px",
  },
  welcomeTitle: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "700",
    margin: "0 0 6px 0",
  },
  welcomeSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
    margin: 0,
  },
  dateBox: {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.8)",
    padding: "10px 18px",
    borderRadius: "12px",
    fontSize: "13px",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  statCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "22px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    border: "1px solid rgba(0,0,0,0.05)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  iconBox: {
    width: "52px",
    height: "52px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "#fff",
    flexShrink: 0,
  },
  statInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    color: "#888",
    fontSize: "13px",
    margin: 0,
    fontWeight: "500",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    margin: 0,
    color: "#1a1a2e",
    lineHeight: 1,
  },
  statBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
    fontSize: "11px",
    color: "#10b981",
    fontWeight: "600",
  },
  tableCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.05)",
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  tableTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  tableCount: {
    background: "rgba(0,210,255,0.1)",
    color: "#0099bb",
    padding: "4px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: "600",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    background: "#f8f9fc",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "700",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    borderBottom: "1px solid #f0f2f5",
  },
  tableRow: {
    borderBottom: "1px solid #f8f9fc",
    transition: "background 0.15s",
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "middle",
  },
  productImg: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "1px solid #f0f2f5",
  },
  productName: {
    fontWeight: "600",
    color: "#1a1a2e",
    fontSize: "14px",
  },
  categoryBadge: {
    background: "rgba(58,123,213,0.08)",
    color: "#3a7bd5",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
  },
  price: {
    fontWeight: "700",
    color: "#1a1a2e",
    fontSize: "15px",
  },
};

export default AdminDashboard;