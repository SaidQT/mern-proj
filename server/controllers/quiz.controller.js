const PostQuiz = require('../models/quiz.model'); // Make sure the path is correct

module.exports.findAllQuizzes = (req, res) => {
    PostQuiz.find()
        .then((allQuizzes) => {
            res.json({ quizzes: allQuizzes })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.findOneSingleQuiz = (req, res) => {
    PostQuiz.findOne({ _id: req.params.id })
        .then(oneSingleQuiz => {
            res.json({ quiz: oneSingleQuiz })
        })
        .catch((err) => {
            res.json(err)
        });
}

module.exports.createNewQuiz = (req, res) => {
    PostQuiz.create(req.body)
        .then(newlyCreatedQuiz => {
            res.json({ quiz: newlyCreatedQuiz })
        })
        .catch(err => res.status(400).json(err));
}

module.exports.updateExistingQuiz = (req, res) => {
    PostQuiz.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedQuiz => {
            res.json({ quiz: updatedQuiz })
        })
        .catch(err => res.status(400).json(err));
}

module.exports.deleteAnExistingQuiz = (req, res) => {
    PostQuiz.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
            res.json(err)
        });
}
