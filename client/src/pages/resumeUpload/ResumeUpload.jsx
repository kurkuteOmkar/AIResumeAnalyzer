import "./ResumeUpload.css";
import axios from "axios";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ResumeUpload() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select the file");
      return;
    }
    if(resume.size>5*1024*1024){
      alert("File size should be less than 5MB")
      return
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://airesumeanalyzer-h0zk.onrender.com/upload/resumeUpload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = response.data.message;
      const resumeOutput = {
        resumeId: response.data.resumeId,
        atsScore: resData.atsScore,
        grammarAndFormating: resData[`GrammarFormattingIssues`],
        improvementSuggestions: resData.ImprovementSuggestions,
        overallVerdict: resData.OverallVerdict,
        projectEvaluation: resData.ProjectEvaluation,
        recommendedRoles: resData.RecommendedRoles,
        missingSkills: resData.missingSkills,
        strengths: resData.strengths,
        weaknesses: resData.weaknesses,
        educationReview: resData.educationReview,
      };
      navigate("/resumedetails", {
        state: {
          resumeOutput,
        },
      });
    } catch (err) {
      alert(err.message || "Please Enter a valid format");
      setLoading(false);
    }
  };

  return (
    <div className="resumeUpload_Container">
      <div className="resumeUpload_heading">
        <h1>Is your resume good enough?</h1>
        <p>
          A free and fast AI resume checker doing 27 crucial checks to ensure
          your resume's content, layout, and design are technically compatible with
          applicant tracking systems to get you interview callbacks.
        </p>
      </div>

      {loading ? (
        <div className="loading_container">
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="#4f46e5"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </div>
      ) : (
        <div className="resumeUpload_form">
          <p className="form_title">Upload Your Resume Here</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="resume" className="upload_section">
              <div className="upload_content">
                <span className="upload_icon">📄</span>
                <h2 className="file_name_display">
                  {resume ? resume.name : "Upload Your Resume"}
                </h2>
                <p className="file_format_hint">PDF(Max 5 MB)</p>
              </div>
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="resume_upload_submit"
              onClick={handleUpload}
            >
              Submit Resume
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;