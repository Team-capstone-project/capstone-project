import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import axios from 'axios';

const StudentContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://divine-purpose-production.up.railway.app/api/tutorial", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response.data); // Periksa apakah data adalah array
        if (response.data.status && Array.isArray(response.data.data)) {
          setTutorials(response.data.data); // Simpan array tutorial
        } else {
          setError("Materi tidak ditemukan.");
        }
        setLoading(false);
      } catch (error) {
        setError("Error fetching tutorials!");
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (tutorials.length === 0) {
    return <p className="no-content">Materi tidak ditemukan.</p>;
  }

  // Fungsi untuk merender konten dengan LaTeX dan HTML
  const renderContent = (content) => {
    const parts = content.split(/(\$.*?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
      } else {
        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
      }
    });
  };

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="view-content">
          {tutorials.map((tutorial) => (
            <div key={tutorial._id} className="tutorial-item">
              <div className="article-header">
                <h1 className="article-title">{tutorial.title}</h1>
                <p className="article-meta">
                  {tutorial.tutorialCategory} | {tutorial.level}
                </p>
              </div>
              <div className="article-content">
                <h2>{tutorial.topicName}</h2>
                <p>{tutorial.content}</p>
                <img src={`https://divine-purpose-production.up.railway.app/${tutorial.image}`} alt={tutorial.title} />
                <p>{tutorial.keywords.join(', ')}</p>
                <div>{renderContent(tutorial.content)}</div>
              </div>
              <div className="article-footer">
                <button className="back-button" onClick={() => navigate('/student/content')}>
                  Kembali ke Daftar Materi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentContent;
