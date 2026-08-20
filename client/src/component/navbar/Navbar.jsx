import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const user = localStorage.getItem("user");
      if (user) {
        setUsername(user);
      } else {
        setUsername("");
      }
    };

    loadUser();

    window.addEventListener("userLogin", loadUser);
    window.addEventListener("logout", loadUser);

    return () => {
      window.removeEventListener("userLogin", loadUser);
      window.removeEventListener("logout", loadUser);
    };
  }, []);

  const handlelogout = () => {
    const result = window.confirm("Are you sure you want to logout?");
    if (!result) {
      return;
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logout successful");
    window.dispatchEvent(new Event("logout"));
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <i className="fa-regular fa-file"></i>
        <p>
          <span>AI</span> Resume Analyzer
        </p>
      </div>

      <div className="navbar-tabs">
        <Link to="/" className="navbar-navigate-tab">
          Home
        </Link>
        <Link to="/resumeupload" className="navbar-navigate-tab">
          Upload Resume
        </Link>
        <Link to="/interviewquestion" className="navbar-navigate-tab">
          Interview Questions
        </Link>
        <Link to="/roadmap" className="navbar-navigate-tab">
          Roadmap
        </Link>
      </div>

      <div className="navbar-user">
        {username ? (
          <div className="userInfo">
            <i className="fa-solid fa-circle-user"></i>
            <div className="userName" title={username}>
              {username}
            </div>
            <button onClick={handlelogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav_link">
              Login
            </Link>
            <Link to="/register" className="nav_link">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;