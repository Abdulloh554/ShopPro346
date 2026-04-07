import { useTheme } from "../context/ThemeContext";

function Theme() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            title={isDark ? "Kunduzgi rejim" : "Tungi rejim"}
            style={{
                position: "relative",
                width: "52px",
                height: "28px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.35s ease",
                background: isDark
                    ? "linear-gradient(135deg, #1a1a2e, #3a7bd5)"
                    : "linear-gradient(135deg, #f59e0b, #fbbf24)",
                boxShadow: isDark
                    ? "0 0 12px rgba(58,123,213,0.5), inset 0 1px 3px rgba(0,0,0,0.4)"
                    : "0 0 12px rgba(251,191,36,0.5), inset 0 1px 3px rgba(0,0,0,0.15)",
                flexShrink: 0,
            }}
        >
            {/* Track stars (dark mode) */}
            {isDark && (
                <>
                    <span style={{ position: "absolute", left: "7px", top: "6px", fontSize: "6px", opacity: 0.7 }}>✦</span>
                    <span style={{ position: "absolute", left: "12px", top: "14px", fontSize: "4px", opacity: 0.5 }}>✦</span>
                </>
            )}

            {/* Knob */}
            <span
                style={{
                    position: "absolute",
                    top: "3px",
                    left: isDark ? "27px" : "3px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: isDark
                        ? "linear-gradient(135deg, #c8d6f8, #e8f0fe)"
                        : "linear-gradient(135deg, #fff7ed, #fef3c7)",
                    boxShadow: isDark
                        ? "0 2px 8px rgba(0,0,0,0.4)"
                        : "0 2px 8px rgba(0,0,0,0.2)",
                    transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                }}
            >
                {isDark ? "🌙" : "☀️"}
            </span>
        </button>
    );
}

export default Theme;