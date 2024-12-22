import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './pages/HomePage/HomePage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFound from './pages/NotFound/404';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import AdminPage from './pages/AdminPage/AdminPage';
import Admin_SetStudent from './pages/AdminPage/Admin_SetStudent';
import Admin_SetContent from './pages/AdminPage/Admin_SetContent';
import Admin_DaftarContent from './pages/AdminPage/Admin_DaftarContent';
import AdminEditContent from './pages/AdminPage/Admin_EditContent';
import Admin_SetQuiz from './pages/AdminPage/Admin_SetQuiz';
import Admin_DaftarQuiz from './pages/AdminPage/Admin_DaftarQuiz';
import Admin_EditQuiz from './pages/AdminPage/Admin_EditQuiz';
import StudentPage from './pages/StudentPage/StudentPage';
import StudentContent from './pages/StudentPage/StudentContent';
import Student_ViewContent from './pages/StudentPage/Student_ViewContent';
import StudentQuiz from './pages/StudentPage/StudentQuiz';
import Student_ViewQuiz from './pages/StudentPage/Student_ViewQuiz';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton/TopButton';
import Preloader from './components/Preloader/Preloader';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedRole = localStorage.getItem('userRole');

    if (storedToken) {
      setIsLogin(true);
      setUserRole(storedRole);
    }
    setIsLoading(false);
  }, []);

  if (loading) {
    return <Preloader/>; // Show loading while checking login state
  }

  const onLogin = (role) => {
    setIsLogin(true);
    setUserRole(role);
  };

  const onLogout = () => {
    setIsLogin(false);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsLogin(false);
    setUserRole(null);
    navigate('/');
  };

  // PrivateRoute untuk melindungi rute agar tidak bisa mengakses langsung
  const PrivateRoute = ({ children, requiredRole }) => {
    if (!isLogin) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && (userRole !== requiredRole && userRole !== 'admin')) {
      return <Navigate to="/not-found" />;
    }
  
    return children;
  };
  return (
    <div className="app-container">
        <Navbar isLogin={isLogin} role={userRole} onLogout={onLogout} />
        <Routes>
          {/* Rute Utama */}
          <Route path="/" element={<><Home /><TopButton /><Footer /></>} />
          <Route path="/tentang-kami" element={<><AboutPage /><TopButton /><Footer /></>} />
          <Route path="/hubungi-kami" element={<><ContactPage /><TopButton /><Footer /></>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="*" element={<NotFound />} />

          {/* Rute Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_student"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_SetStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_content"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_SetContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_content/list"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_DaftarContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_content/edit"
            element={
              <PrivateRoute requiredRole="admin">
                <AdminEditContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_quiz"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_SetQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_quiz/list"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_DaftarQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_quiz/edit"
            element={
              <PrivateRoute requiredRole="admin">
                <Admin_EditQuiz />
              </PrivateRoute>
            }
          />
          {/* Rute Student */}
          <Route
            path="/student"
            element={
              <PrivateRoute requiredRole="user">
                <StudentPage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/student/content"
            element={
              <PrivateRoute requiredRole="user">
                <StudentContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/content/:type/:slug"
            element={
              <PrivateRoute requiredRole="user">
                <Student_ViewContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/quiz"
            element={
              <PrivateRoute requiredRole="user">
                <StudentQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/quiz/:quizId"
            element={
              <PrivateRoute requiredRole="user">
                <Student_ViewQuiz />
              </PrivateRoute>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
