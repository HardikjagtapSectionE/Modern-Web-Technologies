import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./Inventory.css";

const Inventory = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [inventoryData, setInventoryData] = useState([]);
  const [formData, setFormData] = useState({
    sname: '',
    sprice: '',
    squantity: '',
    stotal: '',
    sattnd: '',
  });
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const token = localStorage.getItem("token");

  // Fetch inventory data on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/inventory", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setInventoryData(res.data))
    .catch(err => console.error("Error fetching inventory:", err));
  }, [token]);

  // Input change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [id]: value };
      if (id === "sprice" || id === "squantity") {
        updated.stotal = calculateTotal(updated.sprice, updated.squantity);
      }
      return updated;
    });
  };

  // Total price calculation
  const calculateTotal = (price, quantity) => {
    const p = parseFloat(price) || 0;
    const q = parseInt(quantity) || 0;
    return p * q;
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedId) {
        await axios.put(`http://localhost:5000/api/inventory/${selectedId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/inventory", formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Refresh list
      const res = await axios.get("http://localhost:5000/api/inventory", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInventoryData(res.data);
      resetForm();
      document.getElementById('inventory-overlay').style.display = 'none';
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to save item.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      sname: '',
      sprice: '',
      squantity: '',
      stotal: '',
      sattnd: '',
    });
    setSelectedId(null);
  };

  // Edit item
  const onEdit = (item) => {
    setFormData(item);
    setSelectedId(item._id);
    document.getElementById('inventory-overlay').style.display = 'block';
  };

  // Delete item
  const onDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/inventory/${_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInventoryData(inventoryData.filter(item => item._id !== _id));
      } catch (err) {
        console.error("Error deleting item:", err);
        alert("Failed to delete item.");
      }
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  const filteredData = inventoryData.filter(item =>
    item.sname.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <span className="nav" onClick={() => setSidebarExpanded(!isSidebarExpanded)}>☰ Inventory</span>
        </div>

        <div className="inventory-main-content">
          <div className="inventory-box">
            <div className="inventory-search">
              <input type="text" id="inventory-srch" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
              <button type="submit" className="inventory-srchbtn">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <button className="inventory-button" onClick={() => document.getElementById('inventory-overlay').style.display = 'block'}>
              Insert Data
            </button>
          </div>

          {/* Popup Form */}
          <div id="inventory-overlay" style={{ display: 'none' }}>
            <div id="inventory-popup">
              <div className="inventory-popup-controls">
                <span id="inventory-popupclose" onClick={() => document.getElementById('inventory-overlay').style.display = 'none'}>
                  &times;
                </span>
              </div>
              <div className="inventory-popup-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <label>Product Name*</label><br />
                  <input type="text" id="sname" required value={formData.sname} onChange={handleChange} /><br />

                  <label>Price*</label><br />
                  <input type="number" id="sprice" required value={formData.sprice} onChange={handleChange} /><br />

                  <label>Quantity*</label><br />
                  <input type="number" id="squantity" required value={formData.squantity} onChange={handleChange} /><br />

                  <label>Total amount*</label><br />
                  <input type="number" id="stotal" readOnly required value={formData.stotal} /><br />

                  <label>Expire date*</label><br />
                  <input type="date" id="sattnd" required value={formData.sattnd} onChange={handleChange} /><br />

                  <div className="inventory-form-action-buttons">
                    <button type="submit" id="inventory-add">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="inventory-list" id="inventory-ItemList">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Expire Date</th>
                <th><span id="inventory-set">&#9881;</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item._id}>
                  <td>{item.sname}</td>
                  <td>{item.sprice}</td>
                  <td>{item.squantity}</td>
                  <td>{item.stotal}</td>
                  <td>{item.sattnd}</td>
                  <td>
                    <a href="#!" onClick={() => onEdit(item)}>Edit / </a>
                    <a href="#!" onClick={() => onDelete(item._id)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
