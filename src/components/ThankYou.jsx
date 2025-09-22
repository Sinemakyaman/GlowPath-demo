import React from "react";

const ThankYou = ({ onClose }) => {
  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "320px",
      backgroundColor: "rgba(30, 41, 59, 0.95)", // Koyu mavi-gri arka plan
      padding: "25px",
      borderRadius: "12px",
      border: "2px solid #06b6d4", // Cyan border
      zIndex: 1001,
      backdropFilter: "blur(15px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      animation: "slideInFromRight 0.5s ease-out"
    }}>
      <style>
        {`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>

      {/* Başarı İkonu */}
      <div style={{
        width: "50px",
        height: "50px",
        backgroundColor: "#10b981", // Emerald green
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px auto",
        animation: "pulse 2s infinite",
        border: "2px solid #06b6d4" // Cyan border
      }}>
        <span style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          ✓
        </span>
      </div>

      <h3 style={{
        color: "#f59e0b", // Amber - daha okunabilir sarı
        fontSize: "18px",
        fontWeight: "bold",
        margin: "0 0 15px 0",
        textAlign: "center",
        fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
      }}>
        ✅ Bildiriminiz Alındı!
      </h3>

      <p style={{
        color: "#e2e8f0", // Açık gri - koyu arka planda okunabilir
        fontSize: "14px",
        lineHeight: "1.5",
        margin: "0 0 20px 0",
        textAlign: "center",
        fontWeight: "500",
        fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
      }}>
        Olay konumunuz haritada işaretlendi.
        <br />
        <span style={{ color: "#06b6d4", fontWeight: "bold" }}>Haritayı inceleyebilirsiniz!</span>
      </p>

      {/* Kompakt bilgi kutusu */}
      <div style={{
        backgroundColor: "rgba(71, 85, 105, 0.4)", // Koyu gri arka plan ile uyumlu
        padding: "12px",
        borderRadius: "6px",
        margin: "0 0 20px 0",
        border: "1px solid rgba(6, 182, 212, 0.3)" // Cyan border
      }}>
        <ul style={{
          color: "#cbd5e1", // Açık gri yazı
          fontSize: "12px",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontWeight: "500",
          fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
        }}>
          <li style={{ marginBottom: "8px", color: "#10b981" }}>
            🔒 Anonim olarak saklandı
          </li>
          <li style={{ color: "#06b6d4" }}>
            📊 Güvenlik analizi için kullanılacak
          </li>
        </ul>
      </div>

      <button
        onClick={onClose}
        style={{
          backgroundColor: "#f59e0b", // Amber - okunabilir sarı
          color: "#1e293b", // Koyu yazı rengi - daha okunabilir
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.2s",
          width: "100%",
          boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
          fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#eab308";
          e.target.style.transform = "translateY(-1px)";
          e.target.style.boxShadow = "0 6px 16px rgba(245, 158, 11, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#f59e0b";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 12px rgba(245, 158, 11, 0.3)";
        }}
      >
        Ana Sayfa
      </button>
    </div>
  );
};

export default ThankYou;