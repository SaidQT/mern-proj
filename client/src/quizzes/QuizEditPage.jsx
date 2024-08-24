import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const QuizEditPage = () => {
  const { id } = useParams(); // Get the quiz ID from the route parameters
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch the quiz data when in edit mode
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

  const handleTitleChange = (e) => {
    setQuiz({ ...quiz, title: e.target.value });
  };

  const handleInputChange = (e, index, field) => {
    const newQuestions = [...quiz.questions];
    newQuestions[index][field] = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle the correct answer selection using radio buttons
  const handleCorrectChange = (questionIndex, optionIndex) => {
    const newQuestions = [...quiz.questions];

    // Set all options' isCorrect to false for the current question
    newQuestions[questionIndex].options = newQuestions[questionIndex].options.map((option, i) => ({
      ...option,
      isCorrect: i === optionIndex, // Only the selected option is true
    }));

    setQuiz({ ...quiz, questions: newQuestions });
  };

  // Handle image URL change
  const handleImageChange = (e) => {
    setQuiz({ ...quiz, image: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/api/quizzes/${id}`, quiz);
      setSuccessMessage("Quiz updated successfully!");
      setLoading(false);
      navigate(`/admin/dashboard`); // Redirect to quiz detail page after successful edit
    } catch (err) {
      setError("Failed to update quiz");
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!quiz) return <Typography>No quiz found.</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Edit Quiz
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Editable quiz title */}
          <TextField
            fullWidth
            label="Quiz Title"
            value={quiz.title}
            onChange={handleTitleChange}
            required
            sx={{ marginBottom: "20px" }}
          />

          {/* Editable image URL */}
          <TextField
            fullWidth
            label="Image URL"
            value={quiz.image}
            onChange={handleImageChange}
            required
            sx={{ marginBottom: "20px" }}
          />

          {quiz.questions.map((question, questionIndex) => (
            <Box key={questionIndex} sx={{ marginBottom: "24px" }}>
              <Typography variant="h6">Question {questionIndex + 1}:</Typography>
              <TextField
                fullWidth
                label="Question Title"
                value={question.title}
                onChange={(e) => handleInputChange(e, questionIndex, "title")}
                sx={{ marginBottom: "16px" }}
              />
              <Grid container spacing={2}>
                {question.options.map((option, optionIndex) => (
                  <Grid item xs={12} sm={6} key={optionIndex}>
                    <TextField
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option.option}
                      onChange={(e) => {
                        const newOptions = [...question.options];

                        newOptions[ optionIndex ].option = e.target.value;

                        newOptions[optionIndex].option = e.target.value;

                        newOptions[optionIndex].option = e.target.value;

                        const newQuestions =  [...quiz.questions];
                        newQuestions[questionIndex].options = newOptions;
                        setQuiz({ ...quiz, questions: newQuestions });
                      }}
                      sx={{ marginBottom: "8px" }}
                    />
                    <RadioGroup
                      row
                      value= { option.isCorrect ? optionIndex : -1 }
                      onChange={() => handleCorrectChange(questionIndex, optionIndex)}
                    >
                      <FormControlLabel
                        value={ optionIndex }
                        control={< Radio />}
                        label="Correct"
                      />
                    </RadioGroup>
                  </Grid >
                ))}
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={ 3 }
                label="Explanation"
                value={question.explanation}
                onChange={(e) => handleInputChange(e, questionIndex, "explanation")}
                sx={{ marginTop: "16px" }}
              />
            </Box>
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#ffdf00", color: "#000", marginTop: "20px" }}
          >
            Save Changes
          </Button>
        </form>
        {successMessage && <Alert severity="success" sx={{ marginTop: "20px" }}>{successMessage}</Alert>}
      </Paper>
    </Box>
  );
};

export default QuizEditPage;
