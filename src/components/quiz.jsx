import { useState } from "react";

function Quiz() {
    const questionBank = [
        {
            question: "What is the capital of India?",
            options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
            answer: "New Delhi",
        },
        {
            question: "What does JSX stand for?",
            options: ["JavaScript XML", "Javasyntax XML", "Just a simple example", "None of the above"],
            answer: "JavaScript XML",
        },
        {
            question: "How many districts are in Kerala?",
            options: ["11", "10", "14", "15"],
            answer: "14",
        },
    ];

    const [userAnswers, setUserAnswers] = useState(Array(questionBank.length).fill(null));
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionClick = (option) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = option;
        setUserAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < questionBank.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const calculateScore = () => {
        return userAnswers.reduce((score, answer, index) => {
            return answer === questionBank[index].answer ? score + 1 : score;
        }, 0);
    };

    if (isFinished) {
        const score = calculateScore();
        return (
            <div>
                <h2>Quiz Completed</h2>
                <p>Your Score: {score} / {questionBank.length}</p>
                <ul>
                    {questionBank.map((q, idx) => (
                        <li key={idx}>
                            <strong>{q.question}</strong><br />
                            Your answer: {userAnswers[idx]}<br />
                            Correct answer: {q.answer}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    const currentQ = questionBank[currentQuestion];

    return (
        <div>
            <h2>Question {currentQuestion + 1} of {questionBank.length}</h2>
            <p className="question">{currentQ.question}</p>
            <div>
                {currentQ.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                            backgroundColor: userAnswers[currentQuestion] === option ? 'lightgreen' : ''
                        }}
                        className="option"
                    >
                        {option}
                    </button>
                ))}
            </div>
            <p>Selected: {userAnswers[currentQuestion] || "None"}</p>
            <div className="nav-buttons">
                <button onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
                <button onClick={handleNext} disabled={!userAnswers[currentQuestion]}>
                    {currentQuestion === questionBank.length - 1 ? "Finish Quiz" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Quiz;

