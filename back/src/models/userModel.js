const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    diners: {
        type: Number,
        required : true,
        min : [0, `Diners can´t be less than cero`]
    },
    deposit: {
        type: Number,
        min : [0, `Deposit can´t be less than cero`]
    },
    plates: {
        type: Array
    },
    date: {
        type : Date,
        required : true,
        validate : {
            validator: function(date) {
                return date >= Date.now();
            },
            message: 'Date cant be past'
        }
    }
});

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    secondName: {
        type: String,
        required : true
    },
    mobileNum: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique : true,
        //match: [/.+\@.+\..+/, 'Invalid email']
    },
    reservation: {
        type: [reservationSchema]
    },
    role: {
        type : String,
        default : 'client'
    },
    password : {
        type : String,
        required : true,
        minlength : [ 8 , 'password cant have less than 8 characters']
    }
}) 

const User = mongoose.model('Users', usersSchema);

module.exports = User;

