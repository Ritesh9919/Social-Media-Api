import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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



userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
    next()
})


userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
    return token;
}


export const User = mongoose.model('User', userSchema);
