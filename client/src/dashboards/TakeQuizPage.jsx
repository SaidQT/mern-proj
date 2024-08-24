import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Typography, Card, CardContent, Box, CircularProgress, Alert, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Quizzes.module.css'; // Importing the CSS module

// Registering the components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const TakeQuizPage = () => {
  const { id } = useParams(); // Get the quiz ID from the route parameters
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [funStatement, setFunStatement] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/quizzes/${id}`);
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz');
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (index) => {
    setSelectedAnswer(index);
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: index, // Store the user's selected option for the current question
    });
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) {
      // Handle case where no answer is selected
      return;
    }
    setSelectedAnswer(null);
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Handle end of quiz
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let correctAnswersCount = 0;

    quiz.questions.forEach((question, questionIndex) => {
      const userAnswerIndex = userAnswers[questionIndex];
      const correctAnswer = question.options.find((option) => option.isCorrect);

      if (question.options[userAnswerIndex] && question.options[userAnswerIndex].isCorrect) {
        correctAnswersCount += 1;
      }
    });

    // Calculate the score as a percentage
    const totalQuestions = quiz.questions.length;
    const calculatedScore = Math.round((correctAnswersCount / totalQuestions) * 100);
    setScore(calculatedScore);

    // Generate a fun statement based on the score
    if (calculatedScore === 100) {
      setFunStatement("You're a quiz master!");
    } else if (calculatedScore >= 75) {
      setFunStatement("Great job! You're almost perfect.");
    } else if (calculatedScore >= 50) {
      setFunStatement("Not bad, but there's room for improvement.");
    } else {
      setFunStatement("Better luck next time! Keep practicing.");
    }

    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    // Reset states to retake the quiz
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setShowResults(false);
    setScore(0);
    setFunStatement('');
  };

  const handleGoBack = () => {
    navigate("/user/dashboard");
  };

  const chartData = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!quiz) return <Typography>No quiz found.</Typography>;

  return (
    <div className={styles.quizContent}>
      {!showResults ? (
        <>
          {quiz.questions.length > 0 && (
            <Card className={styles.questionCard} sx={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                  {quiz.questions[currentQuestionIndex]?.title}
                </Typography>
                <RadioGroup
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerChange(Number(e.target.value))}
                >
                  {quiz.questions[currentQuestionIndex]?.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={option.option}
                      sx={{ marginBottom: '10px' }}
                    />
                  ))}
                </RadioGroup>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={nextQuestion}
                  sx={{ marginTop: '20px' }}
                >
                  {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>
            Quiz Results
          </Typography>
          <Typography variant="h6" gutterBottom>
            Your Score: {score}%
          </Typography>
          <Typography variant="h6" gutterBottom>
            {funStatement}
          </Typography>

          {/* Display the pie chart for the score */}
          <Box sx={{ marginTop: '20px', width: '300px', margin: 'auto' }}>
            <Pie data={chartData} />
          </Box>

          <Box sx={{ marginTop: '20px' }}>
            {quiz.questions.map((question, questionIndex) => {
              const userAnswerIndex = userAnswers[questionIndex];
              const userAnswer = question.options[userAnswerIndex];
              const correctAnswer = question.options.find((option) => option.isCorrect);

              return (
                <Card key={questionIndex} sx={{ marginBottom: '20px', padding: '10px' }}>
                  <CardContent>
                    <Typography variant="h6">{question.title}</Typography>
                    <Typography color={userAnswer && userAnswer.isCorrect ? "green" : "red"}>
                      Your Answer: {userAnswer ? userAnswer.option : "No answer"}
                    </Typography>
                    <Typography color="primary">
                      Correct Answer: {correctAnswer.option}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Explanation: {question.explanation}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleRetakeQuiz}
            sx={{ marginBottom: '10px', width: '100%' }}
          >
            Retake Quiz
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleGoBack}
            sx={{ width: '100%' }}
          >
            Go Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default TakeQuizPage;
