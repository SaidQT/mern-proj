import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizImageUrl, setQuizImageUrl] = useState(""); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    options: [{ option: "" , isCorrect: false }],
    explanation: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleTitleChange = (e) => setQuizTitle(e.target.value);
  const handleImageUrlChange = (e) => setQuizImageUrl(e.target.value);

  const handleQuestionChange = (e) => {
    setCurrentQuestion({ ...currentQuestion, title: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = currentQuestion.options.map((option, i) =>
      i === index ? { ...option, option: value } : option
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleCorrectChange = (index) => {
    const updatedOptions = currentQuestion.options.map((option, i) =>
      i === index
        ? { ...option, isCorrect: true }
        : { ...option, isCorrect: false }
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleExplanationChange = (e) =>
    setCurrentQuestion({ ...currentQuestion, explanation: e.target.value });

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, { option: "", isCorrect: false }],
    });
  };

  const removeOption = (index) => {
    const updatedOptions = currentQuestion.options.filter(
      (option, i) => i !== index
    );
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.title.trim() || currentQuestion.options.length === 0 || !currentQuestion.explanation.trim()) {
      alert('Please fill out all fields for the question.');
      return;
    }
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      title: "",
      options: [{ option: "", isCorrect: false }],
      explanation: "",
    });
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    if (!quizTitle.trim()) {
      setErrors({ ...errors, quizTitle: "Quiz title is required." });
      return;
    }
    if (questions.length === 0) {
      setErrors({ ...errors, questions: "At least one question is required." });
      return;
    }

    setLoading(true);

    const newQuiz = {
      title: quizTitle,
      image: quizImageUrl,
      questions: questions.map((question) => ({
        title: question.title,
        options: question.options.map((option) => ({
          option: option.option,
          isCorrect: option.isCorrect,
        })),
        explanation: question.explanation,
      })),
    };

    console.log("Submitting quiz:", newQuiz); // Debugging: Check the quiz data being sent

    try {
      const response = await axios.post("http://localhost:8000/api/quiz/create", newQuiz);
      console.log("Response from API:", response.data);

      setLoading(false);
      setSuccessMessage("Quiz created successfully!");
      setOpenSnackbar(true);

      setQuizTitle("");
      setQuizImageUrl("");
      setQuestions([]);
      setCurrentQuestion({
        title: "",
        options: [{ option: "", isCorrect: false }],
        explanation: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating quiz:", error.response?.data || error.message || error);
      alert(`Error creating quiz: ${error.response?.data?.message || "Please check your data."}`);
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "600px", margin: "20px auto" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a New Quiz
      </Typography>
      <form onSubmit={handleSubmitQuiz}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Quiz Title"
            value={quizTitle}
            onChange={handleTitleChange}
            error={!!errors.quizTitle}
            helperText={errors.quizTitle}
            variant="outlined"
            required
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Quiz Image URL"
            value={quizImageUrl}
            onChange={handleImageUrlChange}
            variant="outlined"
          />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Add Questions
        </Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Question"
            value={currentQuestion.title}
            onChange={handleQuestionChange}
            variant="outlined"
            required
          />
        </Box>
        {currentQuestion.options.map((option, index) => (
          <Box key={index} mb={2}>
            <TextField
              fullWidth
              label={`Option ${index + 1}`}
              value={option.option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              variant="outlined"
              required
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => removeOption(index)}
              style={{ marginTop: "10px" }}
            >
              Remove Option
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCorrectChange(index)}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            >
              Mark as Correct
            </Button>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={addOption}
          style={{ marginTop: "10px" }}
        >
          Add Another Option
        </Button>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Explanation"
            value={currentQuestion.explanation}
            onChange={handleExplanationChange}
            variant="outlined"
            required
            multiline
            rows={4}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddQuestion}
          style={{ marginTop: "10px" }}
        >
          Add Question
        </Button>

        <Box mt={3} display="flex" justifyContent="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontSize: '0.875rem', padding: '6px 12px', width: '200px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Quiz"}
          </Button>
        </Box>

        {successMessage && (
          <Box mt={2}>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackbar(false)}
              message={successMessage}
            />
          </Box>
        )}
      </form>
    </Paper>
  );
};

export default CreateQuiz;
