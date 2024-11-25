const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/AuthController'); // Adjust path as needed

// Route for registering a new admin
router.post('/register', registerAdmin);

// Route for admin login
router.post('/login', loginAdmin);

// Route for admin logout
router.post('/logout', logoutAdmin);

module.exports = router;
