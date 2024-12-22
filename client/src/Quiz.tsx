import React, { useState } from 'react';
import './Quiz.css';

interface QuizProps {
  onClose: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onClose }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let currentScore = 0;

    // Quiz answers based on the selected quiz
    const answers: { [key: string]: string } = selectedQuiz === 'OS' ? {
      q1: 'b',
      q2: 'd',
      q3: 'a',
    } : selectedQuiz === 'CN' ? {
      q1: 'c',
      q2: 'b',
      q3: 'c',
    } : selectedQuiz === 'DBMS' ? {
      q1: 'b',
      q2: 'b',
      q3: 'd',
    } : {};

    Object.keys(answers).forEach((question) => {
      const selectedAnswer = (
        document.querySelector(`input[name="${question}"]:checked`) as HTMLInputElement
      )?.value;
      if (selectedAnswer === answers[question]) {
        currentScore++;
      }
    });

    setScore(currentScore);
    setSubmitted(true);
  };

  const renderQuestions = () => {
    if (selectedQuiz === 'OS') {
      return (
        <>
          <div className="question">
            <p>1. What is the main function of an operating system?</p>
            <label><input type="radio" name="q1" value="a" /> A. Manage hardware resources</label>
            <label><input type="radio" name="q1" value="b" /> B. Provide network security</label>
            <label><input type="radio" name="q1" value="c" /> C. Maintain user interface</label>
            <label><input type="radio" name="q1" value="d" /> D. Store files permanently</label>
          </div>
          <div className="question">
            <p>2. Which of the following is not a process state in an OS?</p>
            <label><input type="radio" name="q2" value="a" /> A. Running</label>
            <label><input type="radio" name="q2" value="b" /> B. Waiting</label>
            <label><input type="radio" name="q2" value="c" /> C. Blocked</label>
            <label><input type="radio" name="q2" value="d" /> D. Terminated</label>
          </div>
          <div className="question">
            <p>3. Which of these is an example of a real-time operating system?</p>
            <label><input type="radio" name="q3" value="a" /> A. Linux</label>
            <label><input type="radio" name="q3" value="b" /> B. Windows</label>
            <label><input type="radio" name="q3" value="c" /> C. RTOS</label>
            <label><input type="radio" name="q3" value="d" /> D. macOS</label>
          </div>
        </>
      );
    }

    if (selectedQuiz === 'CN') {
      return (
        <>
          <div className="question">
            <p>1. Which protocol is used for secure data transmission over the Internet?</p>
            <label><input type="radio" name="q1" value="a" /> A. HTTP</label>
            <label><input type="radio" name="q1" value="b" /> B. FTP</label>
            <label><input type="radio" name="q1" value="c" /> C. HTTPS</label>
            <label><input type="radio" name="q1" value="d" /> D. SMTP</label>
          </div>
          <div className="question">
            <p>2. What does DNS stand for?</p>
            <label><input type="radio" name="q2" value="a" /> A. Digital Network Service</label>
            <label><input type="radio" name="q2" value="b" /> B. Domain Name System</label>
            <label><input type="radio" name="q2" value="c" /> C. Data Network Security</label>
            <label><input type="radio" name="q2" value="d" /> D. Domain Navigation System</label>
          </div>
          <div className="question">
            <p>3. Which layer of the OSI model is responsible for end-to-end communication?</p>
            <label><input type="radio" name="q3" value="a" /> A. Physical layer</label>
            <label><input type="radio" name="q3" value="b" /> B. Data link layer</label>
            <label><input type="radio" name="q3" value="c" /> C. Transport layer</label>
            <label><input type="radio" name="q3" value="d" /> D. Application layer</label>
          </div>
        </>
      );
    }

    if (selectedQuiz === 'DBMS') {
      return (
        <>
          <div className="question">
            <p>1. Which of the following is used to uniquely identify a record in a database?</p>
            <label><input type="radio" name="q1" value="a" /> A. Foreign key</label>
            <label><input type="radio" name="q1" value="b" /> B. Primary key</label>
            <label><input type="radio" name="q1" value="c" /> C. Candidate key</label>
            <label><input type="radio" name="q1" value="d" /> D. Index</label>
          </div>
          <div className="question">
            <p>2. Which normalization form removes partial dependency?</p>
            <label><input type="radio" name="q2" value="a" /> A. 1NF (First Normal Form)</label>
            <label><input type="radio" name="q2" value="b" /> B. 2NF (Second Normal Form)</label>
            <label><input type="radio" name="q2" value="c" /> C. 3NF (Third Normal Form)</label>
            <label><input type="radio" name="q2" value="d" /> D. BCNF (Boyce-Codd Normal Form)</label>
          </div>
          <div className="question">
            <p>3. Which of these is a type of relationship between tables in a relational database?</p>
            <label><input type="radio" name="q3" value="a" /> A. One-to-one</label>
            <label><input type="radio" name="q3" value="b" /> B. One-to-many</label>
            <label><input type="radio" name="q3" value="c" /> C. Many-to-many</label>
            <label><input type="radio" name="q3" value="d" /> D. All of the above</label>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        {!selectedQuiz ? (
          <div>
            <h1 className="quiz-title">Select Quiz</h1>
            <button onClick={() => setSelectedQuiz('CN')}className="quiz-button">CN</button>
            <br></br>
            <button onClick={() => setSelectedQuiz('DBMS')} className="quiz-button">DBMS</button>
            <br></br>
            <button onClick={() => setSelectedQuiz('OS')} className="quiz-button">OS</button>
          </div>
        ) : (
          <>
            <h1 className="quiz-title">{selectedQuiz} Quiz</h1>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                {renderQuestions()}
                <button type="submit" className="submit-btn">Submit Quiz</button>
              </form>
            ) : (
              <div className="results">
                <p className="score-message">
                  {score === 3 ? "🎉 Perfect Score!" : `You scored ${score} out of 3.`}
                </p>
                <button onClick={onClose} className="return-btn">Return to Courses</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
