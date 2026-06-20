const User = require('../models/usermodel');
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors');
const {attachcookiesToResponse,createTokenUser} = require('../utils');
const register = async(req,res)=>{
    const {email,name,password}=req.body;
    const emailAlreadyExists = await User.findOne({email});
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email Already Exists')
    }
    // First registered user becomes admin
    const isFirstaccount = await (User.countDocuments({}))===0;
    const role = isFirstaccount?"Admin":"User";
    const user = await User.create({name,email,password,role})
    //send as token
    // const userToken = {name:user.name,userId:user._id,role:user.role};
    const userToken = createTokenUser(user);
    //
    attachcookiesToResponse({res,userToken});
    res.status(StatusCodes.CREATED).json({user:userToken});
};
const login = async(req,res)=>{
    const {email ,password}=req.body;
    if(!email || !password){
        throw new CustomError.BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    const passwordMatch=await user.comparePassword(password)
    if(!passwordMatch){
        throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }
    // const userToken = {name:user.name,userId:user._id,role:user.role};
    const userToken = createTokenUser(user);
    attachcookiesToResponse({res,userToken});
    res.status(StatusCodes.OK).json({user:userToken});
};
const logout = async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires: new Date(Date.now() + 5000)
    })
    res.status(StatusCodes.OK).send('Logout');
};

module.exports={register,login,logout}