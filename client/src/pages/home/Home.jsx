import "./Home.css"
import Resume from "./Resume.png"
function Home(){
    return <>
    <div className="home-container">
   <div className="home-Intro">
    <div className="home-Intro1">
        <div className="aiPowered"><i class="fa-solid fa-wand-sparkles"></i>    AI-Powered Resume Analysis</div>
        <div className="introText1">Improve your resume.</div>
        <div className="introText2">Get Your Dream Job.</div>
        <div className="introText3">Our AI Analyzes your Resume, provide ATS scores, suggest improvement, and help you to stand out to recruiters.</div>
        <hr/>
            <p className="intro-trust">Trusted by 10000+ job seakers</p>
        <div className="home-Intro1-review">
            <div className="home-Intro1-review1">
                <i class="fa-solid fa-circle-user"></i>
                <div>Shyam Metha</div>
                <p>After improving my resume using the ATS suggestions, I started receiving interview calls within two weeks. The skill gap analysis helped me understand exactly what recruiters were looking for.</p>
            </div>
            <div className="home-Intro1-review1">
                <i class="fa-solid fa-circle-user"></i>
                <div>Ram Yadhav`        </div>
                <p>After improving my resume using the ATS suggestions, I started receiving interview calls within two weeks. The skill gap analysis helped me understand exactly what recruiters were looking for.</p>
            </div>
        </div>
    </div>
    <div className="home-Intro2">
        <img src={Resume} alt="" />
    </div>
    </div> 
        <div className="home-features">
            <div className="feature">
            Measure how ATS-friendly your resume is.    
            </div>
            <div className="feature">
            Identify technical and soft skills from your resume.
            </div>
            <div className="feature">
            Improve weak bullet points with AI suggestions.
            </div>
            <div className="feature">
            Generate interview questions based on your resume.
            </div>
            <div className="feature">
            Create personalized cover letters for any job.
            </div>
        </div>
    </div>
    </>
}
export default Home;