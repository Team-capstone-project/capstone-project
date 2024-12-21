import React, { useState, useEffect } from "react";
import { quizData as initialQuizData } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_SetQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(initialQuizData);
  const [formTitle, setFormTitle] = useState("");

  // Simulasi loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk menambah kuis baru
  const handleAdd = () => {
    if (formTitle.trim()) {
      setQuizData([...quizData, { title: formTitle, questions: [] }]);
      alert(`Kuis "${formTitle}" telah ditambahkan.`);
      setFormTitle("");
    } else {
      alert("Judul kuis tidak boleh kosong!");
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Tambah Kuis</h2>

        {/* Form untuk menambah kuis */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="admin-form"
        >
          <input
            type="text"
            name="title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Judul Kuis"
            required
          />
          <button type="submit" className="submit">
            Tambah Kuis
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin_SetQuiz;