import React, { useState, useEffect } from "react";
import TableWithSearch from "../../components/Table/TableWithSearch";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_SetUser = () => {
  const [loading, setLoading] = useState(true);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formUser, setFormUser] = useState({
    firstname: "",
    lastname: "",
    profession: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
  
        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login ulang.");
        }
  
        const response = await axios.get(
          "https://divine-purpose-production.up.railway.app/api/user/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
  
        console.log(response.data);
  
        const apiData = response.data.allUser || [];
  
        const formattedData = apiData.map((user) => ({
          firstname: user.firstname,
          lastname: user.lastname,
          profession: user.profession || "Tidak diketahui",
          email: user.email,
        }));
  
        setDataSiswa(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleAdd = (newUser) => {
    setDataSiswa([...dataSiswa, newUser]);
  };


  const handleUpdate = (updatedUser) => {
    const updatedData = dataSiswa.map((user) =>
      user.email === updatedUser.email ? updatedUser : user
    );
    setDataSiswa(updatedData);
  };


  const handleDelete = (user) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${user.firstname}?`)) {
      setDataSiswa(dataSiswa.filter((item) => item.email !== user.email));
      alert(`${user.firstname} telah dihapus.`);
    }
  };


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, profession, email, password } = formUser;

    if (firstname && lastname && profession && email && password) {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token tidak ditemukan. Silakan login ulang.");
        }

        let response;
        if (editingUser) {
          response = await axios.put(
            `https://divine-purpose-production.up.railway.app/api/user/update/${editingUser.email}`,
            { firstname, lastname, profession, email, password },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          handleUpdate(response.data.user);
        } else {
          response = await axios.post(
            "https://divine-purpose-production.up.railway.app/api/user/register",
            { firstname, lastname, profession, email, password },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          handleAdd({ firstname, lastname, profession, email });
        }

        console.log("Operasi berhasil:", response.data);
        alert(`${firstname} ${editingUser ? "diperbarui" : "berhasil ditambahkan"}.`);
      } catch (error) {
        console.error("Error registrasi/operasi:", error.message);
        alert("Gagal menyelesaikan operasi.");
      }

      setEditingUser(null);
      setFormUser({ firstname: "", lastname: "", profession: "", email: "", password: "" });
    } else {
      alert("Semua kolom wajib diisi!");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  const headers = ["No", "Nama Depan", "Nama Belakang", "Profesi", "Email", "Aksi"];
  const data = dataSiswa.map((user, index) => ({
    no: index + 1,
    firstname: user.firstname,
    lastname: user.lastname,
    profession: user.profession,
    email: user.email,
    aksi: (
      <div>
        <button onClick={() => setEditingUser(user)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(user)}>
          Hapus
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["firstname", "lastname"];

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Manajemen Pengguna</h2>

        {/* Form Tambah/Edit Pengguna */}
        <form onSubmit={handleFormSubmit} className="admin-form">
          <input
            type="text"
            name="firstname"
            value={formUser.firstname}
            onChange={handleFormChange}
            placeholder="Nama Depan"
            required
          />
          <input
            type="text"
            name="lastname"
            value={formUser.lastname}
            onChange={handleFormChange}
            placeholder="Nama Belakang"
            required
          />
          <input
            type="text"
            name="profession"
            value={formUser.profession}
            onChange={handleFormChange}
            placeholder="Profesi"
            required
          />
          <input
            type="email"
            name="email"
            value={formUser.email}
            onChange={handleFormChange}
            placeholder="Email"
            required
            disabled={!!editingUser}
          />
          <input
            type="password"
            name="password"
            value={formUser.password}
            onChange={handleFormChange}
            placeholder="Kata Sandi"
            required
          />
          <button type="submit" className="submit">
            {editingUser ? "Perbarui Pengguna" : "Tambah Pengguna"}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="cancel"
            >
              Batalkan Edit
            </button>
          )}
        </form>

        {/* Tabel dengan fitur pencarian */}
        <TableWithSearch
          headers={headers}
          data={data}
          searchableColumns={searchableColumns}
          placeholder="Cari berdasarkan nama"
          rowsPerPage={5}
        />
      </div>
    </div>
  );
};

export default Admin_SetUser;
