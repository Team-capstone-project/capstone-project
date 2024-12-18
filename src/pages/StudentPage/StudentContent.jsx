import React, { useState, useEffect } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import Preloader from '../../components/Preloader/Preloader';

const StudentContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Membersihkan timer saat komponen dilepas
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Daftar Konten Materi</h2>
        <PostCard />
      </div>
    </div>
  );
};

export default StudentContent;