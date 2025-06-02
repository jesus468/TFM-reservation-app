const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
/*
    blindar el app
*/


app.use(express.json());

app.use('/api', userRoutes);

app.use('/', notFoundHandler)
app.use(errorHandler);

module.exports = app;