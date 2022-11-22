const User = require('../models/user');
const {StatusCodes} =require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')
const  {attachCookiesToResponse} = require( '../utils')


const register = async (req, res) => {
    const {email, name, password} = req.body;

    const emailAlreadyExists = await User.findOne({email})
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email Already Exists')
    }

    //First registered User automatically becomes an admin
    const isFirstAccount = (await User.countDocuments({}))=== 0;
    const role = isFirstAccount ? 'admin' : "user" ;
    const user = await User.create({ email, name, password, role }) 

    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    
attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({ user: tokenUser})
    
};
const login = async (req, res) => {
    //Email and Password validation
    const {email,password} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('Please Provide email anf password')
    }
    //Check email match
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    //check Password match
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

};
const logout = async (req, res) => { 
    res.send('logout User')
};


module.exports = {register, login, logout};