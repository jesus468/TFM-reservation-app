const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://enmanueljesusjv:nhAbZk2ppNfjL7bR@cluster0.ytimgra.mongodb.net/TFMDDBB?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('Server connection successful');
    } catch (error) {
        console.log('There was an error trying to connect to the DB');
    }    
}

module.exports = connectDB;