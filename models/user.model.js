const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:[6, 'Password can not be less than 6 character']
    }

},{timestamps:true});


const User = mongoose.model('User', userSchema);
module.exports = User;