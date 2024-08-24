// quiz.routes.js
const QuizController = require("../controllers/quiz.controller");

module.exports = (app, io) => {
  app.get("/api/quizzes", QuizController.findAllQuizzes);
  app.get("/api/quizzes/:id", QuizController.findOneSingleQuiz);
  app.post("/api/quiz/create", (req, res) => QuizController.createNewQuiz(req, res, io)); 
  app.patch("/api/quizzes/:id", QuizController.updateExistingQuiz);
  app.delete("/api/quizzes/:id", QuizController.deleteAnExistingQuiz);
};
