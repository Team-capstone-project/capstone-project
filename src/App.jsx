import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFound from './pages/NotFound/404';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import AdminPage from './pages/AdminPage/AdminPage';
import Admin_SetStudent from './pages/AdminPage/Admin_SetStudent';
import Admin_SetContent from './pages/AdminPage/Admin_SetContent';
import AdminEditContent from './pages/AdminPage/Admin_EditContent';
import Admin_SetQuiz from './pages/AdminPage/Admin_SetQuiz';
import AdminEditQuiz from './pages/AdminPage/Admin_EditQuiz';
import StudentPage from './pages/StudentPage/StudentPage';
import StudentContent from './pages/StudentPage/StudentContent';
import Student_ViewContent from './pages/StudentPage/Student_ViewContent';
import StudentQuiz from './pages/StudentPage/StudentQuiz';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton/TopButton';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          {/*Rute Utama*/}
          <Route path="/" element={<><Navbar /><Home /><TopButton /><Footer /></>} />
          <Route path="/tentang-kami" element={<><Navbar /><AboutPage /><TopButton /><Footer /></>} />
          <Route path="/hubungi-kami" element={<><Navbar /><ContactPage /><TopButton /><Footer /></>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />

          {/*Rute Admin*/}
          <Route path="/admin" element={<><Navbar role="admin" /><AdminPage /></>} />
          <Route path="/admin/setting_student" element={<><Navbar role="admin" /><Admin_SetStudent /></>} />
          <Route path="/admin/setting_content" element={<><Navbar role="admin" /><Admin_SetContent /></>} />
          <Route path="/admin/setting_content/edit" element={<><Navbar role="admin" /><AdminEditContent /></>} />
          <Route path="/admin/setting_quiz" element={<><Navbar role="admin" /><Admin_SetQuiz /></>} />
          <Route path="/admin/setting_quiz/edit" element={<><Navbar role="admin" /><AdminEditQuiz /></>} />

          {/*Rute Student*/}
          <Route path="/student" element={<><Navbar role="student" /><StudentPage /></>} />
          <Route path="/student/content" element={<><Navbar role="student" /><StudentContent /></>} />
          <Route path="/student/content/view" element={<><Navbar role="student" /><Student_ViewContent /></>} />
          <Route path="/student/quiz" element={<><Navbar role="student" /><StudentQuiz /></>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;