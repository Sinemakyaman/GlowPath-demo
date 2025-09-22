import React, { useState } from "react";

const FormPage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    address: "",
    incident_type: "",
    date: "",
    description: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  // Nominatim API ile adres arama (ücretsiz OpenStreetMap)
  const searchAddress = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=tr&limit=5&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Adres arama hatası:", error);
      setSuggestions([]);
    }
    setIsLoadingSuggestions(false);
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, address: value });
    
    // Debounce için timeout kullan
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      searchAddress(value);
    }, 300);
  };

  const selectAddress = (suggestion) => {
    const address = suggestion.display_name;
    const location = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
    
    setFormData({ ...formData, address });
    setSelectedLocation({ address, location });
    setSuggestions([]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert("Lütfen listeden bir adres seçin.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      location: selectedLocation.location,
      fullAddress: selectedLocation.address
    };
    
    onSubmit(dataToSubmit);
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#1a1a1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#242424",
        padding: "40px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "500px",
        border: "2px solid #f97316"
      }}>
        <h2 style={{
          color: "#f97316",
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
        }}>
          Olay Bildirim Formu
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Adres Arama */}
          <div style={{ marginBottom: "20px", position: "relative" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px", fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif" }}>
              Olay Yeri (Adres) *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleAddressChange}
              placeholder="Örn: Kızılay, Ankara veya tam adres yazın..."
              style={{
                ...inputStyle,
                width: "100%",
                boxSizing: "border-box"
              }}
              required
              autoComplete="off"
            />
            
            {/* Adres Önerileri */}
            {suggestions.length > 0 && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#333",
                border: "1px solid #f97316",
                borderRadius: "6px",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 1000
              }}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => selectAddress(suggestion)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      borderBottom: index < suggestions.length - 1 ? "1px solid #555" : "none",
                      color: "white",
                      fontSize: "14px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#444"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
            
            {isLoadingSuggestions && (
              <div style={{ color: "#f97316", fontSize: "12px", marginTop: "5px" }}>
                Adresler aranıyor...
              </div>
            )}
            
            {selectedLocation && (
              <div style={{ color: "#4ade80", fontSize: "12px", marginTop: "5px" }}>
                ✓ Konum seçildi
              </div>
            )}
          </div>

          {/* Olay Türü */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
              Olay Türü *
            </label>
            <select
              name="incident_type"
              value={formData.incident_type}
              onChange={handleChange}
              style={{
                ...inputStyle,
                width: "100%",
                boxSizing: "border-box"
              }}
              required
            >
              <option value="">Olay türünü seçin</option>
              <option value="Taciz">Taciz</option>
              <option value="Sözlü Şiddet">Sözlü Şiddet</option>
              <option value="Fiziksel Şiddet">Fiziksel Şiddet</option>
              <option value="Stalking/Takip">Stalking/Takip</option>
              <option value="Cinsel Taciz">Cinsel Taciz</option>
              <option value="Tehdit">Tehdit</option>
              <option value="Diğer">Diğer</option>
            </select>
          </div>

          {/* Tarih */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
              Olay Tarihi *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{
                ...inputStyle,
                width: "100%",
                boxSizing: "border-box"
              }}
              required
            />
          </div>

          {/* Açıklama */}
          <div style={{ marginBottom: "30px" }}>
            <label style={{ color: "white", display: "block", marginBottom: "8px" }}>
              Olay Açıklaması (Opsiyonel)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Yaşadığınız olayı kısaca açıklayabilirsiniz..."
              style={{
                ...inputStyle,
                width: "100%",
                boxSizing: "border-box",
                height: "80px",
                resize: "vertical"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#f97316",
              color: "white",
              padding: "15px 30px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#ea580c"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#f97316"}
          >
            Bildirimi Gönder
          </button>
        </form>

        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#1a1a1a",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#888"
        }}>
          <strong>Güvenlik Notu:</strong> Bilgileriniz güvenli bir şekilde saklanmaktadır. 
          Kişisel verileriniz gizli tutulur ve sadece güvenlik amaçlı kullanılır.
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #f97316",
  backgroundColor: "#242424",
  color: "white",
  fontSize: 16,
  fontFamily: "'Aptos Narrow', 'Arial Narrow', sans-serif"
};

export default FormPage;