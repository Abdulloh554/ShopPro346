import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginAdmin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // Simple admin check
        if (trimmedUsername === "admin" && trimmedPassword === "admin123") {
            const adminUser = { id: "1", username: "admin", isAdmin: true };
            login(adminUser);
            // Redundant local storage is fine, but we mainly rely on AuthContext
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        } else {
            setError("Noto'g'ri login yoki parol!");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Admin Panel</h2>
                <p style={styles.subtitle}>Tizimga kirish uchun ma'lumotlarni kiriting</p>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Login</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Parol</label>
                        <div style={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                style={styles.inputWithIcon}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.eyeBtn}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {error && <p style={styles.error}>{error}</p>}
                    <button type="submit" style={styles.button}>
                        Kirish
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        fontFamily: "'Inter', sans-serif",
    },
    card: {
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        border: "1px solid rgba(255, 255, 255, 0.1)",
    },
    title: {
        color: "#fff",
        fontSize: "28px",
        marginBottom: "10px",
        fontWeight: "700",
    },
    subtitle: {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "14px",
        marginBottom: "30px",
    },
    form: {
        textAlign: "left",
    },
    inputGroup: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        color: "#fff",
        fontSize: "14px",
        marginBottom: "8px",
        fontWeight: "500",
    },
    input: {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s",
    },
    passwordContainer: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inputWithIcon: {
        width: "100%",
        padding: "12px 45px 12px 16px",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.3s",
    },
    eyeBtn: {
        position: "absolute",
        right: "12px",
        background: "none",
        border: "none",
        color: "rgba(255, 255, 255, 0.6)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        fontSize: "18px",
    },
    button: {
        width: "100%",
        padding: "14px",
        borderRadius: "8px",
        border: "none",
        background: "linear-gradient(45deg, #00d2ff 0%, #3a7bd5 100%)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        marginTop: "10px",
    },
    error: {
        color: "#ff4d4d",
        fontSize: "14px",
        marginBottom: "15px",
        textAlign: "center",
    },
};

export default LoginAdmin;
