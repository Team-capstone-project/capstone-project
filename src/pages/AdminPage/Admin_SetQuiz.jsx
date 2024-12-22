import React, { useState } from "react";
import "./Admin.css";
import axios from "axios";

const Admin_SetQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    category: '',
    level: '',
    schoolType: '',
    questions: [
      {
        question: '',
        options: { a: '', b: '', c: '', d: '' },
        correctAnswer: ''
      }
    ]
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value
    });
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const handleOptionChange = (questionIndex, option, e) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].options[option] = e.target.value;
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { question: '', options: { a: '', b: '', c: '', d: '' }, correctAnswer: '' }
      ]
    });
  };

  const removeLastQuestion = () => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.slice(0, quizData.questions.length - 1)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert('Token tidak ditemukan, Anda harus login terlebih dahulu.');
      return;
    }

    for (let i = 0; i < quizData.questions.length; i++) {
      if (!quizData.questions[i].correctAnswer) {
        alert(`Pertanyaan ke-${i + 1} tidak memiliki jawaban yang benar.`);
        return;
      }
    }

    try {
      await axios.post(
        'https://divine-purpose-production.up.railway.app/api/quiz/create',
        quizData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setQuizData({
        title: '',
        category: '',
        level: '',
        schoolType: '',
        questions: [
          {
            question: '',
            options: { a: '', b: '', c: '', d: '' },
            correctAnswer: ''
          }
        ]
      });

      alert('Quiz berhasil dibuat!');
    } catch (error) {
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Terjadi kesalahan saat membuat quiz.'}`);
      } else {
        alert('Terjadi kesalahan saat membuat quiz.');
      }
    }
  };

  return (
    <div className="pages-container">
      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label>Judul Quiz</label>
          <input
            type="text"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Mata Pelajaran</label>
          <input
            type="text"
            name="category"
            value={quizData.category}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Kelas</label>
          <input
            type="text"
            name="level"
            value={quizData.level}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Jenjang</label>
          <input
            type="text"
            name="schoolType"
            value={quizData.schoolType}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <h3>Pertanyaan Dan Jawaban</h3>
        {quizData.questions.map((question, index) => (
          <div key={index} className="question-container">
            <div className="form-group">
              <label>Pertanyaan {index + 1}</label>
              <input
                type="text"
                name="question"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-input"
              />
            </div>
            {['a', 'b', 'c', 'd'].map(option => (
              <div key={option} className="form-group">
                <label>Opsi {option.toUpperCase()}</label>
                <input
                  type="text"
                  value={question.options[option]}
                  onChange={(e) => handleOptionChange(index, option, e)}
                  required
                  className="form-input"
                />
              </div>
            ))}
            <div className="form-group">
              <label>Jawaban Benar</label>
              <select
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleQuestionChange(index, e)}
                required
                className="form-select"
              >
                <option value="">Select</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="add-question-btn">Add Question</button>
        
        <button
          type="button"
          onClick={removeLastQuestion}
          className="remove-question-btn"
        >
          &times;
        </button>
        
        <button type="submit" className="submit-btn">Create Quiz</button>
      </form>
    </div>
  );
};

export default Admin_SetQuiz;
