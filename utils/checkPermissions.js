const CustomError = require('../errors');

const checkPermission = (requestUser,reqUserId)=>{
    if(requestUser.role==='Admin') return;
    if(requestUser.userId===reqUserId.toString()) return;
    throw new CustomError.UnauthorisedError('Not authorized to access this route');
}
module.exports=checkPermission