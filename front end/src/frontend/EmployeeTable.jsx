
import PropTypes from "prop-types";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Unique ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>Designation</th>
          <th>Gender</th>
          <th>Course</th>
          <th>Create Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee._id}</td>
              <td>
                <img
                  src={
                    employee.img
                      ? `http://localhost:5000/${employee.img}`
                      : "https://uxwing.com/man-user-circle-icon/"
                  }
                  alt={`${employee.name}'s profile`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.education}</td>
              <td>{new Date(employee.createDate).toLocaleDateString()}</td>
              <td>
                <button
                className="usebtn"
                  onClick={() => onEdit(employee)}
                  style={{ marginRight: "5px" }}
          
                >
                  Edit
                </button>
                <button
                className="usebtn"
                  onClick={() => onDelete(employee)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" style={{ textAlign: "center" }}>
              No employees found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

// Prop validation
EmployeeTable.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      img: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      designation: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      education: PropTypes.string,
      createDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeTable;
