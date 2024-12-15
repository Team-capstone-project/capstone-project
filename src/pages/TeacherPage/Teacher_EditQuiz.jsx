import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { quizData as initialQuizData } from "../../assets/data/data.json";
import "./Teacher.css";

const TeacherEditQuiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [quiz, setQuiz] = useState(null);
  const [formQuestions, setFormQuestions] = useState([]);

  // Load quiz data based on query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const quizId = queryParams.get("id");

    const selectedQuiz = initialQuizData.find(
      (quiz) => quiz.id === parseInt(quizId)
    );

    if (selectedQuiz) {
      setQuiz(selectedQuiz);
      setFormQuestions(selectedQuiz.questions);
    } else {
      alert("Kuis tidak ditemukan!");
      navigate("/teacher/setting_quiz");
    }
  }, [location.search, navigate]);

  // Handle changes in question fields
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formQuestions];
    updatedQuestions[index][name] = value;
    setFormQuestions(updatedQuestions);
  };

  // Handle changes in answer fields
  const handleAnswerChange = (index, answerKey, e) => {
    const { value } = e.target;
    const updatedQuestions = [...formQuestions];
    updatedQuestions[index].answers[answerKey] = value;
    setFormQuestions(updatedQuestions);
  };

  // Handle changes in correct answer selection
  const handleCorrectAnswerChange = (index, e) => {
    const { value } = e.target;
    const updatedQuestions = [...formQuestions];
    updatedQuestions[index].correctAnswer = value;
    setFormQuestions(updatedQuestions);
  };

  // Add a new question
  const handleAddQuestion = () => {
    const newQuestion = {
      question: "",
      answers: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      correctAnswer: "A",
    };
    setFormQuestions([...formQuestions, newQuestion]);
  };

  // Submit the updated quiz
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedQuiz = { ...quiz, questions: formQuestions };

    alert(`Kuis "${quiz.title}" telah diperbarui.`);
    navigate("/teacher/setting_quiz");
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Edit Kuis: {quiz.title}</h2>

        <form onSubmit={handleFormSubmit} className="teacher-form">
          {formQuestions.map((question, index) => (
            <div key={index} className="question-block">
              <h3>Pertanyaan {index + 1}</h3>
              <input type="text" name="question" value={question.question} onChange={(e) => handleQuestionChange(index, e)} placeholder="Pertanyaan" required />

              {Object.keys(question.answers).map((answerKey) => (
                <div key={answerKey} className="answer-field">
                  <label>{answerKey}:</label>
                  <input type="text" value={question.answers[answerKey]} onChange={(e) => handleAnswerChange(index, answerKey, e)} placeholder={`Jawaban ${answerKey}`} required />
                </div>
              ))}

              <div className="correct-answer">
                <label>Jawaban yang benar:</label>
                <select value={question.correctAnswer} onChange={(e) => handleCorrectAnswerChange(index, e)} required>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>
          ))}

          <div className="form-actions">
            <button type="button" onClick={handleAddQuestion} className="add-question">
              Tambah Pertanyaan
            </button>
            <button type="submit" className="submit">
              Perbarui Kuis
            </button>
            <button type="button" onClick={() => navigate("/teacher/setting_quiz")} className="cancel">
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEditQuiz;