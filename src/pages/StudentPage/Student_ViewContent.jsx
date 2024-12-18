import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataContent } from '../../assets/data/data.json';
import './Student.css';

const StudentViewContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil parameter dari query string
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    const postId = getQueryParam('id');
    if (postId) {
      const foundPost = dataContent.find((item) => item.id === parseInt(postId, 10));
      setPost(foundPost || null); // Jika tidak ditemukan, set ke null
    }
    setLoading(false);
  }, [location.search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p className="no-content">Materi tidak ditemukan.</p>;
  }

  return (
    <div className="view-container">
      <div className="article-header">
        <h1 className="article-title">{post.title}</h1>
        <p className="article-meta">
          {post.date} | {post.gradeLevel}
        </p>
      </div>
      <div className="article-content">
        {post.image && <img src={post.image} alt={post.title} />}
        <p>{post.description}</p>
        <p>{post.content}</p>
      </div>
      <div className="article-footer">
        <button className="back-button" onClick={() => navigate('/student/content')}>
          Kembali ke Daftar Materi
        </button>
      </div>
    </div>
  );
};

export default StudentViewContent;