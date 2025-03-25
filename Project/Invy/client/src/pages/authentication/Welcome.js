import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleStart = () => {
    navigate("../dashboard/Dashboard"); // Navigate to Dashboard page
  };

  return (
    <div className="welcome-section">
      <center>
        <div className="welcome-box">
          <h1 className="welcome-heading">Welcome to Invy</h1>
          <img src="./images/invylogo.png" alt="Invy Logo" className="welcome-logo" />
          <br />
          <div className="user-email">
            <b>
              <span id="user" className="welcome-message">
                Hello, <span>Email-id</span>
              </span>
            </b>
          </div>
          <div className="welcome-text">
            <b>
              <span>You are successfully logged in!!!</span>
            </b>
          </div>
          <br />
          <button className="start-btn" onClick={handleStart}>Let's Get Started</button>
        </div>
      </center>
    </div>
  );
};

export default WelcomePage;
