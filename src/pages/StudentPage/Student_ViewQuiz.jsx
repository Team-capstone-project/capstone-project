import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Student.css';

const Student_ViewQuiz = () => {
  const { quizId } = useParams(); // Mengambil parameter quizId dari URL
  const navigate = useNavigate();

  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mengambil data kuis berdasarkan ID dari URL
  useEffect(() => {
    if (!quizId) {
      console.error("Quiz ID parameter is missing.");
      return;
    }

    const fetchQuizData = async () => {
      try {
        const response = await axios.get(
          `https://divine-purpose-production.up.railway.app/api/quiz/${quizId}` // API endpoint berdasarkan quizId
        );
        
        // Debugging: Cek respons data
        console.log("Fetched Quiz Data:", response.data);

        // Pastikan respons data berisi kuis
        if (response.data.status && response.data.data) {
          setSelectedQuiz(response.data.data);  // Ambil kuis berdasarkan ID
          setTimeLeft(response.data.data.questions.length * 2 * 60); // 2 menit per soal
        } else {
          console.error("No quiz found with the specified ID.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error.response || error);
      }
    };

    fetchQuizData();
  }, [quizId]); // Pastikan hanya quizId yang menjadi dependensi

  // Pastikan selectedQuiz sudah ada dan memiliki questions sebelum menampilkan konten
  if (!selectedQuiz || !selectedQuiz.questions) {
    return <h2 className="quiz-not-found">Kuis tidak ditemukan atau data kuis tidak valid</h2>;
  }

  // Fungsi untuk mengubah jawaban
  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  // Fungsi untuk menandai soal sebagai ragu-ragu
  const handleMarkQuestion = (questionIndex) => {
    setMarkedQuestions((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  // Fungsi untuk membatalkan pilihan jawaban
  const handleCancelAnswer = (questionIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[questionIndex];
      return updatedAnswers;
    });
  };

  // Fungsi untuk submit kuis
  const handleSubmit = () => {
    let correctAnswers = 0;

    selectedQuiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers += 1;
      }
    });

    const calculatedScore = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);
    setScore(calculatedScore);
    setIsSubmitted(true);
  };


  // Fungsi format waktu
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Fungsi navigasi soal
  const navigateQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Fungsi untuk mendapatkan kelas setiap soal
  const getQuestionBoxClass = (index) => {
    if (index === currentQuestionIndex) return "question-box active";
    if (markedQuestions[index]) return "question-box marked";
    if (!answers[index]) return "question-box unanswered";
    return "question-box answered";
  };

  // Cek apakah semua soal sudah dijawab
  const isAllAnswered = selectedQuiz.questions.every((_, index) => answers[index] !== undefined);
  const isAnyMarked = Object.values(markedQuestions).includes(true);

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="view-quiz-container">
          {isSubmitted ? (
            <div className="quiz-result">
              <h2 className="quiz-title">Hasil Kuis: {selectedQuiz.title}</h2>
              <h3>Nilai Anda: {score}</h3>
              {score < 70 ? (
                <button className="submit-button" onClick={() => window.location.reload()}>
                  Coba Lagi
                </button>
              ) : (
                <button className="submit-button" onClick={() => navigate("/student/quiz")}>
                  Coba Kuis Lain
                </button>
              )}
            </div>
          ) : (
            <>
              <h2 className="quiz-title">{selectedQuiz.title}</h2>
              <div className="quiz-timer">
                <h4>Waktu Tersisa: {formatTime(timeLeft)}</h4>
              </div>
              <div className="quiz-navigation">
                {selectedQuiz.questions.map((_, index) => (
                  <button key={index} className={getQuestionBoxClass(index)} onClick={() => navigateQuestion(index)}>
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="quiz-question">
                <h3>
                  {currentQuestionIndex + 1}.{" "}
                  {selectedQuiz.questions[currentQuestionIndex].question}
                </h3>
                <ul>
                  {Object.entries(selectedQuiz.questions[currentQuestionIndex].options).map(
                    ([key, option]) => (
                      <li key={key}>
                        <label>
                          <input type="radio" name={`question-${currentQuestionIndex}`} value={key} checked={answers[currentQuestionIndex] === key} onChange={() => handleAnswerChange(currentQuestionIndex, key)} />
                          <strong>{key.toUpperCase()}:</strong> {option}
                        </label>
                      </li>
                    )
                  )}
                </ul>
                <div className="question-actions">
                  <button onClick={() => handleMarkQuestion(currentQuestionIndex)} className="mark-button">
                    {markedQuestions[currentQuestionIndex] ? "Hapus Ragu-ragu" : "Ragu-ragu"}
                  </button>
                  {answers[currentQuestionIndex] !== undefined && (
                    <button onClick={() => handleCancelAnswer(currentQuestionIndex)} className="cancel-button">
                      Batalkan Pilihan
                    </button>
                  )}
                </div>
              </div>
              <div className="navigation-buttons">
                {currentQuestionIndex === selectedQuiz.questions.length - 1 && (
                  <button onClick={handleSubmit} className="submit-button" disabled={!isAllAnswered || isAnyMarked}>
                    Submit Jawaban
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student_ViewQuiz;
