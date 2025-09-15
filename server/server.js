const express = require('express');
const cors = require('cors');
const connectDB = require('../config/dD');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Connect to MongoDB
connectDB();

// Export the app as a Vercel serverless function
module.exports = app;
