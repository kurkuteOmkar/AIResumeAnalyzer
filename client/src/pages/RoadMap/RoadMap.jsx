import { useState } from "react";
import "./RoadMap.css";

function RoadMap() {
    const [description, setDescription] = useState("");
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const generateRoadmap = async () => {
        if (!description.trim()) {
            setError("Please describe your learning goal or career target.");
            return;
        }

        setLoading(true);
        setError("");
        setRoadmap([]);

        try {
            const token=localStorage.getItem("token")
            const response = await fetch(
                "https://airesumeanalyzer-h0zk.onrender.com/feature/roadmap",
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
          console.log(data)
            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to generate roadmap"
                );
            }
            setRoadmap(data.result.roadmap || []);

        } catch (error) {
            setError(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="interview-page">
            <div className="interview-header">
                <h1>Roadmap Generator</h1>
                <p>
                    Describe your career goal or target technology stack and let AI build a custom learning roadmap for you.
                </p>
            </div>

            <div className="interview-box">
                <label htmlFor="roadmap-description">
                    Describe your goal
                </label>

                <textarea
                    id="roadmap-description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setError("");
                    }}
                    placeholder="Example: I want to become a full-stack web developer in 6 months starting from scratch with JavaScript and React."
                />

                <p className="description-hint">
                    You can mention your current skill level, target timeline, specific technologies, or career milestone.
                </p>

                <button
                    className="generate-button"
                    onClick={generateRoadmap}
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Roadmap"}
                </button>

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
            </div>

            {roadmap.length > 0 && (
                <div className="questions-container">
                    <div className="questions-title">
                        <h2>Generated Roadmap</h2>
                        <span>
                            {roadmap.length} Steps
                        </span>
                    </div>

                    <div className="questions-list">
                        {roadmap.map((item) => (
                            <div
                                className="question-card"
                                key={item.id}
                            >
                                <div className="question-number">
                                    {item.id}
                                </div>

                                <div className="question-details">
                                    <h3>
                                        {item.stepTitle || item.title || item.question}
                                    </h3>
                                    <p className="roadmap-description-text">
                                        {item.description || item.details}
                                    </p>

                                    {item.duration && (
                                        <span className="difficulty-tag">
                                            {item.duration}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="generate-again"
                        onClick={generateRoadmap}
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate Again"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoadMap;