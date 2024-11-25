import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './CSS/update.css'
const UpdateEmployee = () => {
    const { id } = useParams();  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [designation, setDesignation] = useState("");
    const [education, setEducation] = useState([]);
    const [img, setImg] = useState(null);
    const [currentImg, setCurrentImg] = useState("");  
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");



    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
                const data = response.data;
                setName(data.name);
                setEmail(data.email);
                setPhoneNumber(data.phoneNumber);
                setGender(data.gender);
                setDesignation(data.designation);
                setEducation(data.education.split(", "));
                setCurrentImg(data.img); 
            } catch (err) {
                console.error("Error fetching employee data:", err);
                setError("Failed to load employee data.");
            }
        };

        fetchEmployeeData();
    }, [id]);

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
            const response = await axios.put(`http://localhost:5000/api/employees/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                setSuccess("Employee updated successfully!");
                setName("");
                setEmail("");
                setPhoneNumber("");
                setGender("");
                setDesignation("");
                setEducation([]);
                setImg(null);
                setCurrentImg("");  
            }
        } catch (err) {
            console.error("Error updating employee:", err);
            setError("Failed to update employee. Please try again.");
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
        <div>
            <h2>Update Employee</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <select value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                        <option value="">Select designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Male"}
                            required
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={(e) => setGender(e.target.value)}
                            checked={gender === "Female"}
                            required
                        />
                        Female
                    </label>
                </div>
                <div>
                    <label>Education:</label>
                    <label>
                        <input
                            type="checkbox"
                            value="BCA"
                            onChange={handleEducationChange}
                            checked={education.includes("BCA")}
                        />
                        BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="MCA"
                            onChange={handleEducationChange}
                            checked={education.includes("MCA")}
                        />
                        MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="BS"
                            onChange={handleEducationChange}
                            checked={education.includes("BS")}
                        />
                        BS
                    </label>
                </div>
                <div>
                    <label>Image:</label>
                    {currentImg && <img src={currentImg} alt="Current employee" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />}
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <button type="submit" className="updatebtn">Update</button>
            </form>
        </div>
    );
};

export default UpdateEmployee;
