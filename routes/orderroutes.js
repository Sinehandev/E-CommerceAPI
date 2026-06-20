const express = require('express');
const router = express.Router();
const {authenticateUser,authorizePermission}=require('../middleware/authentication');
const {createOrder,getAllOrders,getSingleorder,updateOrder,deleteOrder,getCurrentUserOrders}=require('../controller/ordercontroller');

router
    .route('/')
    .post(authenticateUser,createOrder)
    .get(authenticateUser,authorizePermission('Admin'),getAllOrders)
router.route('/showAllMyOrders').get(authenticateUser,getCurrentUserOrders)
router
    .route('/:id')
    .get(authenticateUser,getSingleorder)
    .patch(authenticateUser, updateOrder)
    .delete(authenticateUser,deleteOrder)
    

module.exports=router;