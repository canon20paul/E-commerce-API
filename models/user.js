const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please Provide email'],
        validator: {
            validator:validator.isEmail,
            message: 'Please provide valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Please Provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin','user'],
        default: 'user',
    }
  
});
module.exports=mongoose.model('User', UserSchema)