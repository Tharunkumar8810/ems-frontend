import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EmployeeList.css";
import API_BASE_URL from "../config";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchDept, setSearchDept] = useState("");
    const navigate = useNavigate();

    // Fetch all employees
    useEffect(() => {
        fetch(API_BASE_URL)
            .then((res) => res.json())
            .then((data) => setEmployees(Array.isArray(data) ? data : [data]))
            .catch((err) => console.error(err));
    }, []);

    // Search by name
    const handleSearchByName = () => {
        fetch(`${API_BASE_URL}/search/name?name=${searchName}`)
            .then((res) => res.json())
            .then((data) => setEmployees(Array.isArray(data) ? data : [data]))
            .catch((err) => console.error(err));
    };

    // Search by department
    const handleSearchByDept = () => {
        const url = searchDept
            ? `${API_BASE_URL}/search/department?department=${searchDept}`
            : API_BASE_URL;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setEmployees(Array.isArray(data) ? data : [data]))
            .catch((err) => console.error(err));
    };

    // Delete employee
    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" })
            .then(() => setEmployees(employees.filter((emp) => emp.id !== id)))
            .catch((err) => console.error(err));
    };

    return (
        <div className="employee-list-container">
            <div className="controls">
                <button className="add-btn" onClick={() => navigate("/add")}>
                    Add Employee
                </button>

                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <button className="search-btn" onClick={handleSearchByName}>
                    Search
                </button>

                <select
                    value={searchDept}
                    onChange={(e) => setSearchDept(e.target.value)}
                >
                    <option value="">All Departments</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                </select>
                <button className="search-btn" onClick={handleSearchByDept}>
                    Filter
                </button>
            </div>

            <h2>Employee Details</h2>

            <div className="table-wrapper">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job Title</th>
                            <th>Salary</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.id}>
                                <td data-label="ID">{emp.id}</td>
                                <td data-label="Name">{emp.name}</td>
                                <td data-label="Email">{emp.email}</td>
                                <td data-label="Job Title">{emp.jobTitle}</td>
                                <td data-label="Salary">{emp.salary}</td>
                                <td data-label="Department">{emp.department}</td>
                                <td>
                                    <button
                                        className="update-btn"
                                        onClick={() => navigate(`/edit/${emp.id}`)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(emp.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeeList;
