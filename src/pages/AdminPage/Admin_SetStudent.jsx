import React, { useState, useEffect } from "react";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { dataSiswa as initialDataSiswa } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_SetStudent = () => {
  const [loading, setLoading] = useState(true);
  const [dataSiswa, setDataSiswa] = useState(initialDataSiswa);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [formSiswa, setFormSiswa] = useState({
    nama: "",
    sekolah: "",
    email: "",
    password: "",
  });

  // Simulasi loading saat halaman pertama kali diakses
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update form ketika mode edit diaktifkan
  useEffect(() => {
    if (editingSiswa) {
      setFormSiswa(editingSiswa);
    } else {
      setFormSiswa({ nama: "", sekolah: "", email: "", password: "" });
    }
  }, [editingSiswa]);

  // Fungsi untuk mengedit data siswa
  const handleEdit = (siswa) => {
    setEditingSiswa(siswa);
  };

  // Fungsi untuk menghapus data siswa
  const handleDelete = (siswa) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${siswa.nama}?`)) {
      setDataSiswa(dataSiswa.filter((item) => item.email !== siswa.email));
      alert(`${siswa.nama} telah dihapus.`);
    }
  };

  // Fungsi untuk menambahkan siswa baru
  const handleAdd = (newSiswa) => {
    setDataSiswa([...dataSiswa, newSiswa]);
  };

  // Fungsi untuk memperbarui data siswa
  const handleUpdate = (updatedSiswa) => {
    const updatedData = dataSiswa.map((siswa) =>
      siswa.email === updatedSiswa.email ? updatedSiswa : siswa
    );
    setDataSiswa(updatedData);
  };

  // Fungsi untuk menangani perubahan di form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormSiswa((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { nama, sekolah, email, password } = formSiswa;

    if (nama && sekolah && email && password) {
      if (editingSiswa) {
        handleUpdate(formSiswa);
        alert(`${nama} berhasil diperbarui.`);
      } else {
        handleAdd(formSiswa);
        alert(`${nama} berhasil ditambahkan.`);
      }
      setEditingSiswa(null);
      setFormSiswa({ nama: "", sekolah: "", email: "", password: "" });
    } else {
      alert("Semua kolom wajib diisi!");
    }
  };

  // Header dan data untuk tabel
  const headers = ["No", "Nama", "Sekolah", "Email", "Aksi"];
  const data = dataSiswa.map((siswa, index) => ({
    no: index + 1,
    nama: siswa.nama,
    sekolah: siswa.sekolah,
    email: siswa.email,
    aksi: (
      <div>
        <button onClick={() => handleEdit(siswa)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(siswa)}>
          Hapus
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["nama"];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Manajemen Siswa</h2>

        {/* Form Tambah/Edit Siswa */}
        <form onSubmit={handleFormSubmit} className="admin-form">
          <input type="text" name="nama" value={formSiswa.nama} onChange={handleFormChange} placeholder="Nama Siswa" required />
          <input type="text" name="sekolah" value={formSiswa.sekolah} onChange={handleFormChange} placeholder="Sekolah" required />
          <input type="email" name="email" value={formSiswa.email} onChange={handleFormChange} placeholder="Email Siswa" required disabled={!!editingSiswa} />
          <input type="password" name="password" value={formSiswa.password} onChange={handleFormChange} placeholder="Kata Sandi" required />
          <button type="submit" className="submit">
            {editingSiswa ? "Perbarui Siswa" : "Tambah Siswa"}
          </button>
          {editingSiswa && (
            <button type="button" onClick={() => setEditingSiswa(null)} className="cancel">
              Batalkan Edit
            </button>
          )}
        </form>

        {/* Tabel dengan fitur pencarian */}
        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} placeholder="Cari berdasarkan nama siswa" rowsPerPage={5} />
      </div>
    </div>
  );
};

export default Admin_SetStudent;