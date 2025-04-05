import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        navigate("/welcome");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <div className="login-logo" style={{ float: "left", width: "50%" }}>
        <img src="/images/invy.png" alt="Invy Logo" />
      </div>

      <div className="login-nav-links" id="login-navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/contact">CONTACT</Link></li>
        </ul>
      </div>

      <div id="login-content-container">
        <div id="login-form-container">
          <div id="login-form-header-container">
            <h2 id="login-form-header">LOG IN</h2>
          </div>
          <div id="login-form-content-container">
            <div id="login-form-content-inner-container">
              <div className="input-container">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="input-container password-container">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                  onClick={togglePasswordVisibility}
                ></i>
              </div>

              <div id="login-button-container">
                <button onClick={handleLogin}>LOG IN</button>
              </div>

              <div className="login-forgot">
                <p>
                  <a href=" ">Forgot password?</a>
                </p>
              </div>

              <div className="login-or">
                <p>OR</p>
              </div>

              <div className="login-icon">
                <button>
                  <img src="/images/signin.png" alt="Sign in" />
                </button>
              </div>

              <div className="login-create">
                <p>
                  <a href="/Signup">Create an account</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
