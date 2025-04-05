import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [profileImage, setProfileImage] = useState("/images/profile.jpg"); // default image
  const [profileData, setProfileData] = useState({
    ownerName: "",
    shopName: "",
    username: "",
    emailid: "",
    mobileno: "",
    address: "",
  });

  // Toggle sidebar
  const toggleSidebar = () => setSidebarExpanded(!isSidebarExpanded);

  // Handle profile image change
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0])); // Update profile image state
    }
  };

  // Fetch user profile data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      .then((response) => {
        setProfileData(response.data);
        if (response.data.profileImage) setProfileImage(response.data.profileImage);
      })
      .catch((error) => console.error("Error fetching profile data", error));
  }, []);  

  // Handle input field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission (save profile data)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare FormData to include image and other data
    const formData = new FormData();
    formData.append("ownerName", profileData.ownerName);
    formData.append("shopName", profileData.shopName);
    formData.append("username", profileData.username);
    formData.append("emailid", profileData.emailid);
    formData.append("mobileno", profileData.mobileno);
    formData.append("address", profileData.address);

    // If there's a new profile image, append it to FormData
    const imageFile = document.querySelector('input[type="file"]').files[0];
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    // Send updated profile data to backend
    axios
      .put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response); // Log the response
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile", error.response); // Log the error response
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="dashboard-container">
      <div id="mySidenav" className={`sidenav ${isSidebarExpanded ? "" : "collapsed"}`}>
        <p className="logo"><span>I</span>-nvy</p>
        <Link to="/dashboard" className="icon-a">Dashboard</Link>
        <Link to="/profile" className="icon-a">Profile</Link>
        <Link to="/inventory" className="icon-a">Inventory</Link>
        <Link to="/staff" className="icon-a">Staff Management</Link>
        <Link to="/billing" className="icon-a">Billing Management</Link>
        <Link to="/login" className="icon-a">Logout</Link>
      </div>

      <div id="main" className={isSidebarExpanded ? "" : "collapsed"}>
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Profile</span>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <input type="file" className="file-input" onChange={handleImageChange} />
            <button className="upload-button">Upload</button>
          </div>

          <div className="profile-maincontent">
            <form className="profile-form" onSubmit={handleSubmit}>
              <label className="label2">Owner Name</label>
              <input 
                type="text" 
                name="ownerName" 
                value={profileData.ownerName} 
                onChange={handleInputChange} 
                required 
              />

              <label className="label2">Shop Name</label>
              <input 
                type="text" 
                name="shopName" 
                value={profileData.shopName} 
                onChange={handleInputChange} 
                required 
              />

              <label className="label2">Username</label>
              <input 
                type="text" 
                name="username" 
                value={profileData.username} 
                onChange={handleInputChange} 
                required 
              />

              <label className="label2">Email-id</label>
              <input 
                type="email" 
                name="emailid" 
                value={profileData.emailid} 
                onChange={handleInputChange} 
                required 
              />

              <label className="label2">Mobile no.</label>
              <input 
                type="tel" 
                name="mobileno" 
                value={profileData.mobileno} 
                onChange={handleInputChange} 
                required 
              />

              <label className="label2">Address</label>
              <input 
                type="text" 
                name="address" 
                value={profileData.address} 
                onChange={handleInputChange} 
                required 
              />

              <button type="submit" className="save-button">SAVE PROFILE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
