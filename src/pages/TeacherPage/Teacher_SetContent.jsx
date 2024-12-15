import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { dataContent as initialDataContent } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Teacher.css";

const Teacher_SetContent = () => {
  const [loading, setLoading] = useState(true);
  const [dataContent, setDataContent] = useState(initialDataContent);
  const [editingContent, setEditingContent] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (content) => {
    setEditingContent(content);
    setImagePreview(content.image || "");
  };

  const handleDelete = (content) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus konten ${content.title}?`)) {
      setDataContent(dataContent.filter((item) => item.id !== content.id));
      alert(`${content.title} telah dihapus.`);
    }
  };

  const handleAdd = (newContent) => {
    setDataContent([...dataContent, newContent]);
  };

  const handleUpdate = (updatedContent) => {
    const updatedData = dataContent.map((content) =>
      content.id === updatedContent.id ? updatedContent : content
    );
    setDataContent(updatedData);
  };

  const headers = ["No", "Judul", "Mata Pelajaran", "Jenjang", "Aksi"];
  const data = dataContent.map((content, index) => ({
    no: index + 1,
    title: content.title,
    subject: content.subject,
    gradeLevel: content.gradeLevel,
    aksi: (
      <div>
        <button onClick={() => handleEdit(content)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(content)}>Hapus</button>
        <button
          className="edit-detail"
          onClick={() => navigate(`/teacher/setting_content/edit?id=${content.id}`)}
        >
          Edit Konten
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["title"];

  const [formContent, setFormContent] = useState({
    title: "",
    subject: "",
    gradeLevel: "",
    date: "",
    image: "",
    url: "",
  });

  useEffect(() => {
    if (editingContent) {
      setFormContent(editingContent);
      setImagePreview(editingContent.image || "");
    } else {
      setFormContent({
        title: "",
        subject: "",
        gradeLevel: "",
        date: "",
        image: "",
        url: "",
      });
      setImagePreview("");
    }
  }, [editingContent]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormContent({ ...formContent, [name]: value });
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, subject, gradeLevel, date, image, url } = formContent;

    if (title && subject && gradeLevel && date && image && url) {
      if (editingContent) {
        handleUpdate(formContent);
        alert(`${title} berhasil diperbarui.`);
      } else {
        handleAdd(formContent);
        alert(`${title} berhasil ditambahkan.`);
      }
      setEditingContent(null);
      setFormContent({
        title: "",
        subject: "",
        gradeLevel: "",
        date: "",
        image: "",
        url: "",
      });
      setImagePreview("");
    } else {
      alert("Semua field wajib diisi!");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Manajemen Konten</h2>
        <form onSubmit={handleFormSubmit} className="teacher-form">
          <input type="text" name="title" value={formContent.title} onChange={handleFormChange} placeholder="Judul Konten" required />
          <input type="text" name="subject" value={formContent.subject} onChange={handleFormChange} placeholder="Mata Pelajaran" required />
          <input type="text" name="gradeLevel" value={formContent.gradeLevel} onChange={handleFormChange} placeholder="Jenjang" required />
          <input type="date" name="date" value={formContent.date} onChange={handleFormChange} required />
          <input type="text" name="image" value={formContent.image} onChange={handleFormChange} placeholder="Nama File Gambar (contoh: gambar.jpg)" required />
          <input type="text" name="url" value={formContent.url} onChange={handleFormChange} placeholder="URL" required />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Pratinjau Gambar" />
            </div>
          )}
          <button type="submit" className="submit">
            {editingContent ? "Perbarui Konten" : "Tambah Konten"}
          </button>
          {editingContent && (
            <button type="button" onClick={() => setEditingContent(null)} className="cancel">
              Batalkan Edit
            </button>
          )}
        </form>
        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} placeholder="Cari berdasarkan judul konten" rowsPerPage={5} />
      </div>
    </div>
  );
};

export default Teacher_SetContent;