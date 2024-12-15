import React, { useState, useEffect } from "react";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { dataGuru as initialDataGuru } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_SetTeacher = () => {
  const [loading, setLoading] = useState(true);
  const [dataGuru, setDataGuru] = useState(initialDataGuru); // Data guru
  const [editingGuru, setEditingGuru] = useState(null); // Guru yang sedang diedit

  // Simulasi preloader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk mengedit guru
  const handleEdit = (guru) => setEditingGuru(guru);

  // Fungsi untuk menghapus guru
  const handleDelete = (guru) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${guru.nama}?`)) {
      setDataGuru(dataGuru.filter((item) => item.email !== guru.email));
      alert(`${guru.nama} telah dihapus.`);
    }
  };

  // Fungsi untuk menambahkan guru baru
  const handleAdd = (newGuru) => setDataGuru([...dataGuru, newGuru]);

  // Fungsi untuk memperbarui data guru
  const handleUpdate = (updatedGuru) => {
    const updatedData = dataGuru.map((guru) =>
      guru.email === updatedGuru.email ? updatedGuru : guru
    );
    setDataGuru(updatedData);
  };

  // Header dan data untuk tabel
  const headers = ["No", "Nama", "Email", "Status", "Aksi"];
  const data = dataGuru.map((guru, index) => ({
    no: index + 1,
    nama: guru.nama,
    email: guru.email,
    status: guru.status,
    aksi: (
      <div>
        <button onClick={() => handleEdit(guru)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(guru)}>
          Hapus
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["nama"]; // Kolom yang dapat dicari

  // State form untuk tambah/edit guru
  const [formGuru, setFormGuru] = useState({
    nama: "",
    email: "",
    password: "",
    status: "Aktif",
  });

  // Mengisi form dengan data guru yang sedang diedit
  useEffect(() => {
    if (editingGuru) {
      setFormGuru(editingGuru);
    } else {
      setFormGuru({ nama: "", email: "", password: "", status: "Aktif" });
    }
  }, [editingGuru]);

  // Fungsi untuk menangani perubahan di form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormGuru({ ...formGuru, [name]: value });
  };

  // Fungsi untuk submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { nama, email, password } = formGuru;

    if (nama && email && password) {
      if (editingGuru) {
        handleUpdate(formGuru); // Mode edit
        alert(`${nama} berhasil diperbarui.`);
      } else {
        handleAdd(formGuru); // Mode tambah
        alert(`${nama} berhasil ditambahkan.`);
      }

      setEditingGuru(null);
      setFormGuru({ nama: "", email: "", password: "", status: "Aktif" });
    } else {
      alert("Nama, Email, dan Kata Sandi harus diisi!");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Pengaturan Guru</h2>

        {/* Form tambah/edit guru */}
        <form onSubmit={handleFormSubmit} className="admin-form">
          <input type="text" name="nama" value={formGuru.nama} onChange={handleFormChange} placeholder="Nama Guru" required />
          <input type="email" name="email" value={formGuru.email} onChange={handleFormChange} placeholder="Email Guru" required disabled={!!editingGuru} />
          <input type="password" name="password" value={formGuru.password} onChange={handleFormChange} placeholder="Kata Sandi" required />
          <select name="status" value={formGuru.status} onChange={handleFormChange}>
            <option value="Aktif">Aktif</option>
            <option value="Non-Aktif">Non-Aktif</option>
          </select>
          <button type="submit" className="submit">
            {editingGuru ? "Perbarui Guru" : "Tambah Guru"}
          </button>
          {editingGuru && (
            <button type="button" onClick={() => setEditingGuru(null)} className="cancel">
              Batalkan Edit
            </button>
          )}
        </form>

        {/* Tabel data guru */}
        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} placeholder="Cari berdasarkan nama guru" rowsPerPage={5} />
      </div>
    </div>
  );
};

export default Admin_SetTeacher;