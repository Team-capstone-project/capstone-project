import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Student.css';

const StudentContent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tutorials, setTutorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian saat ini
  const [processedQuery, setProcessedQuery] = useState(""); // Query yang digunakan untuk filtering
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false); // Animasi tombol pencarian
  const [isSearching, setIsSearching] = useState(false); // Mode pencarian

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://divine-purpose-production.up.railway.app/api/tutorial",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

  const handleSearch = () => {
    setSearchLoading(true); // Set tombol menjadi loading
    setIsSearching(true); // Masuk mode pencarian
    setTimeout(() => {
      setSearchLoading(false); // Hilangkan animasi loading
      setIsSearching(false);
      setProcessedQuery(searchQuery);
    }, 3000);
  };

  const filteredTutorials = tutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(processedQuery.toLowerCase())
  );

  const handleViewDetail = (tutorialCategorySlug, slug) => {
    navigate(`/student/content/${tutorialCategorySlug}/${slug}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Materi Pembelajaran</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Cari materi pembelajaran"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button
            className={`search-button ${searchLoading ? "loading" : ""}`}
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? "Mencari..." : "Cari"}
          </button>
        </div>
        <div className="view-content">
          {isSearching ? (
            <p>Mencari materi pembelajaran...</p>
          ) : filteredTutorials.length > 0 ? (
            filteredTutorials.map((tutorial) => (
              <div key={tutorial._id} className="tutorial-item">
                <img
                  src={`https://divine-purpose-production.up.railway.app${tutorial.image ? tutorial.image : ""}`}
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
            ))
          ) : (
            <p className="no-content">Materi pembelajaran tidak tersedia</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentContent;
