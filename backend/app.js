const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const documentRoute = require('./routes/document');
const progressRoute = require('./routes/progress');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,
() => console.log('Connected to DB'))

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/document', documentRoute);
app.use('/api/progress', progressRoute);

//START SERVER
app.listen(8000, () => console.log('Server is running'));
