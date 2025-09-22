// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Incidents dosya yolu
const incidentsPath = path.join(__dirname, 'incidents.json');

// Olay bildirimi kaydet
app.post('/api/report', (req, res) => {
  try {
    const incident = {
      ...req.body,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'reported'
    };

    // Eğer dosya yoksa oluştur
    let existing = [];
    if (fs.existsSync(incidentsPath)) {
      const fileContent = fs.readFileSync(incidentsPath, 'utf8');
      existing = JSON.parse(fileContent);
    }

    existing.push(incident);

    // Dosyaya kaydet
    fs.writeFileSync(incidentsPath, JSON.stringify(existing, null, 2));
    
    console.log('Yeni olay kaydedildi:', {
      id: incident.id,
      type: incident.incident_type,
      date: incident.date,
      location: incident.location
    });

    res.status(201).json({ 
      message: 'Incident saved successfully',
      incidentId: incident.id 
    });
  } catch (error) {
    console.error('Olay kaydedilirken hata:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Olay kaydedilemedi' 
    });
  }
});

// Tüm olayları getir (admin paneli için)
app.get('/api/incidents', (req, res) => {
  try {
    if (!fs.existsSync(incidentsPath)) {
      return res.json([]);
    }

    const fileContent = fs.readFileSync(incidentsPath, 'utf8');
    const incidents = JSON.parse(fileContent);
    
    // Sadece gerekli alanları döndür (gizlilik için)
    const publicIncidents = incidents.map(incident => ({
      id: incident.id,
      incident_type: incident.incident_type,
      date: incident.date,
      location: incident.location,
      timestamp: incident.timestamp
    }));

    res.json(publicIncidents);
  } catch (error) {
    console.error('Olaylar alınırken hata:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// İstatistikler endpoint'i
app.get('/api/stats', (req, res) => {
  try {
    if (!fs.existsSync(incidentsPath)) {
      return res.json({
        total: 0,
        byType: {},
        byMonth: {}
      });
    }

    const fileContent = fs.readFileSync(incidentsPath, 'utf8');
    const incidents = JSON.parse(fileContent);

    // Türe göre grupla
    const byType = incidents.reduce((acc, incident) => {
      acc[incident.incident_type] = (acc[incident.incident_type] || 0) + 1;
      return acc;
    }, {});

    // Aya göre grupla
    const byMonth = incidents.reduce((acc, incident) => {
      const month = new Date(incident.date).toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    res.json({
      total: incidents.length,
      byType,
      byMonth
    });
  } catch (error) {
    console.error('İstatistikler alınırken hata:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Sunucu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   POST /api/report - Olay bildirimi`);
  console.log(`   GET /api/incidents - Tüm olayları getir`);
  console.log(`   GET /api/stats - İstatistikler`);
});