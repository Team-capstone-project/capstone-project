import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dataContent as initialDataContent } from "../../assets/data/data.json";
import EditorText from '../../components/EditorText/EditorText';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const AdminEditContent = () => {
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
    navigate('/admin/setting_content'); // Mengarahkan kembali ke halaman pengaturan
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
        <EditorText content={currentItem.content} onContentChange={handleContentChange} />
        <button onClick={handleSaveChanges} className="admin-save-button">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default AdminEditContent;