AI-Powered Resume Analyzer
A full-stack web application designed to help job seekers optimize their resumes, beat Applicant Tracking Systems (ATS), and prepare for interviews using AI.

🔗 Live Demo: https://airesumeanalyer-nu.vercel.app/

🌟 Features
Secure Authentication: User sign-up and login secured with JWT (JSON Web Tokens) and password hashing.

Resume Parsing & Upload: Seamless PDF resume uploads handled via Multer and automated text parsing.

Comprehensive ATS Evaluation: Powered by Groq AI, it calculates an overall ATS score and breaks down:

Strengths & Weaknesses

Missing Skills

Grammar & Formatting Issues

Project & Education Reviews (evaluating relevance, tech stack, and impact)

Actionable Improvement Suggestions & Recommended Roles

Interview Prep & Q&A: Automatically generates resume-based interview questions, plus a feature to generate Q&A for any custom topic.

Custom Career Roadmaps: Input your target role and let the AI generate a step-by-step learning roadmap for you.

🛠️ Tech Stack
Frontend: Hosted on Vercel

Backend: Hosted on Render

AI Engine: Groq AI

Key Libraries & Tools: JWT, Multer, PDF Parser

🚀 Getting Started Locally
Prerequisites
Node.js installed on your machine

npm or yarn

Installation
Clone the repository:

Bash
git clone https://github.com/kurkuteOmkar/AIResumeAnalyzer.git
Navigate to the project directory and install dependencies (for both frontend/backend as per your folder structure).

Set up environment variables:
Create a .env file in your backend directory and add your required keys (e.g., JWT secret, Database URI, Groq API key).

Run the application:
Start your backend and frontend servers.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
