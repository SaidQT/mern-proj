import React, { useState } from "react";
import { TextField, Button, FormControlLabel, Radio, Typography, Box } from '@mui/material';

const AddQuestionForm = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { option: "", isCorrect: false },
    { option: "", isCorrect: false },
  ]);
  const [explanation, setExplanation] = useState("");

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].option = value;
    setOptions(newOptions);
  };

  const handleCorrectChange = (index) => {
    const newOptions = [...options];
    newOptions.forEach((opt, i) => (opt.isCorrect = i === index));
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { option: "", isCorrect: false }]);
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
      explanation,
    };
    onAddQuestion(newQuestion);
    setQuestion("");
    setOptions([
      { option: "", isCorrect: false },
      { option: "", isCorrect: false },
    ]);
    setExplanation("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Question
      </Typography>
      <TextField
        fullWidth
        label="Question"
        variant="outlined"
        value={question}
        onChange={handleQuestionChange}
        required
        sx={{ mb: 2 }}
      />
      {options.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            variant="outlined"
            value={option.option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={
              <Radio
                checked={option.isCorrect}
                onChange={() => handleCorrectChange(index)}
              />
            }
            label="Correct"
          />
        </Box>
      ))}
      <Button variant="outlined" onClick={addOption} sx={{ mb: 2 }}>
        Add Another Option
      </Button>
      <TextField
        fullWidth
        label="Explanation"
        variant="outlined"
        multiline
        rows={4}
        value={explanation}
        onChange={handleExplanationChange}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Question
      </Button>
    </Box>
  );
};

export default AddQuestionForm;
