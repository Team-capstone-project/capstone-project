import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import ContactPage from './pages/ContactPage/ContactPage';
import AboutPage from './pages/AboutPage/AboutPage';
import NotFound from './pages/NotFound/404';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import TopButton from './components/TopButton/TopButton';

function App() {
  return (
    <div className='app-container'>
    <Router>
      <Routes>
        <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <TopButton />
              <Footer />
            </>
          } />
        <Route path="/tentang-kami" element={
            <>
              <Navbar />
              <AboutPage />
              <TopButton />
              <Footer />
            </>
          } />
        <Route path="/hubungi-kami" element={
            <>
              <Navbar />
              <ContactPage />
              <TopButton />
              <Footer />
            </>
          } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;