import React, { useState, useEffect } from 'react';
import Preloader from '../../components/Preloader/Preloader';
import { quotesData, dataGuru } from '../../assets/data/data.json';

function TeacherPage() {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState("");
  const [guru, setGuru] = useState(null);

  useEffect(() => {
    // Simulasi proses loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Memperbarui kutipan berdasarkan hari ini
    const today = new Date().getDate(); // Mendapatkan tanggal hari ini
    const quoteIndex = today % quotesData.length; // Menggilir kutipan setiap hari
    setQuote(quotesData[quoteIndex].text);
  }, []);

  useEffect(() => {
    // Mengambil data guru
    const guruData = dataGuru.find(g => g.id === 1); // Mengambil guru dengan ID 1
    setGuru(guruData);
  }, []);

  useEffect(() => {
    // Memperbarui waktu setiap detik
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (!guru) {
    return <p>Data guru tidak ditemukan.</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="card-lms">
          <div className="teacher-profile">
            <div className="profile-section">
              <p><b>Nama</b>: {guru.nama}</p>
              <p><b>Email</b>: {guru.email}</p>
            </div>
            <div className="info-section">
              <p>
                {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}{" "}
                -{" "}
                {currentDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta',
                })}
              </p>
            </div>
          </div>

          <div className="quotes-section">
            <h2>Kutipan Harian</h2>
            <blockquote>{quote}</blockquote>
          </div>
        </div>
      </div>
    </div>
  );  
}

export default TeacherPage;