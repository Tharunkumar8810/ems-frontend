import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddEmployee.css";
import API_BASE_URL from "../config";

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    jobTitle: "",
    salary: "",
    department: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(employee),
  })
    .then((res) => {
      if (res.ok) {
        setMessage("Employee added successfully!");
        setEmployee({ name: "", email: "", jobTitle: "", salary: "", department: "" });
      } else {
        setMessage("Failed to add employee.");
      }
    })
    .catch(() => setMessage("Error occurred while adding employee."));
};


  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
        <input type="text" name="jobTitle" placeholder="Job Title" value={employee.jobTitle} onChange={handleChange} required />
        <input type="number" name="salary" placeholder="Salary" value={employee.salary} onChange={handleChange} required />

        {/* Department Dropdown */}
        <select name="department" value={employee.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <button type="submit">Add Employee</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button className="back-btn" onClick={() => navigate("/")}>Back to List</button>
    </div>
  );
}

export default AddEmployee;
