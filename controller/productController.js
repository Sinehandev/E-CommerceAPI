const Product = require('../models/product');
const {StatusCodes}=require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');
const getAllproducts = async(req,res)=>{
    const product = await Product.find({})
    res.status(StatusCodes.OK).json({product,Count:product.length});
}
const createProducts = async(req,res)=>{
    req.body.user=req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
}
const getSingleProducts = async(req,res)=>{
    const {id:prouctId}=req.params;
    const product = await Product.findOne({_id:prouctId}).populate('reviews');
    if(!product){
        throw new CustomError.NotFoundError("No Product Found with this ID")
    }
    res.status(StatusCodes.OK).json({product});
}
const updateproducts = async(req,res)=>{
    const {id:prouctId}=req.params;
    const product = await Product.findOneAndUpdate({_id:prouctId},req.body,{new:true,runValidators:true});
    if(!product){
        throw new CustomError.NotFoundError("No Product Found with this ID")
    }
    res.status(StatusCodes.OK).json({product});
}
const deleteproducts = async(req,res)=>{
    const {id:prouctId}=req.params;
    const product = await Product.findOne({_id:prouctId});
    if(!product){
        throw new CustomError.NotFoundError("No Product Found with this ID")
    }
    await product.remove()
    res.status(StatusCodes.OK).json("delete sucessfully!");
}
const uploadImage = async(req,res)=>{
    if(!req.files){
        throw new CustomError.BadRequestError('No Image Uploaded')
    }
    const productImage = req.files.image;
    if(!productImage){
        throw new CustomError.BadRequestError('Please Upload Image');
    }
    const maxsize = 1024 *1024 * 10;
    if(productImage.size>maxsize){
        throw new CustomError.BadRequestError("Image must be within 10MB")
    }
    const imagePath = path.join(__dirname,'../public/uploads/'+`${productImage.name}`) 
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:`/uploads/${productImage.name}`})
}
module.exports={getAllproducts,createProducts,getSingleProducts,updateproducts,deleteproducts,uploadImage}