import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const QuizPage = () => {
  const { id } = useParams(); // Get the quiz ID from the route parameters
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/quizzes/${id}`);
        setQuiz(response.data.quiz);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch quiz details");
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/admin/dashboard/quiz/${id}/edit`);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`http://localhost:8000/api/quizzes/${id}`);
        navigate(-1); // Navigate back to the previous page
      } catch (err) {
        setError("Failed to delete quiz");
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!quiz) return <Typography>No quiz found.</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {quiz.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {quiz.description || "No description available."}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>Total Questions:</strong> {quiz.questions.length}
        </Typography>
        <List>
          {quiz.questions && quiz.questions.map((question, index) => (
            <Paper elevation={2} sx={{ padding: "10px", marginBottom: "10px" }} key={index}>
              <ListItem>
                <ListItemText
                  primary={`Question ${index + 1}: ${question.title}`}
                  secondary={
                    <>
                      <ul>
                        {question.options && question.options.map((option, i) => (
                          <li key={i}>
                            {option.option} {option.isCorrect && "(Correct)"}
                          </li>
                        ))}
                      </ul>
                      <Typography variant="body2">
                        <strong>Explanation:</strong> {question.explanation}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{backgroundColor: "#ffdf00", color: "#000"}}
            startIcon={<Edit />}
            onClick={handleEditClick}
          >
            Edit Quiz
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={handleDeleteClick}
          >
            Delete Quiz
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizPage;
