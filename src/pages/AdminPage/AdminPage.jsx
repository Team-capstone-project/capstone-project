import React, { useState, useEffect } from "react";
import { dataContent, dataSiswa } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";

const AdminPage = () => {
  // Menghitung jumlah data
  const jumlahMateri = dataContent.length;
  const jumlahSekolah = new Set(dataSiswa.map((siswa) => siswa.sekolah)).size;
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
          <DashboardCard title="Total Materi" count={`${jumlahMateri} Judul`} />
          <DashboardCard title="Sekolah Terdaftar" count={`${jumlahSekolah} Sekolah`} />
          <DashboardCard title="Siswa Terdaftar" count={`${jumlahSiswa} Siswa`} />
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