import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { quizData } from "../../assets/data/data.json";

const Student_ViewQuiz = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const selectedQuiz = quizData.find((quiz) => quiz.title === title);

  if (!selectedQuiz) {
    return <h2 className="quiz-not-found">Kuis tidak ditemukan</h2>;
  }

  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedQuestions, setMarkedQuestions] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(selectedQuiz.questions.length * 2 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers({ ...answers, [questionIndex]: selectedOption });
  };

  const handleMarkQuestion = (questionIndex) => {
    setMarkedQuestions((prev) => ({
      ...prev,
      [questionIndex]: !prev[questionIndex],
    }));
  };

  // Fungsi untuk membatalkan jawaban yang telah dipilih
  const handleCancelAnswer = (questionIndex) => {
    const updatedAnswers = { ...answers };
    delete updatedAnswers[questionIndex]; // Menghapus jawaban yang telah dipilih
    setAnswers(updatedAnswers);
  };

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

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const navigateQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const getQuestionBoxClass = (index) => {
    if (index === currentQuestionIndex) return "question-box active";
    if (markedQuestions[index]) return "question-box marked";
    if (!answers[index]) return "question-box unanswered";
    return "question-box answered";
  };

  // Cek jika seluruh pertanyaan telah dijawab dan tidak ada "ragu-ragu"
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