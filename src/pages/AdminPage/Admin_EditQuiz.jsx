import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Admin.css";

const Admin_EditQuiz = () => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    schoolType: "",
    questions: [],
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!id) {
        console.error("ID tidak ditemukan dalam URL");
        return;
      }

      try {
        console.log("Fetching quiz data...");
        const response = await axios.get(
          `https://divine-purpose-production.up.railway.app/api/quiz/${id}`
        );
        console.log("Response Status:", response.status);
        if (response.status === 200 && response.data.status) {
          const quiz = response.data.data;
          setQuizData(quiz);
          setFormData({
            title: quiz.title,
            category: quiz.category,
            level: quiz.level,
            schoolType: quiz.schoolType,
            questions: quiz.questions || [],
          });
        } else {
          console.error("No quiz data found");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuizData();
    }
  }, [id]);

  const handleChange = (e, index, optionKey) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      if (name === "question") {
        updatedQuestions[index].question = value;
      } else if (name.startsWith("option")) {
        updatedQuestions[index].options[optionKey] = value;
      } else if (name === "correctAnswer") {
        updatedQuestions[index].correctAnswer = value;
      }
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pastikan data valid
    if (!id) {
      alert("ID kuis tidak ditemukan.");
      return;
    }

    if (!formData.title || formData.questions.length === 0) {
      alert("Judul dan jumlah soal tidak boleh kosong.");
      return;
    }

    console.log("Menyiapkan data untuk update:", formData);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://divine-purpose-production.up.railway.app/api/quiz/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert(`Kuis "${formData.title}" telah diperbarui.`);
        navigate("/admin/setting_quiz/list");
      } else {
        alert("Gagal memperbarui kuis.");
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("Terjadi kesalahan saat memperbarui kuis.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!quizData) {
    return <p>Kuis tidak ditemukan.</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Edit Kuis</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Judul Kuis</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Mata Pelajaran</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="level">Kelas</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="schoolType">Jenjang</label>
            <input
              type="text"
              id="schoolType"
              name="schoolType"
              value={formData.schoolType}
              onChange={(e) =>
                setFormData({ ...formData, schoolType: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="questions">Jumlah Soal</label>
            <input
              type="number"
              id="questions"
              name="questions"
              value={formData.questions.length}
              onChange={(e) => {
                const numQuestions = parseInt(e.target.value);
                setFormData((prevData) => {
                  const updatedQuestions = [...prevData.questions];
                  if (updatedQuestions.length < numQuestions) {
                    // Menambahkan soal baru jika jumlahnya bertambah
                    updatedQuestions.push({
                      question: "",
                      options: { a: "", b: "", c: "", d: "" },
                      correctAnswer: "",
                    });
                  } else {
                    // Menghapus soal jika jumlahnya berkurang
                    updatedQuestions.length = numQuestions;
                  }
                  return { ...prevData, questions: updatedQuestions };
                });
              }}
              min="0"
            />
          </div>

          {formData.questions.map((question, index) => (
            <div key={index} className="question-container">
              <div className="form-group">
                <label>Soal {index + 1}</label>
                <textarea
                  name="question"
                  value={question.question}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>

              {Object.keys(question.options).map((optionKey) => (
                <div key={optionKey} className="form-group">
                  <label>Jawaban {optionKey.toUpperCase()}</label>
                  <input
                    type="text"
                    name={`option-${optionKey}`}
                    value={question.options[optionKey]}
                    onChange={(e) => handleChange(e, index, optionKey)}
                  />
                </div>
              ))}

              <div className="form-group">
                <label>Jawaban Benar</label>
                <select
                  name="correctAnswer"
                  value={question.correctAnswer}
                  onChange={(e) => handleChange(e, index)}
                >
                  <option value="" disabled>
                    Pilih Jawaban Benar
                  </option>
                  {["a", "b", "c", "d"].map((optionKey) => (
                    <option key={optionKey} value={optionKey}>
                      {optionKey.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button type="submit" className="submit button">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin_EditQuiz;
