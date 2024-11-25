import { useState } from "react";
import axios from "axios";
import './CSS/CreateEmployee.css';

const CreateEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [designation, setDesignation] = useState("");
    const [education, setEducation] = useState([]);
    const [img, setImg] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phoneNumber", phoneNumber);
        formData.append("gender", gender);
        formData.append("designation", designation);
        formData.append("education", education.join(", "));
        if (img) formData.append("img", img);

        try {
            const response = await axios.post("http://localhost:5000/api/employee/employees", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                setSuccess("Employee created successfully!");
                setName("");
                setEmail("");
                setPhoneNumber("");
                setGender("");
                setDesignation("");
                setEducation([]);
                setImg(null);
            }
        } catch (err) {
            console.error("Error creating employee:", err);
            setError("Failed to create employee. Please try again.");
        }
    };

    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };

    const handleEducationChange = (e) => {
        const value = e.target.value;
        setEducation((prev) =>
            prev.includes(value) ? prev.filter((edu) => edu !== value) : [...prev, value]
        );
    };

    return (
        <div className="create-employee-container">
            <h2 className="title">Create Employee</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <form onSubmit={handleSubmit} className="employee-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                    className="elements"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />
                
                
                    <label>Email:</label>
                    <input
                    className="elements"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
               
                    <label>Phone Number:</label>
                    <input
                    className="elements"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        required
                    />

                    <label>Designation:</label>
                    <select value={designation} onChange={(e) => setDesignation(e.target.value)} required
                        className="elements">
                        <option value="">Select designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    </div>
            
                     <div className="group">
                    <label>Gender:</label>
                    <label>
                        <input
                        className="elements"
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                        className="elements"
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={(e) => setGender(e.target.value)}
                            required
                        />
                        Female
                    </label>
              
                    <label>Education:</label>
                    <label>
                        <input
                        className="elements"
                            type="checkbox"
                            value="BCA"
                            onChange={handleEducationChange}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="MCA"
                            onChange={handleEducationChange}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="BS"
                            onChange={handleEducationChange}
                        />
                        BS
                    </label>
                    </div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
            
                <button type="submit" className="createbutton">Create Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
