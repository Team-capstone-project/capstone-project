import React, { useState, useEffect } from "react";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_SetQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState({
    title:'',
    category:'',
    level:'',
    schoolType:'',
    questions: [
      {
        question:'',
        options:{
          a:'',
          b:'',
          c:'',
          d:'',
        },
        corectAnswer:'',
      }
    ]
  });
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

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