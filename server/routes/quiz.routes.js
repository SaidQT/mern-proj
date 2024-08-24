const QuizController = require("../controllers/quiz.controller");

module.exports = (app) => {

  app.get("/api/quizzes", QuizController.findAllQuizzes);
  app.get("/api/quizzes/:id", QuizController.findOneSingleQuiz);
  app.post("/api/quiz/create", QuizController.createNewQuiz);
  app.patch("/api/quizzes/:id", QuizController.updateExistingQuiz);
  app.delete("/api/quizzes/:id", QuizController.deleteAnExistingQuiz);
};
