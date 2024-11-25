const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./src/Routes/Adminrote'); 
const EmployeeRoutes=require('./src/Routes/EmployeeRoutes') // Adjust path as needed

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  
app.use(cors());  // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.static(path.join(__dirname, 'uploads'))); 

// Routes
app.use('/api/admin', adminRoutes);  // Use the admin authentication routes
app.use('/api/employee',EmployeeRoutes)
// Database connection (MongoDB)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI||'mongodb://localhost:27017/employee', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);  // Exit the process with failure
    }
};

// Connect to MongoDB
connectDB();

module.exports=app;