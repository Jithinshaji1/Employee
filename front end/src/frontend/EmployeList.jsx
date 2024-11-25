import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import './CSS/EmployeList.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/employee/employees/search");
        setEmployees(response.data.employees);
        setTotalEmployees(response.data.employees.length);
      } catch (err) {
        setError("Failed to fetch employees. Please try again.",err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employee/employees?search=${searchTerm}`
      );
      setEmployees(response.data.employees);
      setTotalEmployees(response.data.employees.length);
    } catch (err) {
      setError("Failed to search employees. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!selectedEmployee) return;
    setLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/employee/employees/${selectedEmployee._id}`
      );
      setEmployees((prev) =>
        prev.filter((emp) => emp._id !== selectedEmployee._id)
      );
      setTotalEmployees((prev) => prev - 1);
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete employee. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => navigate("/create");
  const handleEdit = (employee) => navigate(`/update/${employee._id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="employee">
      <h2>Employee List</h2>
      <div className="actions">
        <button onClick={handleCreate} className="create">Create Employee</button>
        <div>
          <label htmlFor="search">Search: </label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees by name"
            style={{ padding: "5px", fontSize: "16px" }}
          />
          <button onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
        <strong>Total Employees: {totalEmployees}</strong>
      </div>

      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={(employee) => {
          setSelectedEmployee(employee);
          setShowDeleteModal(true);
        }}
      />

     
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h5>Confirm Deletion</h5>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedEmployee.name}</strong>?
            </p>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="delete-btn">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
