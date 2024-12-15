import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataContent as initialDataContent } from "../../assets/data/data.json";

const TeacherEditContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Fungsi pembantu untuk mendapatkan parameter kueri
  const getQueryParam = (name) => {
    const params = new URLSearchParams(location.search);
    return params.get(name);
  };

  const [dataContent, setDataContent] = useState(initialDataContent);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const id = getQueryParam('id');
    if (id) {
      const itemToEdit = dataContent.find(item => item.id.toString() === id);
      setCurrentItem(itemToEdit);
    }
  }, [location.search, dataContent]);

  const handleContentChange = (newContent) => {
    if (currentItem) {
      const updatedData = dataContent.map(item =>
        item.id === currentItem.id ? { ...item, content: newContent } : item
      );
      setDataContent(updatedData);
      setCurrentItem({ ...currentItem, content: newContent });
    }
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", dataContent);
    navigate('/teacher/setting_content'); // Mengarahkan kembali ke halaman pengaturan
  };

  if (!currentItem) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Edit Konten Materi: {currentItem.title}</h2>
        <img src={currentItem.image} alt={currentItem.title} />
        <p>
          <strong>Subject:</strong> {currentItem.subject}
        </p>
        <p>
          <strong>Grade Level:</strong> {currentItem.gradeLevel}
        </p>
        <textarea value={currentItem.content} onChange={(e) => handleContentChange(e.target.value)} rows={5} className="teacher-edit-textarea" />
        <button onClick={handleSaveChanges} className="teacher-save-button">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default TeacherEditContent;