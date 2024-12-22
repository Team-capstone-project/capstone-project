import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

        if (response.data.status && Array.isArray(response.data.data)) {
          setTutorials(response.data.data);
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

  const handleViewDetail = (tutorialCategorySlug, slug) => {
    navigate(`/student/content/${tutorialCategorySlug}/${slug}`);
  };

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="view-content">
          {tutorials.map((tutorial) => {
            console.log(`https://divine-purpose-production.up.railway.app${tutorial.image}`);
            
            return (
              <div key={tutorial._id} className="tutorial-item">
                <img
                  src={`https://divine-purpose-production.up.railway.app${tutorial.image ? tutorial.image : ''}`}
                  alt={tutorial.title}
                  className="tutorial-image"
                />
                <div className="article-header">
                  <h1 className="article-title">{tutorial.title}</h1>
                  <p className="article-meta">
                    {tutorial.tutorialCategory} | {tutorial.level} | {tutorial.schoolType}
                  </p>
                </div>
                <button
                  className="view-detail-button"
                  onClick={() => handleViewDetail(tutorial.tutorialCategorySlug, tutorial.slug)}
                >
                  Lihat Detail
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentContent;
