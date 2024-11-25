const Admin = require('../model/UserModel'); // Make sure to adjust the path according to your structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register Controller
const registerAdmin = async (req, res) => {
    const { Name, password } = req.body;

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ Name });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new Admin({
            Name,
            password: hashedPassword,
        });

        // Save admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login Controller
const loginAdmin = async (req, res) => {
    const { Name, password } = req.body;

    try {
        // Find the admin by name
        const admin = await Admin.findOne({ Name });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time (1 hour)
        });

        // Send response with token
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout Controller
const logoutAdmin = (req, res) => {
    // For the purpose of this example, we simply clear the JWT token in the frontend (no server-side logic needed).
    // Typically, we could add token blacklist functionality here.
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
};
