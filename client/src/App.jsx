
import Login from './pages/login/login.jsx'
import Register from './pages/register/Register.jsx'
import Home from './pages/home/Home.jsx'
import Navbar from './component/navbar/Navbar.jsx'
import Footer from './component/footer/Footer.jsx'
import ResumeUpload from './pages/resumeUpload/ResumeUpload.jsx'
import {Routes,Route} from "react-router-dom"
import ProtectedRoutes from './util/ProtectedRoutes.jsx'
import ResumeDetails from './pages/resumeDetails/ResumeDetails.jsx'
import InterviewQuestion from './pages/interviewQuestion/InterviewQuestion.jsx'
import ResumeInterviewQuestion from './pages/resumeInterviewQuestion/ResumeInterviewQuestion.jsx'
import RoadMap from './pages/RoadMap/RoadMap.jsx'
function App() {

  return (
    <>
     <Navbar/>
    <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/" element={<Home/>}/>
     <Route element={<ProtectedRoutes/>}>
     <Route path="/resumeupload" element={<ResumeUpload/>}/>
     <Route path="/resumedetails" element={<ResumeDetails/>}/>
     <Route path="/interviewquestion" element={<InterviewQuestion/>}/>
     <Route path="/resumeinterviewquestion/:id" element={<ResumeInterviewQuestion/>}/>
     <Route path="/roadmap" element={<RoadMap/>}/>

     </Route>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
