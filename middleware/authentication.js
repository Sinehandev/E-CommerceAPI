const jwt = require('jsonwebtoken')
const CustomError = require('../errors');
const {verifyJWT}=require('../utils');

const authenticateUser = async(req, res, next) => {
    const token = req.signedCookies.token;//signedCookies is a name
    if(!token) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    try {
        const {name, userId, role} =  verifyJWT({token});
        req.user = {name, userId, role};  // Now controllers can use req.user!
    } catch (error) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    next();
};
const authorizePermission = (...roles)=>{
    // if(req.user.role !== 'Admin'){
    //     throw new CustomError.UnauthorisedError('Unauthorised')
    // }
    // next();
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorisedError('Unauthorised')
        };
        next();
    }

    
}

module.exports={authenticateUser,authorizePermission}