import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import Preloader from "../../components/Preloader/Preloader";
import Alert from "../../components/Alert/Alert";
import { quizData } from "../../assets/data/data.json";
import { useNavigate } from "react-router-dom";

const StudentQuiz = () => {
  const navigate = useNavigate();
  const quizHeaders = ["No", "Topik", "Total Pertanyaan", "Aksi"];

  const [alert, setAlert] = useState({
    message: "",
    buttons: [],
    visible: false,
  });
  const [loading, setLoading] = useState(true);

  // Simulasi loading saat pertama kali halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Menambahkan kolom "Aksi" dengan tombol Mulai untuk setiap kuis
  const quizDataWithStartButton = quizData.map((quiz, index) => ({
    No: index + 1,
    Topik: quiz.title,
    "Total Pertanyaan": quiz.questions.length,
    Aksi: (
      <button
        onClick={() =>
          setAlert({
            message: "Apakah Anda ingin memulai kuis ini?",
            buttons: [
              {
                label: "Ya",
                onClick: () => navigate(`/student/quiz/${quiz.title}`),
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
  }));

  if (loading) {
    return <Preloader />;
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
          <p>Tombol "Submit Jawaban" hanya bisa di akses jika seluruh pertanyaan telah terjawab dan tidak ada pertanyaan yang ragu-ragu</p>
        </div>
        <Table headers={quizHeaders} data={quizDataWithStartButton} />
      </div>
      {alert.visible && <Alert message={alert.message} buttons={alert.buttons} />}
    </div>
  );
};

export default StudentQuiz;