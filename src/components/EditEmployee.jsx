import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/EditEmployee.css";
import API_BASE_URL from "../config";

function EditEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

 // Fetch employee by ID
useEffect(() => {
  fetch(`${API_BASE_URL}/${id}`)
    .then((res) => res.json())
    .then((data) => setEmployee(data))
    .catch((err) => console.error(err));
}, [id]);


  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };


// Update employee
const handleSubmit = (e) => {
  e.preventDefault();
  fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  })
    .then((res) => {
      if (res.ok) {
        setMessage("Employee updated successfully!");
      } else {
        setMessage("Failed to update employee.");
      }
    })
    .catch(() => setMessage("Error occurred while updating employee."));
};

  return (
    <div className="edit-employee-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={employee.name || ""} onChange={handleChange} required />
        <input type="email" name="email" value={employee.email || ""} onChange={handleChange} required />
        <input type="text" name="jobTitle" value={employee.jobTitle || ""} onChange={handleChange} required />
        <input type="number" name="salary" value={employee.salary || ""} onChange={handleChange} required />

        {/* Department Dropdown */}
        <select name="department" value={employee.department || ""} onChange={handleChange} required>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <button type="submit">Update Employee</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button className="back-btn" onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
}

export default EditEmployee;
