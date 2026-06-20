const Review = require('../models/reveiw');
const Product = require('../models/product')
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermission } = require('../utils');

const createReview = async(req,res)=>{
    const {product:productId, comment, comments}=req.body
    const isValidProduct = await Product.findOne({_id:productId})
    if (!isValidProduct){
        throw new CustomError.NotFoundError(`No product with id ${productId}`)
    }
    const alreadySubmitted = await Review.findOne({
        product:productId,
        user:req.user.userId
    })
    if(alreadySubmitted){
        throw new CustomError.BadRequestError('Already submitted review for this product')
    } 
    req.body.user=req.user.userId
    if (comments && !comment) {
        req.body.comment = comments;
    }
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).send({review})
}
const getAllReview = async(req,res)=>{
   const review = await Review.find({}).populate([
    {
      path:'product',
      select:'name company price'
    },
    {
      path:'user',
      select:'name'
    }
   ])
   res.status(StatusCodes.OK).send({review,count:review.length})
}
const getSingleReview = async(req,res)=>{
    const {id:reviewId}=req.params;
    const review = await Review.findOne({_id:reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }
    res.status(StatusCodes.OK).send({review})
}
const updateReview = async(req,res)=>{
    const {id:reviewId}=req.params;
    const {rating,comment,comments}=req.body;
    const review = await Review.findOne({_id:reviewId});
    if(!review){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }
    checkPermission(req.user,review.user);
    review.rating=rating;
    review.comment=comment || comments;
    await review.save()
    res.status(StatusCodes.OK).send({review})
}
const deleteReview = async(req,res)=>{
    const {id:reviewId}=req.params;
    const review = await Review.findOne({_id:reviewId})
    if(!review){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`)
    }
    checkPermission(req.user,review.user)
    await review.remove()
    res.status(StatusCodes.OK).send({msg:"Review removed"})
}
const getSingleProductreview = async(req,res)=>{
    const {id:productId}=req.params;
    const review = await Review.findOne({product:productId});
     res.status(StatusCodes.OK).json({review})
}
module.exports={
    createReview,
    getAllReview,
    getSingleReview,
    updateReview,
    deleteReview,
    getSingleProductreview
}