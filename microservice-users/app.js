const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app =express();
app.use(express.json());

// connection 
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB users connected '))
        .catch(err => console.log(err));


// Routes 
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));