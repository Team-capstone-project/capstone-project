import React, { useState, useEffect } from 'react';
import Preloader from '../../components/Preloader/Preloader';
import { quotesData, dataSiswa } from '../../assets/data/data.json';

const StudentPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState('');
  const [siswa, setSiswa] = useState(null);

  // Simulasi loading saat halaman pertama kali dimuat
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mengambil quote berdasarkan hari saat ini
  useEffect(() => {
    const today = new Date().getDate(); // Mendapatkan tanggal hari ini
    const quoteIndex = today % quotesData.length; // Perputaran index quote
    setQuote(quotesData[quoteIndex].text);
  }, []);

  // Mengupdate waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Menentukan data siswa dengan id tertentu
  useEffect(() => {
    const siswaData = dataSiswa.find((s) => s.id === 4); // id = 4
    setSiswa(siswaData);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (!siswa) {
    return <p>Data siswa tidak ditemukan.</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="card-lms">
          {/* Profil Siswa */}
          <div className="student-profile">
            <div className="profile-section">
              <p>
                <b>Nama</b>: {siswa.nama}
              </p>
              <p>
                <b>Email</b>: {siswa.email}
              </p>
              <p>
                <b>Sekolah</b>: {siswa.sekolah}
              </p>
            </div>
            <div className="info-section">
              <p>
                {currentDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                })}{' '}
                -{' '}
                {currentDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Jakarta',
                })}
              </p>
            </div>
          </div>

          {/* Quotes Harian */}
          <div className="quotes-section">
            <h2>Quotes Harian</h2>
            <blockquote>{quote}</blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
