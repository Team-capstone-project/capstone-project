import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Preloader from "../../components/Preloader/Preloader";
import Alert from "../../components/Alert/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Student.css';

const StudentQuiz = () => {
  const navigate = useNavigate();
  const quizHeaders = ["No", "Topik", "Total Pertanyaan", "Aksi"];

  const [alert, setAlert] = useState({
    message: "",
    buttons: [],
    visible: false,
  });
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);

  // Mengambil data kuis dari API
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('https://divine-purpose-production.up.railway.app/api/quiz');
        console.log(response.data);

        if (response.data.status && Array.isArray(response.data.data)) {
          setQuizData(response.data.data);
        } else {
          setError("Data kuis tidak tersedia atau format tidak valid.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data", error);
        setError("Gagal memuat data kuis.");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  // Menambahkan kolom "Aksi" dengan tombol Mulai untuk setiap kuis
  const quizDataWithStartButton = Array.isArray(quizData) ? quizData.map((quiz, index) => ({
    No: index + 1,
    Topik: quiz.title,
    "Total Pertanyaan": quiz.questions ? quiz.questions.length : 0,
    Aksi: (
      <button
        onClick={() =>
          setAlert({
            message: "Apakah Anda ingin memulai kuis ini?",
            buttons: [
              {
                label: "Ya",
                // Gunakan quiz._id atau quiz.id untuk mengarahkan ke halaman kuis yang tepat
                onClick: () => navigate(`/student/quiz/${quiz._id}`), // Gantilah quiz._id dengan quiz.id jika perlu
              },
              {
                label: "Tidak",
                onClick: () => setAlert({ ...alert, visible: false }),
                style: { backgroundColor: "#dc3545" },
              },
            ],
            visible: true,
          })
        }
      >
        Mulai
      </button>
    ),
  })) : [];

  // Menampilkan loader saat data sedang dimuat
  if (loading) {
    return <Preloader />;
  }

  // Menampilkan error jika ada masalah saat mengambil data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Daftar Kuis</h2>
        <div className="quiz-instructions">
          <h3>Cara Pengerjaan Kuis:</h3>
          <ul>
            <li>Klik tombol "Mulai" pada kuis yang ingin Anda kerjakan.</li>
            <li>Pilih "Ya" untuk memulai kuis atau "Tidak" untuk membatalkan.</li>
            <li>Selesaikan semua pertanyaan yang tersedia dalam waktu yang ditentukan.</li>
            <li>Setelah selesai, klik "Submit Jawaban".</li>
            <li>Jawaban tersimpan otomatis jika waktu telah habis.</li>
          </ul>
          <p>Tombol "Submit Jawaban" hanya bisa diakses jika seluruh pertanyaan telah terjawab dan tidak ada pertanyaan yang ragu-ragu.</p>
        </div>
        <Table headers={quizHeaders} data={quizDataWithStartButton} />
      </div>
      {alert.visible && <Alert message={alert.message} buttons={alert.buttons} />}
    </div>
  );
};

export default StudentQuiz;
