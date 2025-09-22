import React from "react";
import logo from "../assets/glowpath-logo.jpg";

const Welcome = ({ nextStep }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Logo arka plan */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // filter kaldırıldı → logo parlaklığı orijinal olacak
        }}
      ></div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.75) 100%)",
        }}
      ></div>

      {/* İçerik */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "40px 20px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Üst kısım - Tanıtım yazısı */}
        <div
          style={{
            textAlign: "center",
            maxWidth: "700px",
            marginTop: "60px",
          }}
        >
          <p
            style={{
              color: "white",
              fontSize: "22px",
              fontWeight: "500",
              lineHeight: "1.6",
              margin: 0,
              fontFamily: "'Merriweather', 'Georgia', serif",
              textShadow: "3px 3px 6px rgba(0,0,0,0.9)",
            }}
          >
            GlowPath ile güvenli ve dayanışma dolu şehirler için kadınların ve ihtiyacın olan herkesin 
            deneyimlerini paylaşmasına imkan sağlıyoruz. 🤝
          </p>
        </div>

        {/* Alt kısım - Başla butonu */}
        <div
          style={{
            marginBottom: "80px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            onClick={nextStep}
            style={{
              backgroundColor: "#f97316",
              color: "white",
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            Başla
          </button>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "18px",
              fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            Güvenli bir ortamda deneyiminizi paylaşın
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
