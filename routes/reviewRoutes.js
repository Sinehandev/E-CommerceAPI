const express = require('express');
const router = express.Router();
const {authenticateUser}=require('../middleware/authentication');
const {
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview
}=require('../controller/reviewcontroller');

router.route('/').get(authenticateUser,getAllReview).post(authenticateUser,createReview)
router.route('/:id').get(getSingleReview).patch(authenticateUser,updateReview).delete(authenticateUser,deleteReview)

module.exports=router;