const User = require('../models/usermodel');
const {StatusCodes}=require('http-status-codes');
const CustomError=require('../errors');
const {createTokenUser,attachcookiesToResponse,checkPermission}=require('../utils')

const getAllusers = async(req,res)=>{
    const users = await User.find({role:'User'}).select('-password')
    res.status(StatusCodes.OK).json({users})
}
const getSingleuser = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id}).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No User found with this id : ${req.params.id}`)
    }
    checkPermission(req.user,user._id)
    res.status(StatusCodes.OK).json({user})
}
const showCurrenuser= (req,res)=>{
    res.status(StatusCodes.OK).json({user:req.user})
}
const updateuser = async (req,res)=>{
    const {email,name}=req.body;
    if(!email || !name){
        throw new CustomError.BadRequestError("Please provide all values");
    }
    const user = await User.findOneAndUpdate({_id:req.user.userId},
    {
        email,name
    },
    {
        new:true,
        runValidators:true
    })
    const tokenuser = createTokenUser(user)
    attachcookiesToResponse({res,userToken:tokenuser})
    res.status(StatusCodes.OK).json({user:tokenuser})
}
const updateuserPassword = async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Provide both Credentials!')
    };
    const user = await User.findOne({_id:req.user.userId});
    const isPasswordcorrect = await user.comparePassword(oldPassword)
    if(!isPasswordcorrect){
        throw new CustomError.UnauthenticatedError("Invalid Credentials")
    }
    user.password=newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg:'Password Updated!'})
}
module.exports={
    getAllusers,getSingleuser,showCurrenuser,updateuserPassword,updateuser
}
