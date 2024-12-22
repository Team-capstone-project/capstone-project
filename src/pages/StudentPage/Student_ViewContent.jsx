import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Student.css';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const StudentViewContent = () => {
  const { type, slug } = useParams(); // Mengambil parameter type dan slug dari URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(
          `https://divine-purpose-production.up.railway.app/api/tutorial/${type}/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status && response.data.getATutData) {
          setPost(response.data.getATutData); // Set data tutorial ke state
        } else {
          setError('Tutorial tidak ditemukan.');
        }
      } catch (err) {
        setError('Error fetching tutorial!');
      } finally {
        setLoading(false);
      }
    };

    if (type && slug) {
      fetchPostData();
    } else {
      setError('ID tutorial tidak ditemukan.');
      setLoading(false);
    }
  }, [type, slug]); // Menggunakan type dan slug sebagai dependency untuk efek

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <p className="no-content">Materi tidak ditemukan.</p>;
  }

  // Fungsi untuk merender konten dengan LaTeX dan HTML
  const renderContent = (content) => {
    const parts = content.split(/(\$.*?\$)/g); // Memisahkan LaTeX dari teks lainnya
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>; // Render LaTeX
      } else {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: part }} // Render HTML dalam konten
          />
        );
      }
    });
  };

  return (
    <div className="pages-container">
      <div className="lms-container">
        <div className="view-content">
          <div className="article-header">
            <h1 className="article-title">{post.title}</h1>
            <p className="article-meta">
              {post.tutorialCategory} | {post.level} | {post.schoolType}
            </p>
          </div>
          <div className="article-content">
            {post.image && (
              <img
                src={`https://divine-purpose-production.up.railway.app${post.image}`}
                alt={post.title}
              />
            )}
            {/* Render konten dengan penanganan LaTeX dan HTML */}
            <div>{renderContent(post.content)}</div>
          </div>
          <div className="article-footer">
            <button
              className="back-button"
              onClick={() => navigate('/student/content')}
            >
              Kembali ke Daftar Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewContent;
