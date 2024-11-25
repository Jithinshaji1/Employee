const app = require('./app'); // Import the app module

const PORT = process.env.PORT || 5000;  // Use the port from environment variables or default to 5000

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
