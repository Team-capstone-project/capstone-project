import React, { useState } from "react";
import axios from "axios";
import "./Admin.css";
import Alert from "../../components/Alert/Alert";

const Admin_SetContent = () => {
  const [formContent, setFormContent] = useState({
    title: "",
    tutorialCategory: "",
    topicName: "",
    level: "",
    schoolType: "",
    content: "",
    image: "",
    keywords: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertButtons, setAlertButton] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setFormContent({ ...formContent, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setFormContent({ ...formContent, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const token = localStorage.getItem("authToken");
      console.log(token)
  
      // Menambahkan form content ke FormData
      Object.keys(formContent).forEach(key => {
        formData.append(key, formContent[key]);
      });
  
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
      }
  
      console.log("Before API call");

const result = await axios.post(
  "https://capstone-project-be-production-a056.up.railway.app/api/tutorial",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }
);

console.log("After API call");
console.log("Result:", result);
      
  
      // Menampilkan pesan sukses
      setAlertMessage("Tutorial Created successfully!");
      setAlertButton([
        {
          label: "Close",
          onClick: () => setAlertMessage(""),
          style: { backgroundColor: "green", color: "white" },
        },
      ]);
    } catch (error) {
      if (error.response) {
        // Menampilkan pesan kesalahan dari server
        setAlertMessage(error.response.data.message || "Error creating tutorial!");
        setAlertButton([
          {
            label: "Close",
            onClick: () => setAlertMessage(""),
            style: { backgroundColor: "red", color: "white" },
          },
        ]);
      } else if (error.request) {
        // Jika ada masalah dengan permintaan (misalnya koneksi jaringan terputus)
        setAlertMessage("Terjadi masalah dengan koneksi server. Silakan coba lagi.");
        setAlertButton([
          {
            label: "Close",
            onClick: () => setAlertMessage(""),
            style: { backgroundColor: "red", color: "white" },
          },
        ]);
      } else {
        // Jika kesalahan tidak teridentifikasi
        console.error("Kesalahan tidak teridentifikasi:", error.message);
        setAlertMessage("Terjadi masalah saat posting tutorial. Silakan coba lagi.");
        setAlertButton([
          {
            label: "Close",
            onClick: () => setAlertMessage(""),
            style: { backgroundColor: "red", color: "white" },
          },
        ]);
      }
    }
  };
  

  return (
    <div className="pages-container">
      <div className="lms-container">
     {/* Tampilkan Alert jika ada pesan */}
     {alertMessage && <Alert message={alertMessage} buttons={alertButtons} />}

<form onSubmit={handleSubmit} className="tutorial-form">
  <input
    name="title"
    placeholder="Judul Materi"
    value={formContent.title}
    onChange={handleChange}
    className="form-input"
    required
  />

  <input
    name="tutorialCategory"
    placeholder="Mata Pelajaran"
    value={formContent.tutorialCategory}
    onChange={handleChange}
    className="form-input"
    required
  />
  <input
    name="topicName"
    placeholder="Bab Materi"
    value={formContent.topicName}
    onChange={handleChange}
    className="form-input"
    required
  />
  <input
    name="level"
    placeholder="Kelas (Contoh: 7)"
    value={formContent.level}
    onChange={handleChange}
    className="form-input"
    required
  />
  <input
    name="schoolType"
    placeholder="SMA atau SMP"
    value={formContent.schoolType}
    onChange={handleChange}
    className="form-input"
    required
  />
  <textarea
    name="content"
    placeholder="Content"
    value={formContent.content}
    onChange={handleChange}
    className="form-textarea"
    required
  />
  
  {/* Input untuk gambar */}
  <input
    type="file"
    name="image"
    placeholder="Choose Image"
    onChange={handleChange}
    className="form-input-file"
  />
  
  {/* Preview gambar jika ada */}
  {imagePreview && (
    <div className="image-preview-container">
      <img src={imagePreview} alt="Preview" className="image-preview" />
    </div>
  )}
  
  <input
    name="keywords"
    placeholder="kata kunci dipisahkan dengan koma (Matematika, Kelas 7)"
    value={formContent.keywords}
    onChange={(e) => setFormContent({ ...formContent, keywords: e.target.value.split(",") })}
    className="form-input"
    required
  />
  <button type="submit" className="submit-button">Posting Materi</button>
</form>
</div>
</div>
);
};

export default Admin_SetContent;