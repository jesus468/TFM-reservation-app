require('dotenv').config();

console.log('en el config:', process.env.DB_NAME);

module.exports = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '3000',
    DB_USER: process.env.DB_USER ,
    DB_PASS: process.env.DB_PASS, 
    DB_NAME: process.env.DB_NAME, 
    API_URL: process.env.API_URL || `http://${process.env.DB_HOST}:${process.env.DB_PORT}`
}