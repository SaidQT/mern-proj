const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [optionSchema],  // Options array for the question
  explanation: { type: String, required: true },  // Explanation for the question
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema], 
  image: {type: String} // Questions array, matching the frontend
});

module.exports = mongoose.model("Quiz", quizSchema);
