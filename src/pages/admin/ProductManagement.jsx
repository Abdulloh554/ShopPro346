import { useState, useEffect } from "react";
import { getProducts, postProduct, editProduct, deleteProduct } from "../../api/ProductApi";
import { MdAdd, MdEdit, MdDelete, MdClose, MdSearch } from "react-icons/md";

const EMPTY_FORM = {
  image: "",
  title_uz: "",
  title_en: "",
  title_ru: "",
  category_uz: "",
  category_en: "",
  category_ru: "",
  price: "",
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    setSaving(true);
    try {
      await postProduct(formData);
      setShowAddModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = async () => {
    setSaving(true);
    try {
      await editProduct(selectedProduct.id, formData);
      setShowEditModal(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error editing product:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async () => {
    setSaving(true);
    try {
      await deleteProduct(selectedProduct.id);
      setShowDeleteConfirm(false);
      setShowEditModal(false);
      setSelectedProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      image: product.image,
      title_uz: product.title_uz,
      title_en: product.title_en,
      title_ru: product.title_ru,
      category_uz: product.category_uz,
      category_en: product.category_en,
      category_ru: product.category_ru,
      price: product.price,
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredProducts = products.filter((p) =>
    p.title_uz?.toLowerCase().includes(search.toLowerCase()) ||
    p.title_en?.toLowerCase().includes(search.toLowerCase()) ||
    p.category_en?.toLowerCase().includes(search.toLowerCase())
  );

  const closeAddModal = () => { setShowAddModal(false); resetForm(); };
  const closeEditModal = () => { setShowEditModal(false); resetForm(); };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Mahsulotlar</h1>
          <p style={styles.pageSubtitle}>{products.length} ta mahsulot mavjud</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <MdAdd style={{ fontSize: "20px" }} />
          Mahsulot qo'shish
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchBox}>
        <MdSearch style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Mahsulot qidirish..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p style={{ color: "#888", marginTop: "12px" }}>Yuklanmoqda...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ color: "#999", fontSize: "16px" }}>Mahsulot topilmadi</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.card}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.cardImgWrap}>
                <img
                  src={product.image}
                  alt={product.title_en}
                  style={styles.cardImg}
                  onError={(e) => (e.target.src = "https://picsum.photos/200")}
                />
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.cardTitle}>{product.title_uz}</h3>
                <span style={styles.cardCategory}>{product.category_uz}</span>
                <div style={styles.cardFooter}>
                  <span style={styles.cardPrice}>${product.price}</span>
                  <button style={styles.editBtn} onClick={() => openEditModal(product)}>
                    <MdEdit /> Tahrirlash
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div style={styles.overlay} onClick={closeAddModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Mahsulot qo'shish</h2>
              <button style={styles.closeBtn} onClick={closeAddModal}><MdClose /></button>
            </div>
            <ProductForm formData={formData} onChange={handleInputChange} />
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={closeAddModal}>Bekor</button>
              <button style={styles.saveBtn} disabled={saving}
                onClick={handleAddProduct}
              >{saving ? "Saqlanmoqda..." : "Qo'shish"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div style={styles.overlay} onClick={closeEditModal}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Mahsulotni tahrirlash</h2>
              <button style={styles.closeBtn} onClick={closeEditModal}><MdClose /></button>
            </div>
            <ProductForm formData={formData} onChange={handleInputChange} />
            <div style={styles.modalActions}>
              <button style={styles.deleteBtn}
                onClick={() => setShowDeleteConfirm(true)}
              >
                <MdDelete /> O'chirish
              </button>
              <div style={{ display: "flex", gap: "10px" }}>
                <button style={styles.cancelBtn} onClick={closeEditModal}>Bekor</button>
                <button style={styles.saveBtn} disabled={saving}
                  onClick={handleEditProduct}
                >{saving ? "Saqlanmoqda..." : "Saqlash"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div style={styles.overlay} onClick={() => setShowDeleteConfirm(false)}>
          <div style={styles.confirmModal} onClick={e => e.stopPropagation()}>
            <div style={styles.confirmIcon}>🗑️</div>
            <h3 style={styles.confirmTitle}>Mahsulotni o'chirish</h3>
            <p style={styles.confirmText}>
              <strong>{selectedProduct?.title_uz}</strong> mahsulotini o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.
            </p>
            <div style={styles.confirmActions}>
              <button style={styles.cancelBtn} onClick={() => setShowDeleteConfirm(false)}>Bekor</button>
              <button style={styles.confirmDeleteBtn} disabled={saving}
                onClick={handleDeleteProduct}
              >{saving ? "O'chirilmoqda..." : "Ha, o'chirish"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductForm = ({ formData, onChange }) => (
  <div style={formStyles.grid}>
    {/* Image URL + Preview */}
    <div style={formStyles.fullRow}>
      <label style={formStyles.label}>Rasm URL</label>
      <input name="image" value={formData.image} onChange={onChange}
        placeholder="https://example.com/image.jpg"
        style={formStyles.input} required
      />
      {formData.image && (
        <img src={formData.image} alt="preview" style={formStyles.preview}
          onError={e => e.target.style.display = "none"}
        />
      )}
    </div>
    <div>
      <label style={formStyles.label}>Nomi (UZ)</label>
      <input name="title_uz" value={formData.title_uz} onChange={onChange} placeholder="Mahsulot nomi (UZ)" style={formStyles.input} required />
    </div>
    <div>
      <label style={formStyles.label}>Nomi (EN)</label>
      <input name="title_en" value={formData.title_en} onChange={onChange} placeholder="Product name (EN)" style={formStyles.input} required />
    </div>
    <div>
      <label style={formStyles.label}>Nomi (RU)</label>
      <input name="title_ru" value={formData.title_ru} onChange={onChange} placeholder="Название (RU)" style={formStyles.input} required />
    </div>
    <div>
      <label style={formStyles.label}>Kategoriya (UZ)</label>
      <input name="category_uz" value={formData.category_uz} onChange={onChange} placeholder="Kategoriya (UZ)" style={formStyles.input} required />
    </div>
    <div>
      <label style={formStyles.label}>Kategoriya (EN)</label>
      <input name="category_en" value={formData.category_en} onChange={onChange} placeholder="Category (EN)" style={formStyles.input} required />
    </div>
    <div>
      <label style={formStyles.label}>Kategoriya (RU)</label>
      <input name="category_ru" value={formData.category_ru} onChange={onChange} placeholder="Категория (RU)" style={formStyles.input} required />
    </div>
    <div style={formStyles.fullRow}>
      <label style={formStyles.label}>Narxi ($)</label>
      <input name="price" type="number" value={formData.price} onChange={onChange} placeholder="0.00" style={formStyles.input} required min="0" />
    </div>
  </div>
);

const formStyles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    paddingBottom: "20px",
    maxHeight: "420px",
    overflowY: "auto",
    paddingRight: "4px",
  },
  fullRow: {
    gridColumn: "1 / -1",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e8eaed",
    fontSize: "14px",
    outline: "none",
    background: "#f8f9fc",
    color: "#333",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  preview: {
    marginTop: "10px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e8eaed",
  },
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
    flexWrap: "wrap",
    gap: "12px",
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
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #00d2ff, #3a7bd5)",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: "12px",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    transition: "transform 0.2s",
    boxShadow: "0 4px 16px rgba(0,210,255,0.35)",
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
    border: "1px solid rgba(0,0,0,0.04)",
  },
  cardImgWrap: {
    height: "160px",
    overflow: "hidden",
    background: "#f8f9fc",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardBody: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardCategory: {
    fontSize: "12px",
    background: "rgba(58,123,213,0.08)",
    color: "#3a7bd5",
    padding: "3px 10px",
    borderRadius: "6px",
    width: "fit-content",
    fontWeight: "600",
  },
  cardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "6px",
  },
  cardPrice: {
    fontWeight: "800",
    fontSize: "16px",
    color: "#1a1a2e",
  },
  editBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    background: "rgba(0,210,255,0.08)",
    color: "#0099bb",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
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
  modal: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    maxHeight: "90vh",
    overflowY: "auto",
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
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  closeBtn: {
    background: "#f0f2f5",
    border: "none",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#555",
  },
  modalActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "16px",
    borderTop: "1px solid #f0f2f5",
    gap: "10px",
    flexWrap: "wrap",
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
  saveBtn: {
    padding: "10px 24px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #00d2ff, #3a7bd5)",
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,210,255,0.3)",
  },
  deleteBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "rgba(239,68,68,0.1)",
    color: "#ef4444",
    fontWeight: "700",
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

export default ProductManagement;