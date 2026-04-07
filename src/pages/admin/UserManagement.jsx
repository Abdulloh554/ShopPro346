import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../api/UsersApi";
import { MdDelete, MdSearch, MdPeople } from "react-icons/md";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    setDeleting(true);
    try {
      await deleteUser(selectedUser.id);
      setShowDeleteConfirm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Foydalanuvchilar</h1>
          <p style={styles.pageSubtitle}>{users.length} ta ro'yxatdan o'tgan foydalanuvchi</p>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchBox}>
        <MdSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Foydalanuvchini qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Users Table */}
      {loading ? (
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p style={{ color: "#888", marginTop: "12px" }}>Yuklanmoqda...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ color: "#999", fontSize: "16px" }}>Foydalanuvchi topilmadi</p>
        </div>
      ) : (
        <div style={styles.tableCard}>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHead}>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Amallar</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <span style={styles.userId}>#{user.id}</span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.userCell}>
                        <div style={styles.avatar}>
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <span style={styles.userName}>{user.username}</span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteConfirm(true);
                        }}
                        disabled={user.username === "admin"}
                      >
                        <MdDelete /> O'chirish
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div style={styles.overlay} onClick={() => setShowDeleteConfirm(false)}>
          <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.confirmIcon}>🗑️</div>
            <h3 style={styles.confirmTitle}>Foydalanuvchini o'chirish</h3>
            <p style={styles.confirmText}>
              <strong>{selectedUser?.username}</strong> foydalanuvchisini o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.
            </p>
            <div style={styles.confirmActions}>
              <button style={styles.cancelBtn} onClick={() => setShowDeleteConfirm(false)}>
                Bekor
              </button>
              <button
                style={styles.confirmDeleteBtn}
                disabled={deleting}
                onClick={handleDeleteUser}
              >
                {deleting ? "O'chirilmoqda..." : "Ha, o'chirish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
    fontFamily: "'Inter', sans-serif",
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#1a1a2e",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#888",
    margin: "4px 0 0",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    border: "1.5px solid #e8eaed",
    borderRadius: "12px",
    padding: "10px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  searchIcon: {
    color: "#aaa",
    fontSize: "20px",
    flexShrink: 0,
  },
  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#333",
    width: "100%",
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "4px solid rgba(0,210,255,0.2)",
    borderTop: "4px solid #00d2ff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  emptyBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    background: "#fff",
    borderRadius: "16px",
    border: "1px dashed #ddd",
  },
  tableCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.05)",
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
    "&:hover": {
      background: "#fcfdfe",
    },
  },
  td: {
    padding: "14px 16px",
    verticalAlign: "middle",
  },
  userId: {
    color: "#888",
    fontSize: "13px",
    fontWeight: "500",
  },
  userCell: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #00d2ff, #3a7bd5)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
  },
  userName: {
    fontWeight: "600",
    color: "#1a1a2e",
    fontSize: "14px",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(239, 68, 68, 0.08)",
    color: "#ef4444",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  confirmModal: {
    background: "#fff",
    borderRadius: "20px",
    padding: "36px 30px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  confirmIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  confirmTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: "0 0 10px",
  },
  confirmText: {
    color: "#666",
    fontSize: "14px",
    lineHeight: 1.6,
    margin: "0 0 24px",
  },
  confirmActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  cancelBtn: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1.5px solid #e8eaed",
    background: "#fff",
    color: "#555",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },
  confirmDeleteBtn: {
    padding: "10px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
  },
};

export default UserManagement;
