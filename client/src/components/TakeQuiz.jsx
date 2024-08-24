import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await axios.get(`http://localhost:8000/api/quiz/${id}`);
      setQuiz(response.data);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    const response = await axios.post(`http://localhost:8000/api/quiz/${id}/submit`, {
      userAnswers,
    });
    console.log('Quiz submitted successfully', response.data);
    // Redirect to results page or show results inline
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      {quiz.questions.map((q, index) => (
        <div key={index}>
          <p>{q.questionText}</p>
          {q.options.map((option, optIndex) => (
            <label key={optIndex}>
              <input
                type="radio"
                value={option}
                name={`question-${index}`}
                onChange={() => handleAnswerChange(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default TakeQuiz;
