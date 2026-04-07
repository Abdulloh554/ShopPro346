import { useState, useEffect } from "react";
import { getCarousels, postCarousel, editCarousel, deleteCarousel } from "../../api/CarouselsApi";
import { MdAdd, MdEdit, MdDelete, MdClose } from "react-icons/md";

const CarouselManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await getCarousels();
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = async () => {
    if (!imageUrl.trim()) return;
    setSaving(true);
    try {
      await postCarousel({ image: imageUrl });
      setShowAddModal(false);
      setImageUrl("");
      fetchSlides();
    } catch (error) {
      console.error("Error adding slide:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditSlide = async () => {
    if (!imageUrl.trim()) return;
    setSaving(true);
    try {
      await editCarousel(selectedSlide.id, { image: imageUrl });
      setShowEditModal(false);
      setImageUrl("");
      setSelectedSlide(null);
      fetchSlides();
    } catch (error) {
      console.error("Error editing slide:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlide = async () => {
    setSaving(true);
    try {
      await deleteCarousel(selectedSlide.id);
      setShowDeleteConfirm(false);
      setSelectedSlide(null);
      fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (slide) => {
    setSelectedSlide(slide);
    setImageUrl(slide.image);
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setImageUrl("");
    setSelectedSlide(null);
  };

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.pageTitle}>Karousel Boshqaruvi</h1>
          <p style={styles.pageSubtitle}>{slides.length} ta rasm mavjud</p>
        </div>
        <button style={styles.addBtn} onClick={() => setShowAddModal(true)}>
          <MdAdd style={{ fontSize: "20px" }} />
          Rasm qo'shish
        </button>
      </div>

      {/* Slides Grid */}
      {loading ? (
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <p style={{ color: "#888", marginTop: "12px" }}>Yuklanmoqda...</p>
        </div>
      ) : slides.length === 0 ? (
        <div style={styles.emptyBox}>
          <p style={{ color: "#999", fontSize: "16px" }}>Karousel rasmlari topilmadi</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {slides.map((slide) => (
            <div key={slide.id} style={styles.card}>
              <div style={styles.cardImgWrap}>
                <img
                  src={slide.image}
                  alt="carousel slide"
                  style={styles.cardImg}
                  onError={(e) => (e.target.src = "https://picsum.photos/400/200")}
                />
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.slideId}>ID: {slide.id}</span>
                <div style={styles.actions}>
                  <button style={styles.editBtn} onClick={() => openEditModal(slide)}>
                    <MdEdit />
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => {
                      setSelectedSlide(slide);
                      setShowDeleteConfirm(true);
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div style={styles.overlay} onClick={closeModals}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {showAddModal ? "Rasm qo'shish" : "Rasmni tahrirlash"}
              </h2>
              <button style={styles.closeBtn} onClick={closeModals}>
                <MdClose />
              </button>
            </div>
            <div style={styles.modalBody}>
              <label style={styles.label}>Rasm URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                style={styles.input}
              />
              {imageUrl && (
                <div style={styles.previewBox}>
                  <p style={styles.previewTitle}>Oldindan ko'rish:</p>
                  <img
                    src={imageUrl}
                    alt="preview"
                    style={styles.previewImg}
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              )}
            </div>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={closeModals}>
                Bekor
              </button>
              <button
                style={styles.saveBtn}
                disabled={saving || !imageUrl.trim()}
                onClick={showAddModal ? handleAddSlide : handleEditSlide}
              >
                {saving ? "Saqlanmoqda..." : showAddModal ? "Qo'shish" : "Saqlash"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div style={styles.overlay} onClick={() => setShowDeleteConfirm(false)}>
          <div style={styles.confirmModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.confirmIcon}>🗑️</div>
            <h3 style={styles.confirmTitle}>Rasmni o'chirish</h3>
            <p style={styles.confirmText}>
              Ushbu rasmni karouseldan o'chirishni tasdiqlaysizmi?
            </p>
            <div style={styles.confirmActions}>
              <button style={styles.cancelBtn} onClick={() => setShowDeleteConfirm(false)}>
                Bekor
              </button>
              <button
                style={styles.confirmDeleteBtn}
                disabled={saving}
                onClick={handleDeleteSlide}
              >
                {saving ? "O'chirilmoqda..." : "Ha, o'chirish"}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    transition: "transform 0.2s",
    border: "1px solid rgba(0,0,0,0.04)",
  },
  cardImgWrap: {
    height: "180px",
    overflow: "hidden",
    background: "#f8f9fc",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardFooter: {
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
  },
  slideId: {
    fontSize: "12px",
    color: "#888",
    fontWeight: "600",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editBtn: {
    background: "rgba(0, 210, 255, 0.08)",
    color: "#0099bb",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
  },
  deleteBtn: {
    background: "rgba(239, 68, 68, 0.08)",
    color: "#ef4444",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
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
    maxWidth: "500px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
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
  modalBody: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginBottom: "24px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#555",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid #e8eaed",
    fontSize: "14px",
    outline: "none",
    background: "#f8f9fc",
    boxSizing: "border-box",
  },
  previewBox: {
    marginTop: "10px",
  },
  previewTitle: {
    fontSize: "12px",
    color: "#888",
    marginBottom: "8px",
  },
  previewImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    border: "1px solid #e8eaed",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    borderTop: "1px solid #f0f2f5",
    paddingTop: "20px",
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
    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  },
  confirmModal: {
    background: "#fff",
    borderRadius: "20px",
    padding: "36px 30px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
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

export default CarouselManagement;
