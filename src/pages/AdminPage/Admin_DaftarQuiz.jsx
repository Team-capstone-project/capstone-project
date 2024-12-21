import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import { quizData as initialQuizData } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_DaftarQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(initialQuizData);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (quiz) => {
    navigate(`/admin/setting_quiz/edit?title=${quiz.title}`);
  };

  const handleDelete = (quiz) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kuis "${quiz.title}"?`)) {
      setQuizData(quizData.filter((item) => item.title !== quiz.title));
      alert(`Kuis "${quiz.title}" telah dihapus.`);
    }
  };

  const headers = ["No", "Judul", "Jumlah Soal", "Aksi"];
  const data = quizData.map((quiz, index) => ({
    no: index + 1,
    title: quiz.title,
    totalQuestions: quiz.questions.length,
    actions: (
      <div>
        <button onClick={() => handleEdit(quiz)}>Edit</button>
        <button className="delete" onClick={() => handleDelete(quiz)}>
          Hapus
        </button>
      </div>
    ),
  }));

  const searchableColumns = ["title"];

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Daftar Kuis</h2>
        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} />
      </div>
    </div>
  );
};

export default Admin_DaftarQuiz;
