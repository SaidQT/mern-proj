import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState("");
  const [quizImageUrl, setQuizImageUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    options: [{ option: "", isCorrect: false }],
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

  const validateQuestion = () => {
    const newErrors = {};

    if (!currentQuestion.title) {
      newErrors.title = "Question title is required.";
    }

    if (currentQuestion.options.length < 2) {
      newErrors.options = "Each question must have at least two options.";
    } else if (!currentQuestion.options.some((option) => option.isCorrect)) {
      newErrors.options = "Each question must have at least one correct option.";
    }

    if (!currentQuestion.explanation) {
      newErrors.explanation = "Explanation is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    if (validateQuestion()) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        title: "",
        options: [{ option: "", isCorrect: false }],
        explanation: "",
      });
      setErrors({});
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    if (!quizTitle || questions.length === 0) {
      setErrors({
        ...errors,
        quizTitle: !quizTitle ? "Quiz title is required." : "",
        questions: questions.length === 0 ? "At least one question is required." : "",
      });
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

    try {
      const response = await axios.post("http://localhost:8000/api/quiz/create", newQuiz);
      console.log("Quiz creation response:", response.data);
      
      setLoading(false);
      setSuccessMessage("Quiz created successfully!");
      setOpenSnackbar(true);
      navigate("/admin/dashboard")
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
      setErrors({ api: "Error creating quiz. Please try again." });
      setLoading(false);
    }
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(currentQuestion.options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCurrentQuestion({ ...currentQuestion, options: items });
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
            
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Quiz Image URL"
            value={quizImageUrl}
            onChange={handleImageUrlChange}
            error={!!errors.quizImageUrl}
            helperText="Enter a valid image URL for the quiz cover"
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
            error={!!errors.title}
            helperText={errors.title}
            variant="outlined"
           
          />
        </Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="options">
            {(provided) => (
              <Grid
                container
                spacing={2}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {currentQuestion.options.map((option, index) => (
                  <Draggable key={index} draggableId={`option-${index}`} index={index}>
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Box display="flex" alignItems="center">
                          <TextField
                            fullWidth
                            label={`Option ${index + 1}`}
                            value={option.option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            error={!!errors.options && index === currentQuestion.options.length - 1}
                            helperText={errors.options && index === currentQuestion.options.length - 1 ? errors.options : ""}
                            variant="outlined"
                           
                          />
                          <Tooltip title="Remove Option">
                            <span>
                              <IconButton
                                color="secondary"
                                onClick={() => removeOption(index)}
                                disabled={currentQuestion.options.length <= 2}
                              >
                                <RemoveCircleOutline />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Mark as Correct">
                            <span>
                              <IconButton
                                color={option.isCorrect ? "primary" : "default"}
                                onClick={() => handleCorrectChange(index)}
                              >
                                <AddCircleOutline />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Box>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={addOption}
            style={{ backgroundColor: "#ffdf00", color: "#000", fontSize: '0.875rem', padding: '6px 12px', width: '200px' }}
          >
            Add Option
          </Button>
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            label="Explanation"
            value={currentQuestion.explanation}
            onChange={handleExplanationChange}
            error={!!errors.explanation}
            helperText={errors.explanation}
            variant="outlined"
            
          />
        </Box>
        <Box mt={2} mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            disabled={loading}
            style={{ marginRight: "16px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Add Question"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={loading || questions.length === 0}
          >
            {loading ? <CircularProgress size={24} /> : "Submit Quiz"}
          </Button>
        </Box>
        {questions.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Questions
            </Typography>
            {questions.map((question, index) => (
              <Paper key={index} elevation={2} style={{ padding: "10px", marginBottom: "10px" }}>
                <Typography variant="h6">{question.title}</Typography>
                <ul>
                  {question.options.map((option, idx) => (
                    <li key={idx}>
                      {option.option} {option.isCorrect && "(Correct)"}
                    </li>
                  ))}
                </ul>
                <Typography variant="body2" color="textSecondary">
                  Explanation: {question.explanation}
                </Typography>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveQuestion(index)}
                  style={{ marginTop: "10px" }}
                >
                  <RemoveCircleOutline />
                </IconButton>
              </Paper>
            ))}
          </Box>
        )}
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={successMessage}
      />
    </Paper>
  );
};

export default CreateQuiz;
