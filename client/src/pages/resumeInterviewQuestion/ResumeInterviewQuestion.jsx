import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import "./ResumeInterviewQuestion.css";

function ResumeInterviewQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!id) {
            navigate("/resumeupload", { replace: true });
            return;
        }

        const getQuestions = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/upload/resumeinterviewquestion/${id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const parsedQuestions = JSON.parse(
                    response.data.questions
                );

                setQuestions(parsedQuestions.questions || []);

            } catch (error) {
                console.error("ERROR:", error);

                alert(
                    "Some error has occurred while generating the questions. Please upload the resume again."
                );

                navigate("/resumeupload", { replace: true });

            } finally {
                setLoading(false);
            }
        };

        getQuestions();

    }, [id, navigate]);

    if (loading) {
        return (
            <div className="loading_container">
                <RotatingLines
                    visible={true}
                    height="250"
                    width="100"
                    color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                />
            </div>
        );
    }

    return (
        <div className="questions-container">

            <div className="questions-title">
                <h2>Generated Questions</h2>

                <span>
                    {questions.length} Questions
                </span>
            </div>

            <div className="questions-list">

                {questions.map((item, index) => (
                    <div
                        className="question-card"
                        key={item.id || index}
                    >
                        <div className="question-number">
                            {item.id || index + 1}
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

        </div>
    );
}

export default ResumeInterviewQuestion;