const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number']
        
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    education: {
        type: [String],
        default: []
    }, // Array of strings
    img: {
        type: String,
        default: ''
    },
    createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);