import React, { useState, useEffect } from "react";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css"; // Make sure to create a separate CSS file for AdminPage

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Dummy admin data for now, you can replace it with actual data from localStorage or a server
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("userData");

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle user data from localStorage
  useEffect(() => {
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
        <div className="admin-container">
          <div className="admin-profile">
            {/* Info Section: Date and Time */}
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

            {/* Profile Section */}
            <div className="profile-section">
              <div className="profile-image">
                <img
                  src={user.user_image}
                  alt="Admin Profile"
                  width="100"
                  height="100"
                />
              </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
