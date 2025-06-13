const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://tfm-reservation-app.onrender.com'], 
    credentials: true 
}));


app.use(express.json());
app.use(cookieParser());

app.use(helmet())

const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 100 })
app.use(limiter);


const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

app.use('/', notFoundHandler)
app.use(errorHandler);

module.exports = app;