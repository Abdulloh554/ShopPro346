import { useEffect, useState } from "react";
import { api } from "../../api/api";
import {
  MdShoppingCart,
  MdInventory2,
  MdTrendingUp,
  MdArrowUpward,
} from "react-icons/md";

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    sales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mocking seller specific stats for now
        const [products] = await Promise.all([
          api.get("products"),
        ]);
        setStats({
          products: products.data.length,
          orders: 12, // Mock
          sales: 4500, // Mock
        });
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
      label: "Mening Mahsulotlarim",
      value: stats.products,
      icon: <MdInventory2 />,
      gradient: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
      bg: "rgba(16, 185, 129, 0.08)",
    },
    {
      label: "Jami Buyurtmalar",
      value: stats.orders,
      icon: <MdShoppingCart />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
      bg: "rgba(245, 158, 11, 0.08)",
    },
    {
      label: "Jami Savdo",
      value: `$${stats.sales}`,
      icon: <MdTrendingUp />,
      gradient: "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
      bg: "rgba(168, 85, 247, 0.08)",
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
          <h2 style={styles.welcomeTitle}>Salom, Hamkor! 🚀</h2>
          <p style={styles.welcomeSubtitle}>
            Bugungi sotuvlar va mahsulotlaringiz holati
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
    border: "4px solid rgba(16, 185, 129, 0.2)",
    borderTop: "4px solid #10b981",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    color: "#888",
    fontSize: "14px",
  },
  welcomeBanner: {
    background: "linear-gradient(135deg, #0d0d1a 0%, #1a1a2e 100%)",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
};

export default SellerDashboard;
