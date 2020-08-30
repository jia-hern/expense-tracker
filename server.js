const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
// colors is not necessary but it gives colors to our console
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

//so that can use req.body in transaction.controller.js
app.use(express.json());

//this allows us to see what request are sent in the console
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// app.get('/', (req, res) => res.send('Hello'));
app.use('/api/v1/transactions', transactions);

//can go to localhost:5000 to see it in deployment! (after running npm start in root folder)
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
