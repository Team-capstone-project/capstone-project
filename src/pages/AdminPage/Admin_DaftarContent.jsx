import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { dataContent } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_DaftarContent = () => {
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState(dataContent);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (content) => {
    navigate(`/admin/setting_content/edit?id=${content.id}`);
  };

  const handleDelete = (content) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus konten "${content.title}"?`)) {
      setContentData(contentData.filter((item) => item.id !== content.id));
      alert(`Konten "${content.title}" telah dihapus.`);
    }
  };

  const headers = ["No", "Judul", "Subjek", "Tingkat Kelas", "Aksi"];
  const data = contentData.map((content, index) => ({
    no: index + 1,
    title: content.title,
    subject: content.subject,
    gradeLevel: content.gradeLevel,
    actions: (
      <div>
        <button onClick={() => handleEdit(content)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(content)}>
          Hapus
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["title", "subject", "gradeLevel"];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Daftar Konten</h2>
        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} />
      </div>
    </div>
  );
};

export default Admin_DaftarContent;
