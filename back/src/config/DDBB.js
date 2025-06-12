const mongoose = require('mongoose');
const config = require('./config.js');

const user = config.DB_USER;
const pass = config.DB_PASS;
const name = config.DB_NAME;

const connectDB = async () => {

    try {
        await mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.ytimgra.mongodb.net/${name}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Server connection successful');
    } catch (error) {
        console.log('There was an error trying to connect to the DB', error);
    }    
}

module.exports = connectDB;