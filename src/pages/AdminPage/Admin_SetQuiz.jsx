import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { quizData as initialQuizData } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import './Admin.css';

const Admin_SetQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(initialQuizData);
  const [editingQuiz, setEditingQuiz] = useState(null); // Kuis yang sedang diedit
  const navigate = useNavigate(); // Hook untuk melakukan navigasi

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (quiz) => {
    setEditingQuiz(quiz); // Mengatur data kuis untuk diedit
  };

  const handleDelete = (quiz) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kuis "${quiz.title}"?`)) {
      setQuizData(quizData.filter((item) => item.id !== quiz.id));
      alert(`Kuis "${quiz.title}" telah dihapus.`);
    }
  };

  const handleAdd = (newQuiz) => {
    setQuizData([...quizData, newQuiz]);
  };

  const handleUpdate = (updatedQuiz) => {
    const updatedData = quizData.map((quiz) =>
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );
    setQuizData(updatedData);
  };

  const headers = ["No", "Judul", "Jumlah Soal", "Aksi"];
  const data = quizData.map((quiz, index) => ({
    no: index + 1,
    title: quiz.title,
    totalQuestions: quiz.totalQuestions,
    actions: (
      <div>
        <button onClick={() => handleEdit(quiz)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(quiz)}>Hapus</button>
        <button
          className="edit-detail"
          onClick={() => navigate(`/admin/setting_quiz/edit?id=${quiz.id}`)} // Arahkan ke halaman edit detail
        >
          Edit Konten
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["title"];

  const [formQuiz, setFormQuiz] = useState({
    title: "",
    totalQuestions: "", 
  });

  useEffect(() => {
    if (editingQuiz) {
      setFormQuiz(editingQuiz);
    } else {
      setFormQuiz({
        title: "",
        totalQuestions: "",
      });
    }
  }, [editingQuiz]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormQuiz({ ...formQuiz, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formQuiz.title && formQuiz.totalQuestions) {
      if (editingQuiz) {
        handleUpdate(formQuiz);
        alert(`Kuis "${formQuiz.title}" telah diperbarui.`);
      } else {
        handleAdd(formQuiz);
        alert(`Kuis "${formQuiz.title}" telah ditambahkan.`);
      }
      setEditingQuiz(null);
      setFormQuiz({
        title: "",
        totalQuestions: "",
      });
    } else {
      alert("Semua kolom harus diisi!");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Manajemen Kuis</h2>

        <form onSubmit={handleFormSubmit} className="admin-form">
          <input type="text" name="title" value={formQuiz.title} onChange={handleFormChange} placeholder="Judul Kuis" required />
          <input type="number" name="totalQuestions" value={formQuiz.totalQuestions} onChange={handleFormChange} placeholder="Jumlah Soal" required />
          <button type="submit" className="submit">
            {editingQuiz ? "Perbarui Kuis" : "Tambah Kuis"}
          </button>
          {editingQuiz && (
            <button type="button" onClick={() => setEditingQuiz(null)} className="cancel">
              Batalkan Edit
            </button>
          )}
        </form>

        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} />
      </div>
    </div>
  );
};

export default Admin_SetQuiz;