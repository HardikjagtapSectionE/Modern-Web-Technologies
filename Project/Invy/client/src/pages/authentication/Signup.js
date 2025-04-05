import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^@]+@\w+(\.\w+)+\w$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async () => {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return;
    }
    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!validatePassword(password)) {
      alert("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful!");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
   <div>
         <div className="signup-logo" style={{ float: "left", width: "50%" }}>
           <img src="/images/invy.png" alt="Invy Logo" />
         </div>
   
         <div className="signup-nav-links" id="signup-navlinks" style={{ float: "right", width: "50%" }}>
           <ul>
             <li><Link to="/">HOME</Link></li>
             <li><Link to="/about">ABOUT</Link></li>
             <li><Link to="/login">LOGIN</Link></li>
             <li><Link to="/contact">CONTACT</Link></li>
           </ul>
         </div>

      {/* Signup Form */}
      <div className="signup-content-container">
        <div className="signup-form-container">
          <div className="signup-form-header-container">
            <h3>SIGN UP</h3>
          </div>
          <div className="signup-form-content-container">
            <div className="signup-form-content-inner-container">
              {/* Full Name */}
              <div className="input-container">
                <FontAwesomeIcon icon={faUser} className="input-icon" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="input-container">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
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

              {/* Signup Button */}
              <div className="signup-button-container">
                <button onClick={handleSignup}>SIGN UP</button>
              </div>

              {/* OR Divider */}
              <div className="signup-or">
                <p>OR</p>
              </div>

              {/* Google Signup */}
              <div className="signup-icon">
                <button>
                  <img src="/images/signin.png" alt="Sign in with Google" />
                </button>
              </div>

              {/* Already have an account? */}
              <div className="signup-login">
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
