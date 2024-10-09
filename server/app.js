const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const taskRoutes = require('./Routes/taskRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userAuth');

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes)
app.use(taskRoutes)

// server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
