const express=require('express');
const router = express.Router();
const {getAllusers,getSingleuser,showCurrenuser,updateuserPassword,updateuser}=require('../controller/userController')
const {authenticateUser,authorizePermission }= require('../middleware/authentication');

router.route('/').get(authenticateUser,authorizePermission('Admin'),getAllusers)
router.route('/profile').get(authenticateUser,showCurrenuser)
router.route('/updateuser').patch(authenticateUser,updateuser);
router.route('/updateUserPassword').patch(authenticateUser,updateuserPassword);
router.route('/:id').get(authenticateUser,getSingleuser)


module.exports=router
