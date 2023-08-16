const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const sensorRoutes = require('./routes/sensors');
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', sensorRoutes);


//routes
app.get('/',(req,res) => {
    res.send("Welcome to FLOWWATCH API");
}) ;

//mongodb
mongoose
.connect(process.env.MONGODB_JASS)
.then(()=> console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error(error));

app.listen(port, ()=> console.log('server listening on port', port));


