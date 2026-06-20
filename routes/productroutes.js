const express = require('express');
const router = express.Router();
const {getAllproducts,createProducts,getSingleProducts,updateproducts,deleteproducts,uploadImage,}=require('../controller/productController');
const {getSingleProductreview}= require('../controller/reviewcontroller');
const {authenticateUser,authorizePermission}=require('../middleware/authentication');



router.route('/').post([authenticateUser,authorizePermission('Admin')],createProducts)
router.route('/').get(getAllproducts)
router.route('/uploadimage').post([authenticateUser,authorizePermission('Admin')],uploadImage)
router.route('/:id').get(getSingleProducts)
router.route('/:id').patch([authenticateUser,authorizePermission('Admin')],updateproducts)
router.route('/:id').delete([authenticateUser,authorizePermission('Admin')],deleteproducts)
router.route('/:id/reviews').get(getSingleProductreview)

module.exports=router;
