import { useState } from "react";
import "./InterviewQuestion.css";

function InterviewQuestion() {
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateQuestions = async () => {
        if (!description.trim()) {
            setError("Please describe the role or technology stack.");
            return;
        }

        setLoading(true);
        setError("");
        setQuestions([]);

        try {
            const token=localStorage.getItem("token")
                const response = await fetch(
                    `${import.meta.env.VITE_API_URLfeature}/interviewquestions`,
                    {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify({
                        message: description,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to generate questions"
                );
            }
            setQuestions(data.questions || []);

        } catch (error) {
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="interview-page">

            <div className="interview-header">
                <h1>Interview Question Generator</h1>

                <p>
                    Describe the job role or technology stack you're
                    preparing for and let AI generate interview questions.
                </p>
            </div>

            <div className="interview-box">

                <label htmlFor="interview-description">
                    Describe your interview
                </label>

                <textarea
                    id="interview-description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setError("");
                    }}
                    placeholder="Example: I am preparing for a React frontend developer interview. I have 1 year of experience and want questions about React, JavaScript, HTML, CSS and REST APIs."
                />

                <p className="description-hint">
                    You can mention the role, experience, technologies,
                    difficulty level, or specific topics you want to practice.
                </p>

                <button
                    className="generate-button"
                    onClick={generateQuestions}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Questions"}
                </button>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
            </div>

            {questions.length > 0 && (
                <div className="questions-container">

                    <div className="questions-title">
                        <h2>Generated Questions</h2>

                        <span>
                            {questions.length} Questions
                        </span>
                    </div>

                    <div className="questions-list">

                        {questions.map((item) => (
                            <div
                                className="question-card"
                                key={item.id}
                            >

                                <div className="question-number">
                                    {item.id}
                                </div>

                                <div className="question-details">

                                    <h3>
                                        {item.question}
                                    </h3>

                                    <span className="difficulty-tag">
                                        {item.difficulty}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>

                    <button
                        className="generate-again"
                        onClick={generateQuestions}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Again"}
                    </button>

                </div>
            )}
        </div>
    );
}

export default InterviewQuestion;
