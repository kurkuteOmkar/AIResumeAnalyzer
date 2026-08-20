import "./ResumeDetails.css";
import { useLocation,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ResumeDetails = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const resumedetails = location.state?.resumeOutput;

    const [details, setDetails] = useState({
        id:"",
        atsScore: 0,
        strengths: [],
        weaknesses: [],
        missingSkills: [],
        grammarFormattingIssues: [],
        projectEvaluation: [],
        improvementSuggestions: [],
        recommendedRoles: [],
        overallVerdict: [],
        educationReview: []
    });

    useEffect(() => {
        if (resumedetails) {
            setDetails({
                id:resumedetails.resumeId||"",

                atsScore: resumedetails.atsScore || 0,

                strengths: resumedetails.strengths || [],

                weaknesses: resumedetails.weaknesses || [],

                missingSkills: resumedetails.missingSkills || [],

                grammarFormattingIssues:
                    resumedetails.grammarAndFormating || [],

                projectEvaluation:
                    resumedetails.projectEvaluation || [],

                improvementSuggestions:
                    resumedetails.improvementSuggestions || [],

                recommendedRoles:
                    resumedetails.recommendedRoles || [],

                overallVerdict:
                    resumedetails.overallVerdict || [],

                educationReview:
                    resumedetails.educationReview || []
            });
        }
    }, [resumedetails]);

    useEffect(() => {
        // console.log("Updated details:", details);
    }, [details]);

   const handleresumeInterviewQuestionButton=()=>{
        navigate(`/resumeinterviewquestion/${details.id}`)
   }
    return (
        <div className="resumedetails">
            <div className="rdContainer1">

                <div className="atsscore">
                    <h1>ATS Score</h1>

                    <h3>
                        {details.atsScore}/100
                    </h3>
                </div>


                <div className="overallverdict">

                    <h1>Overall Verdict</h1>

                    {details.overallVerdict.length > 0 ? (
                        <ul>
                            {details.overallVerdict.map(
                                (item, index) => (
                                    <li key={index}>
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>No overall verdict available.</p>
                    )}

                </div>

            </div>
            <div className="rdContainer2">

                <div className="strengths">

                    <h1>Strengths</h1>

                    {details.strengths.length > 0 ? (
                        <ul>
                            {details.strengths.map(
                                (strength, index) => (
                                    <li key={index}>
                                        {strength}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>No strengths available.</p>
                    )}

                </div>


                <div className="weaknesses">

                    <h1>Weaknesses</h1>

                    {details.weaknesses.length > 0 ? (
                        <ul>
                            {details.weaknesses.map(
                                (weakness, index) => (
                                    <li key={index}>
                                        {weakness}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>No weaknesses available.</p>
                    )}

                </div>

            </div>
            <div className="rdContainer3">

                <div className="grammerAndFormating">

                    <h1>Grammer and Formatting</h1>

                    {details.grammarFormattingIssues.length > 0 ? (
                        <ul>
                            {details.grammarFormattingIssues.map(
                                (issue, index) => (
                                    <li key={index}>
                                        {issue}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>
                            No grammar or formatting issues found.
                        </p>
                    )}

                </div>


                <div className="improvementSuggestions">

                    <h1>Improvement Suggestions</h1>

                    {details.improvementSuggestions.length > 0 ? (
                        <ul>
                            {details.improvementSuggestions.map(
                                (suggestion, index) => (
                                    <li key={index}>
                                        {suggestion}
                                    </li>
                                )
                            )}
                        </ul>
                    ) : (
                        <p>
                            No improvement suggestions available.
                        </p>
                    )}

                </div>

            </div>
            <div className="rdContainer4">

                <div className="projectEvaluation">

                    <h1>Project Evaluation</h1>

                    {details.projectEvaluation.length > 0 ? (
                        <ul>
                       {details.projectEvaluation.map(
                            (project, index) => (

                                <div
                                    className="project-item"
                                    key={index}
                                >
                                    <h2>
                                        {project.title}
                                    </h2>
                                    <p>
                                        <strong>
                                            Relevance:
                                        </strong>{" "}
                                        {project.relevance}
                                    </p>
                                    <p>
                                        <strong>
                                            Tech Stack:
                                        </strong>{" "}
                                        {project.techStack}
                                        
                                    </p>
                                    <p>
                                        <strong>
                                            Impact:
                                        </strong>{" "}
                                        {project.impact}
                                    </p>

                                </div>

                            )
                        )}
                    </ul>
                    ) : (

                        <p>
                            No project evaluation available.
                        </p>

                    )}

                </div>


                <div className="recommendedRoles">

                    <h1>Recommended Roles</h1>

                    {details.recommendedRoles.length > 0 ? (

                        <ul>
                            {details.recommendedRoles.map(
                                (role, index) => (
                                    <li key={index}>
                                        {role}
                                    </li>
                                )
                            )}
                        </ul>

                    ) : (

                        <p>
                            No recommended roles available.
                        </p>

                    )}

                </div>

            </div>

            <div className="rdContainer5">

                <div className="missingSkills">

                    <h1>Missing Skills</h1>

                    {details.missingSkills.length > 0 ? (

                        <ul>
                            {details.missingSkills.map(
                                (skill, index) => (
                                    <li key={index}>
                                        {skill}
                                    </li>
                                )
                            )}
                        </ul>

                    ) : (

                        <p>
                            No missing skills found.
                        </p>

                    )}

                </div>


                <div className="educationReview">

                    <h1>Education Review</h1>

                    {details.educationReview.length > 0 ? (
                       <ul>
                       { details.educationReview.map(
                            (education, index) => (  
                                    <li key={index}>
                                        {education}
                                    </li>
                                )     
                            
                        )
                    }
                    </ul>
                    
                    ) : (

                        <p>
                            No education review available.
                        </p>

                    )}

                </div>

            </div>
         <div className="resumeInterviewQuestionButton">
            <button onClick={handleresumeInterviewQuestionButton}>
            Generate Resume Questions based on resume
            </button>
         </div>
        </div>
    );
};

export default ResumeDetails;