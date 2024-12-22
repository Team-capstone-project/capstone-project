import React, { useState, useEffect } from "react";
import Preloader from "../../components/Preloader/Preloader";
import { quotesData } from "../../assets/data/data.json";

const StudentPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("userData");

  useEffect(() => {
    console.log("Stored token:", token);
    console.log("Stored user data:", storedUser);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        setError("Terjadi masalah saat membaca data pengguna.");
      }
    } else {
      setError("Data pengguna tidak ditemukan.");
    }
  }, [storedUser]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const today = new Date().getDate();
    const quoteIndex = today % quotesData.length;
    setQuote(quotesData[quoteIndex].text);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Data pengguna tidak ditemukan.</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="card-lms">
          {/* Profil Siswa */}
          <div className="student-profile">
            <div className="profile-section">
              <p>
                <b>Nama</b>: {user.username} 
              </p>
              <p>
                <b>Email</b>: {user.email}
              </p>
              <p>
                <b>Profesi</b>: {user.profession}
              </p>
            </div>
            <div className="info-section">
              <p>
                {currentDate.toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                -{" "}
                {currentDate.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZone: "Asia/Jakarta",
                })}
              </p>
            </div>
          </div>

          {/* Gambar Profil */}
          <div className="profile-image">
            <img src={user.user_image} alt="User Profile" width="100" height="100" />
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
