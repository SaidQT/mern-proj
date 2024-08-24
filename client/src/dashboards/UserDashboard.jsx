import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import styles from './Quizzes.module.css';
import axios from 'axios';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:8000'); // Replace with your server URL

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8000/api/quizzes');
        setQuizzes(response.data.quizzes);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quizzes');
        setLoading(false);
      }
    };
    fetchQuizzes();

    socket.on('quizAdded', (newQuiz) => {
      setQuizzes((prevQuizzes) => [...prevQuizzes, newQuiz]);

      toast.info(`New quiz added: ${newQuiz.title}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClick: () => window.location.href = `/user/dashboard/quiz/${newQuiz._id}`,
      });
    });

    return () => {
      socket.off('quizAdded');
    };
  }, []);

  useEffect(() => {
    if (timer === 0 && isQuizActive && selectedQuizId) {
      navigate(`/user/dashboard/quiz/${selectedQuizId}`);
    }

    if (timer > 0 && isQuizActive) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isQuizActive, selectedQuizId, navigate]);

  const startQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setTimer(5);
    setIsQuizActive(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!Array.isArray(quizzes) || quizzes.length === 0) return <p>No quizzes available.</p>;

  return (
    <div className={styles.quizzesContainer}>
      <ToastContainer /> {/* Ensure the ToastContainer is rendered */}
      {!isQuizActive ? (
        <>
          <h1 className={styles.title}>Test Your Knowledge of Development Languages</h1>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, Scrollbar]}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            autoplay={{ delay: 2000 }}
          >
            {quizzes.map((quiz, index) => (
              <SwiperSlide key={index}>
                <div className={styles.quizCard}>
                  <img src={quiz.image} alt={quiz.title} className={styles.quizImage} />
                  <div className={styles.quizHover}>
                    <h3>{quiz.title}</h3>
                    <button 
                      className={styles.quizButton} 
                      onClick={() => startQuiz(quiz._id)}
                    >
                      Take a Quiz
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <div className={styles.timerScreen}>
          <h1 className={styles.timerText}>Get Ready! {timer} seconds left</h1>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
