import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorText from "../../components/EditorText/EditorText";
import axios from "axios";
import "katex/dist/katex.min.css";

const AdminEditContent = () => {
  const { type, slug } = useParams(); // Mengambil parameter type dan slug dari URL
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Ambil token jika dibutuhkan
        const response = await axios.get(
          `https://divine-purpose-production.up.railway.app/api/tutorial/${type}/${slug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status && response.data.getATutData) {
          const tutorial = response.data.getATutData;
          setPost(tutorial);
          setContent(tutorial.content); // Isi editor dengan konten awal
        } else {
          setError("Konten tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    if (type && slug) {
      fetchPostData();
    } else {
      setError("Parameter type atau slug tidak ditemukan.");
      setLoading(false);
    }
  }, [type, slug]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSaveChanges = async () => {
    if (post) {
      const updatedData = {
        ...post,
        content,
      };
  
      try {
        const token = localStorage.getItem("authToken");
        await axios.put(
          `https://divine-purpose-production.up.railway.app/api/tutorial/${post._id}`, // Ganti slug/type dengan post._id
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Perubahan telah disimpan!");
        navigate("/admin/setting_content/list"); // Kembali ke halaman daftar konten
      } catch (err) {
        console.error("Error saving content:", err);
        alert("Terjadi kesalahan saat menyimpan perubahan.");
      }
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pages-container">
      <div className="lms-container">
        <h2 className="section-title">Edit Konten: {post?.title || "Tanpa Judul"}</h2>
        <EditorText content={content} onContentChange={handleContentChange} />
        <button onClick={handleSaveChanges} className="submit-button">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default AdminEditContent;
