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
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch inventory data when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory")  // Make sure the URL is correct
      .then((response) => {
        setInventoryData(response.data);  // Set the fetched data to the state
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
      });
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [id]: value };

      // If either price or quantity is changed, recalculate total
      if (id === 'sprice' || id === 'squantity') {
        updatedData.stotal = calculateTotal(updatedData.sprice, updatedData.squantity);
      }

      return updatedData;
    });
  };

  // Recalculate total
  const calculateTotal = (price, quantity) => {
    const p = parseFloat(price) || 0; // Ensure it's a number
    const q = parseInt(quantity) || 0; // Ensure it's a number
    return p * q;
  };

  // Handle form submission (Add or update inventory item)
  const handleSubmit = (event) => {
    event.preventDefault();
    const newInventoryData = { ...formData, id: Date.now() };
    if (selectedRow) {
      // Update the inventory data for the selected row
      setInventoryData(
        inventoryData.map((item) =>
          item.id === selectedRow.id ? newInventoryData : item
        )
      );
    } else {
      // If no row is selected, add new data
      setInventoryData([...inventoryData, newInventoryData]);
    }

    resetForm();
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      sname: '',
      sprice: '',
      squantity: '',
      stotal: '',
      sattnd: '',
    });
    setSelectedRow(null);
  };

  // Handle row edit
  const onEdit = (id) => {
    const item = inventoryData.find((item) => item.id === id);
    setFormData(item);
    setSelectedRow(item);  // Set the selected row to update
    document.getElementById('inventory-overlay').style.display = 'block';
  };

  // Handle row delete
  const onDelete = (id) => {
    if (window.confirm('Are you sure to delete this record?')) {
      setInventoryData(inventoryData.filter((item) => item.id !== id));
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter inventory data based on search query
  const filteredInventoryData = inventoryData.filter((item) =>
    item.sname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div id="mySidenav" className={`sidenav ${isSidebarExpanded ? "" : "collapsed"}`}>
        <p className="logo">
          <span>I</span>-nvy
        </p>
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
              <input
                type="text"
                id="inventory-srch"
                placeholder="Search.."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button type="submit" className="inventory-srchbtn">
                <i className="fa fa-search"></i>
              </button>
            </div>
            <button
              className="inventory-button"
              onClick={() => document.getElementById('inventory-overlay').style.display = 'block'}
            >
              Insert Data
            </button>
          </div>

          {/* Popup for Insert Data */}
          <div id="inventory-overlay" style={{ display: 'none' }}>
            <div id="inventory-popup">
              <div className="inventory-popup-controls">
                <span
                  id="inventory-popupclose"
                  onClick={() => (document.getElementById('inventory-overlay').style.display = 'none')}
                >
                  &times;
                </span>
              </div>
              <div className="inventory-popup-content">
                <form onSubmit={handleSubmit} autoComplete="off">
                  <div>
                    <label>Product Name*</label><br />
                    <input
                      type="text"
                      id="sname"
                      required
                      value={formData.sname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Price*</label><br />
                    <input
                      type="number"
                      id="sprice"
                      required
                      value={formData.sprice}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Quantity*</label><br />
                    <input
                      type="number"
                      id="squantity"
                      required
                      value={formData.squantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Total amount*</label><br />
                    <input
                      type="number"
                      id="stotal"
                      required
                      readOnly
                      value={formData.stotal}
                    />
                  </div>
                  <div>
                    <label>Expire date*</label><br />
                    <input
                      type="date"
                      id="sattnd"
                      required
                      value={formData.sattnd}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inventory-form-action-buttons">
                    <button type="submit" id="inventory-add">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <table className="inventory-list" id="inventory-ItemList">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Product Name</th>
                <th style={{ width: '10%' }}>Price</th>
                <th style={{ width: '10%' }}>Quantity</th>
                <th style={{ width: '20%' }}>Total amount</th>
                <th style={{ width: '20%' }}>Expire date</th>
                <th style={{ width: '15%' }}><span id="inventory-set">&#9881;</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredInventoryData.map((item) => (
                <tr key={item.id}>
                  <td>{item.sname}</td>
                  <td>{item.sprice}</td>
                  <td>{item.squantity}</td>
                  <td>{item.stotal}</td>
                  <td>{item.sattnd}</td>
                  <td>
                    <a href="#!" onClick={() => onEdit(item.id)}>Edit / </a>
                    <a href="#!" onClick={() => onDelete(item.id)}>Delete</a>
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
