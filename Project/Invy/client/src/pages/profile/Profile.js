import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";
import "./Profile.css";

const Profile = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [profileImage, setProfileImage] = useState("/images/profile.jpg");
  const [imageFile, setImageFile] = useState(null);
  const [profileData, setProfileData] = useState({
    ownerName: "",
    shopName: "",
    username: "",
    emailid: "",
    mobileno: "",
    address: "",
  });

  const toggleSidebar = () => setSidebarExpanded(!isSidebarExpanded);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setProfileData(response.data);
        if (response.data.profileImage) {
          setProfileImage(`http://localhost:5000${response.data.profileImage}`);
        }
      })
      .catch((error) => console.error("Error fetching profile data", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ownerName", profileData.ownerName);
    formData.append("shopName", profileData.shopName);
    formData.append("username", profileData.username);
    formData.append("emailid", profileData.emailid);
    formData.append("mobileno", profileData.mobileno);
    formData.append("address", profileData.address);
    if (imageFile) {
      formData.append("profileImage", imageFile);
    }

    axios
      .put("http://localhost:5000/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating profile", error.response);
        alert("Failed to update profile.");
      });
  };

  return (
    <div className="dashboard-container">
      <div id="mySidenav" className={`sidenav ${isSidebarExpanded ? "" : "collapsed"}`}>
        <p className="logo"><span>I</span>-nvy</p>
        <Link to="/dashboard" className="icon-a"><i className="fa fa-dashboard icons"></i> Dashboard</Link>
        <Link to="/profile" className="icon-a"><i className="fa fa-user-circle icons"></i> Profile</Link>
        <Link to="/inventory" className="icon-a"><i className="fa fa-tasks icons"></i> Inventory</Link>
        <Link to="/staff" className="icon-a"><i className="fa fa-user-plus icons"></i> Staff Management</Link>
        <Link to="/billing" className="icon-a"><i className="fa fa-calendar icons"></i> Billing Management</Link>
        <Link to="/login" className="icon-a"><i className="fa fa-sign-out icons"></i> Logout</Link>
      </div>

      <div id="main" className={isSidebarExpanded ? "" : "collapsed"}>
        <div className="head">
          <span className="nav" onClick={toggleSidebar}>☰ Profile</span>
        </div>

        <div className="profile-container">
          <div className="profile-card">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <input type="file" className="file-input" onChange={handleImageChange} />
          </div>

          <div className="profile-maincontent">
            <form className="profile-form" onSubmit={handleSubmit}>
              <label className="label2">Owner Name</label>
              <input type="text" name="ownerName" value={profileData.ownerName} onChange={handleInputChange} required />

              <label className="label2">Shop Name</label>
              <input type="text" name="shopName" value={profileData.shopName} onChange={handleInputChange} required />

              <label className="label2">Username</label>
              <input type="text" name="username" value={profileData.username} onChange={handleInputChange} required />

              <label className="label2">Email-id</label>
              <input type="email" name="emailid" value={profileData.emailid} onChange={handleInputChange} required />

              <label className="label2">Mobile no.</label>
              <input type="tel" name="mobileno" value={profileData.mobileno} onChange={handleInputChange} required />

              <label className="label2">Address</label>
              <input type="text" name="address" value={profileData.address} onChange={handleInputChange} required />

              <button type="submit" className="save-button">SAVE PROFILE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
