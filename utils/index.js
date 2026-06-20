const {createJWT }= require('./jwt');
const {verifyJWT} = require('./jwt');
const {attachcookiesToResponse} = require('./jwt');
const createTokenUser=require('./createTokenUser');
const checkPermission= require('./checkPermissions')
module.exports={
    createJWT,verifyJWT,attachcookiesToResponse
,createTokenUser,checkPermission}