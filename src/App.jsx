import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import generateToken from './utils/generateToken';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setIsLoading] = useState(true);

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
    return <h1>Loading...</h1>;
  }

  const onLogin = (role) => {
    setIsLoading(true);
    setUserRole(role);
    localStorage.setItem('authToken', 'your-token-here');
    localStorage.setItem('userRole', role);
  };

  const onLogout = () => {
    setIsLogin(false);
    setUserRole(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
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
      <Router>
        <Routes>
          {/* Rute Utama */}
          <Route path="/" element={<><Navbar /><Home /><TopButton /><Footer /></>} />
          <Route path="/tentang-kami" element={<><Navbar /><AboutPage /><TopButton /><Footer /></>} />
          <Route path="/hubungi-kami" element={<><Navbar /><ContactPage /><TopButton /><Footer /></>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
          <Route path="*" element={<NotFound />} />

          {/* Rute Admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_student"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <Admin_SetStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_content"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <Admin_SetContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_content/edit"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <AdminEditContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_quiz"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <Admin_SetQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/setting_quiz/edit"
            element={
              <PrivateRoute requiredRole="admin">
                <Navbar role="admin" />
                <AdminEditQuiz />
              </PrivateRoute>
            }
          />

          {/* Rute Student */}
          <Route
            path="/student"
            element={
              <PrivateRoute requiredRole="user">
                <Navbar role="user" />
                <StudentPage />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/student/content"
            element={
              <PrivateRoute requiredRole="user">
                <Navbar role="user" />
                <StudentContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/content/view"
            element={
              <PrivateRoute requiredRole="user">
                <Navbar role="user" />
                <Student_ViewContent />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/quiz"
            element={
              <PrivateRoute requiredRole="user">
                <Navbar role="user" />
                <StudentQuiz />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
