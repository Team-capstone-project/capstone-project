import React from 'react'
import TableWithSearch from "../../components/Table/TableWithSearch";
import { quizData as initialQuizData } from "../../assets/data/data.json";
import Preloader from "../../components/Preloader/Preloader";
import "./Admin.css";

const Admin_EditQuiz = () => {
    const [loading, setLoading] = useState(true);
    const [quizData, setQuizData] = useState(initialQuizData);
    const [editingQuiz, setEditingQuiz] = useState(null);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);
  
    const handleEdit = (quiz) => {
      setEditingQuiz(quiz);
    };
  
    const handleDelete = (quiz) => {
      if (window.confirm(`Apakah Anda yakin ingin menghapus kuis? "${quiz.title}"?`)) {
        setQuizData(quizData.filter((item) => item.title !== quiz.title));
        alert(`Kuis "${quiz.title}" telah dihapus.`);
      }
    };
  
    const handleAdd = (newQuiz) => {
      setQuizData([...quizData, newQuiz]);
    };
  
    const handleUpdate = (updatedQuiz) => {
      const updatedData = quizData.map((quiz) =>
        quiz.title === updatedQuiz.title ? updatedQuiz : quiz
      );
      setQuizData(updatedData);
    };
  
    const headers = ["No", "Judul", "Jumlah Soal", "Aksi"];
    const data = quizData.map((quiz, index) => ({
      no: index + 1,
      title: quiz.title,
      totalQuestions: quiz.questions.length,
      actions: (
        <div>
          <button onClick={() => handleEdit(quiz)}>Edit</button>
          <button className="delete" onClick={() => handleDelete(quiz)}>Hapus</button>
        </div>
      ),
    }));
  
    const searchableColumns = ["title"];
  
    const [formQuiz, setFormQuiz] = useState({
      title: "",
      questions: [],
    });
  
    useEffect(() => {
      if (editingQuiz) {
        setFormQuiz(editingQuiz);
      } else {
        setFormQuiz({
          title: "",
          questions: [],
        });
      }
    }, [editingQuiz]);
  
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormQuiz({ ...formQuiz, [name]: value });
    };
  
    const handleAddQuestion = () => {
      setFormQuiz({
        ...formQuiz,
        questions: [
          ...formQuiz.questions,
          { question: "", options: { a: "", b: "", c: "", d: "" }, correctAnswer: "" },
        ],
      });
    };
  
    const handleQuestionChange = (index, field, value) => {
      const updatedQuestions = formQuiz.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      );
      setFormQuiz({ ...formQuiz, questions: updatedQuestions });
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      if (formQuiz.title && formQuiz.questions.length > 0) {
        if (editingQuiz) {
          handleUpdate(formQuiz);
          alert(`Kuis "${formQuiz.title}" telah diperbarui.`);
        } else {
          handleAdd(formQuiz);
          alert(`Kuis "${formQuiz.title}" telah ditambahkan.`);
        }
        setEditingQuiz(null);
        setFormQuiz({
          title: "",
          questions: [],
        });
      } else {
        alert("Judul dan minimal 1 soal harus diisi!");
      }
    };
  
    if (loading) {
      return <Preloader />;
    }
  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Manajemen Kuis</h2>

        <form onSubmit={handleFormSubmit} className="admin-form">
          <input type="text" name="title" value={formQuiz.title} onChange={handleFormChange} placeholder="Judul Kuis" required />
          {formQuiz.title && ( // Hanya tampilkan tombol Tambah Soal jika judul kuis telah diisi
            <button type="button" onClick={handleAddQuestion}>
              Tambah Soal
            </button>
          )}
          {formQuiz.questions.map((question, index) => (
            <div key={index} className="question-form">
              <textarea value={question.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} placeholder={`Soal ${index + 1}`} required />
              <div className="options-container">
                {["a", "b", "c", "d"].map((option) => (
                  <input key={option} type="text" placeholder={`Opsi ${option.toUpperCase()}`} value={question.options[option]} onChange={(e) => handleQuestionChange(index, "options", {
                        ...question.options,
                        [option]: e.target.value,
                      })
                    }
                    required />
                ))}
              </div>
              <input type="text" value={question.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)} placeholder="Jawaban Benar (a/b/c/d)" required />
            </div>
          ))}
          <button type="submit" className="submit">
            {editingQuiz ? "Perbarui Kuis" : "Tambah Kuis"}
          </button>
          {editingQuiz && (
            <button type="button" onClick={() => setEditingQuiz(null)} className="cancel">
              Batalkan Edit
            </button>
          )}
        </form>

        <TableWithSearch headers={headers} data={data} searchableColumns={searchableColumns} />
      </div>
    </div>
  );
}

export default Admin_EditQuiz