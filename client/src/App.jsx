import React, { useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Quiz from './components/Quiz';
import CreateQuiz from './quizzes/CreateQuiz'; 
import AdminDashboard from './dashboards/AdminDashboard'; 
import UserDashboard from './dashboards/UserDashboard';
import AccessDenied from './auth/AccessDenied';
import QuizPage from './quizzes/QuizPage';
import QuizEditPage from './quizzes/QuizEditPage';
import TakeQuizPage from './dashboards/TakeQuizPage';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Curtain from './components/Curtain';
import NotFound from './components/NotFound'; // Import NotFound component

function App() {
  const [showCurtain, setShowCurtain] = useState(true);
  const location = useLocation();

  const handleCurtainComplete = () => {
    setShowCurtain(false);
  };

  return (
    <ParallaxProvider>
      {location.pathname === '/' && showCurtain && (
        <Curtain onCurtainComplete={handleCurtainComplete} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute roleRequired="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user/dashboard/quiz/:id"
              element={
                <ProtectedRoute roleRequired="user">
                  <TakeQuizPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute roleRequired="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/create-quiz"
              element={
                <ProtectedRoute roleRequired="admin">
                  <CreateQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard/quiz/:id"
              element={
                <ProtectedRoute roleRequired="admin">
                  <QuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard/quiz/:id/edit"
              element={
                <ProtectedRoute roleRequired="admin">
                  <QuizEditPage />
                </ProtectedRoute>
              }
            />

            <Route path="/access" element={<AccessDenied />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            
            {/* Wildcard route to handle 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default App;
