import React, { useEffect } from "react";
import "./Welcome.css";

const WelcomePage = () => {
  useEffect(() => {
    const preventBack = () => {
      window.history.forward();
    };
    setTimeout(preventBack, 0);
    window.onunload = () => null;
  }, []);

  const handleStart = () => {
    console.log("Let's get started");
    // Navigate to the next page or perform another action
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
