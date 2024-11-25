const express = require('express');
const router = express.Router();
const { createEmployee, updateEmployee, deleteEmployee, searchEmployee, upload } = require('../controllers/employeecontroller');

// Route for creating a new employee with image upload
router.post('/employees', upload.single('img'), createEmployee);

// Route for updating an employee with image upload
router.put('/employees/:id', upload.single('img'), updateEmployee);

// Route for deleting an employee
router.delete('/employees/:id', deleteEmployee);

// Route for searching employees by name, email, or designation
router.get('/employees/search', searchEmployee);

module.exports = router;
