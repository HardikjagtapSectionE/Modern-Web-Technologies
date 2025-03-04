import React, { useState, useEffect } from "react";
import "./Contact.css"; // Updated CSS filename

const Contact = () => {  // Changed the component name
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    function preventBack() {
      window.history.forward();
    }
    setTimeout(preventBack, 0);

    const script = document.createElement("script");
    script.src = "https://smtpjs.com/v3/smtp.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (window.Email) {
      window.Email.send({
        Host: "smtp://sandbox.smtp.mailtrap.io:2525",
        Username: "4b630c4d335521",
        Password: "********94ef",
        To: "hardikjagtap05@gmail.com",
        From: email,
        Subject: subject,
        Body: `
          Name: ${name}
          <br>Email: ${email}
          <br>Subject: ${subject}
          <br>Message: ${message}`,
      }).then((message) => alert("Your message sent successfully"));
    } else {
      alert("Email service is not available.");
    }

    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="contact-page-section">
      <div className="contact-logo" style={{ float: "left", width: "50%" }}>
        <img src="./images/invy.png" alt="Logo" />
      </div>
      <div className="contact-nav-links" id="contact-navlinks" style={{ float: "right", width: "50%" }}>
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li><a href="/login">LOGIN</a></li>
          <li><a href="/contact">CONTACT</a></li>
        </ul>
      </div>

      <div className="contact-text-box">
        <h1>Contact Us</h1>
      </div>

      <section className="contact-form-col">
        <form id="contact-form" onSubmit={sendEmail}>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            required
          />
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter E-mail Address"
            required
          />
          <input
            type="text"
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Your Subject"
            required
          />
          <textarea
            rows="8"
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            required
          ></textarea>
          <center>
            <button type="submit" className="contact-hero-btn">Send Message</button>
          </center>
        </form>
      </section>
    </div>
  );
};

export default Contact;
