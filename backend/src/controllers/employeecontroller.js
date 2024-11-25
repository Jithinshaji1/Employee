const multer = require('multer');
const path = require('path');
const Employee = require('../model/EmployeeModel');

// Set up multer disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store the uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename with the file extension
    },
});

// Filter to accept only image files (optional)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png']; // Only allow jpeg and png images
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        cb(new Error('Only JPEG and PNG images are allowed'), false); // Reject non-JPEG/PNG files
    }
};

// Multer middleware for image upload
const upload = multer({ storage, fileFilter });

// Create Employee Controller
const createEmployee = async (req, res) => {
    const { name, email, phoneNumber, gender, designation, education } = req.body;
    const img = req.file ? req.file.path : ''; // Get the image path from multer

    try {
        // Check if email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        // Create new employee
        const newEmployee = new Employee({
            name,
            email,
            phoneNumber,
            gender,
            designation,
            education,
            img, // Store the image path in the database
        });

        // Save employee to the database
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Employee Controller
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, gender, designation, education } = req.body;
    const img = req.file ? req.file.path : ''; // Get the image path from multer (if uploaded)

    try {
        // Find employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee fields
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.phoneNumber = phoneNumber || employee.phoneNumber;
        employee.gender = gender || employee.gender;
        employee.designation = designation || employee.designation;
        employee.education = education || employee.education;
        employee.img = img || employee.img; // Update image if new one is uploaded

        // Save updated employee
        await employee.save();
        res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Employee Controller
const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        // Find employee by ID
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Delete employee
        await employee.remove();
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Search Employee Controller (by name, email, or designation)
const searchEmployee = async (req, res) => {
    const { query } = req.query; // The query parameter for search

    try {
        // If no query is provided, return all employees
        let employees;
        if (query) {
            // Search employees by name, email, or designation (case-insensitive)
            employees = await Employee.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } },
                    { designation: { $regex: query, $options: 'i' } },
                ],
            });
        } else {
            // Return all employees if no search query is provided
            employees = await Employee.find();
        }

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json({ message: 'Employees found', employees });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Export the controller functions
module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee,
    upload,  // Export multer upload middleware for use in routes
};
