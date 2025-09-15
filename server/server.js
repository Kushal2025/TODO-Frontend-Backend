const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const connectDB = require('./config/dD');
const taskRoutes = require('./routes/taskRoutes');
const bodyParser = require('body-parser');
dotenv.config();


// connectDB();
connectDB(); // connect to MongoDB
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/tasks',taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
