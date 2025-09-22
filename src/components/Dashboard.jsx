import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet marker ikonlarını düzelt
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Özel kırmızı marker ikonu oluştur
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Dashboard = ({ incidentData }) => {
  if (!incidentData) return null;

  const position = incidentData.location || [39.92077, 32.85411]; // Fallback Ankara

  // Backend'e veri gönder
  useEffect(() => {
    const saveIncident = async () => {
      try {
        await fetch('http://localhost:5000/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...incidentData,
            timestamp: new Date().toISOString()
          }),
        });
        console.log('Olay başarıyla kaydedildi');
      } catch (error) {
        console.error('Olay kaydedilemedi:', error);
      }
    };

    saveIncident();
  }, [incidentData]);

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      position: "relative",
      backgroundColor: "#1a1a1a"
    }}>
      {/* Başlık - Daha kompakt */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(36, 36, 36, 0.95)",
        padding: "15px 30px",
        borderRadius: "8px",
        border: "2px solid #f97316",
        textAlign: "center",
        zIndex: 1000,
        backdropFilter: "blur(10px)"
      }}>
        <h2 style={{
          color: "#f97316",
          margin: 0,
          fontSize: "20px",
          fontWeight: "bold"
        }}>
          📍 Olay Konumu Haritada İşaretlendi
        </h2>
      </div>

      {/* Harita - Tam ekran */}
      <MapContainer
        center={position}
        zoom={16}
        style={{ 
          height: "100vh", 
          width: "100%",
          zIndex: 1
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={redIcon}>
          <Popup>
            <div style={{ minWidth: "200px" }}>
              <h3 style={{ 
                margin: "0 0 10px 0", 
                color: "#f97316",
                fontSize: "16px" 
              }}>
                🚨 {incidentData.incident_type}
              </h3>
              <p style={{ margin: "5px 0", fontSize: "13px", color: "#333" }}>
                <strong>📅 Tarih:</strong> {incidentData.date}
              </p>
              <p style={{ margin: "5px 0", fontSize: "12px", color: "#555" }}>
                <strong>📍 Konum:</strong> {incidentData.fullAddress || "Konum bilgisi"}
              </p>
              {incidentData.description && (
                <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#333" }}>
                  <strong>💬 Açıklama:</strong> {incidentData.description}
                </p>
              )}
              <div style={{
                marginTop: "10px",
                padding: "8px",
                backgroundColor: "#fff5f5",
                borderLeft: "3px solid #f97316",
                fontSize: "11px",
                color: "#666"
              }}>
                Bildiriminiz güvenli bir şekilde kaydedilmiştir.
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Alt bilgi - Kompakt */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        backgroundColor: "rgba(36, 36, 36, 0.9)",
        padding: "10px 15px",
        borderRadius: "6px",
        border: "1px solid #555",
        zIndex: 1000,
        backdropFilter: "blur(5px)"
      }}>
        <p style={{
          color: "#ccc",
          margin: 0,
          fontSize: "11px"
        }}>
          🔒 Bilgileriniz güvenli • ⚠️ Acil: 112 • 💬 Destek: ALO 183
        </p>
      </div>
    </div>
  );
};

export default Dashboard;