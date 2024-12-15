import React, { useState, useEffect } from "react";
import { dataContent, dataGuru, dataSiswa } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";

const AdminPage = () => {
  // Menghitung jumlah data
  const jumlahMateri = dataContent.length;
  const jumlahGuru = dataGuru.length;
  const jumlahSiswa = dataSiswa.length;

  // State untuk preloader
  const [loading, setLoading] = useState(true);

  // Simulasi loading saat halaman pertama kali diakses
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="dashboard-container">
          <DashboardCard title="Jumlah Materi" count={`${jumlahMateri} Judul`} />
          <DashboardCard title="Jumlah Guru" count={jumlahGuru} />
          <DashboardCard title="Jumlah Siswa" count={jumlahSiswa} />
        </div>
      </div>
    </div>
  );
};

// Komponen untuk kartu dashboard
const DashboardCard = ({ title, count }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default AdminPage;