import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_DaftarContent = () => {
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          "https://divine-purpose-production.up.railway.app/api/tutorial",
          { headers }
        );

        console.log(response.data);

        if (response.data.status === true && Array.isArray(response.data.data)) {
          setContentData(response.data.data);
        } else {
          console.error("Data yang diterima tidak sesuai:", response.data.message);
          setContentData([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchContentData();
  }, []);

  const handleEdit = (content) => {
    if (!content.tutorialCategorySlug || !content.slug) {
      console.error("Category atau slug konten tidak ditemukan", content);
      return;
    }
    navigate(`/admin/setting_content/edit/${content.tutorialCategorySlug}/${content.slug}`);
  };

  const handleDelete = async (content) => {
    if (!content._id) {
      console.error("ID konten tidak ditemukan", content);
      return;
    }

    if (window.confirm(`Apakah Anda yakin ingin menghapus konten "${content.title}"?`)) {
      try {
        const token = localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.delete(
          `https://divine-purpose-production.up.railway.app/api/tutorial/${content._id}`,
          { headers }
        );

        if (response.data.status === true) {
          setContentData(contentData.filter((item) => item._id !== content._id));
          alert(`Konten "${content.title}" telah dihapus.`);
        } else {
          alert("Gagal menghapus konten.");
        }
      } catch (error) {
        console.error("Error deleting content: ", error);
        alert("Terjadi kesalahan saat menghapus konten.");
      }
    }
  };

  const headers = ["No", "Judul", "Subjek", "Tingkat Kelas", "Aksi"];
  const data = Array.isArray(contentData)
    ? contentData.map((content, index) => ({
        no: index + 1,
        title: content.title,
        subject: content.subject,
        gradeLevel: content.level,
        actions: (
          <div>
            <button onClick={() => handleEdit(content)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(content)}>
              Hapus
            </button>
          </div>
        ),
      }))
    : [];

  const searchableColumns = ["title", "subject", "gradeLevel"];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Daftar Konten</h2>
        <TableWithSearch
          headers={headers}
          data={data}
          searchableColumns={searchableColumns}
        />
      </div>
    </div>
  );
};

export default Admin_DaftarContent;
