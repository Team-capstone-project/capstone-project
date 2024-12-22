import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TableWithSearch from "../../components/Table/TableWithSearch";
import Preloader from "../../components/Preloader/Preloader";
import axios from "axios";
import "./Admin.css";

const Admin_DaftarQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('https://divine-purpose-production.up.railway.app/api/quiz');
        if (response.data.status && Array.isArray(response.data.data)) {
          setQuizData(response.data.data);
        } else {
          alert("Data kuis tidak tersedia atau format tidak valid.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data", error);
        setLoading(false);
        alert("Gagal memuat data kuis.");
      }
    };

    fetchQuizData();
  }, []);

  const handleEdit = (quiz) => {
    navigate(`/admin/setting_quiz/edit?id=${quiz._id}`);
  };

  const handleDelete = async (quiz) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kuis "${quiz.title}"?`)) {
      try {
        const token = localStorage.getItem("authToken");
        await axios.delete(
          `https://divine-purpose-production.up.railway.app/api/quiz/${quiz._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizData(quizData.filter((item) => item._id !== quiz._id));
        alert(`Kuis "${quiz.title}" telah dihapus.`);
      } catch (error) {
        console.error("Error deleting quiz:", error);
        alert("Terjadi kesalahan saat menghapus kuis.");
      }
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
