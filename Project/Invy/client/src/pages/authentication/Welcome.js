import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Welcome.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login"); // Redirect if not logged in
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (response.ok) {
          setUserEmail(data.email);
        } else {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleStart = () => {
    navigate("../Dashboard");
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
                Hello, <span>{userEmail ? userEmail : "Guest"}</span>
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
