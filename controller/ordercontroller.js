const Order = require('../models/order');
const Product = require('../models/product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermission } = require('../utils'); 

const fakeStripeAPI = async ({ amount, currency }) => {
    const clientSecret = 'jhdshkhsvkdshjsvbhd';
    return { clientSecret, amount }
}

const createOrder = async (req, res) => {
    const { cartItems, tax, shippingFee } = req.body;
    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items Provided')
    }
    if (!tax || !shippingFee) {
        throw new CustomError.BadRequestError('Please provide and shipping fee');
    }
    let orderItems = []
    let subtotal = 0;
    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`no items found with this id${item.product}`)
        }
        const { name, price, image, _id } = dbProduct;
        const singleOrderItem = {
            amount: item.amount,
            name, price, image, product: _id
        }
        //add items in cart
        orderItems = [...orderItems, singleOrderItem]
        //subtotal
        subtotal += item.amount * price;
    }
    const total = tax + shippingFee + subtotal
    //get client secret
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd'
    })
    const order = await Order.create({
        orderItems,
        subtotal,
        total,
        shippingFee,
        tax,
        clientSecret: paymentIntent.clientSecret,
        user: req.user.userId
    })
    res.status(StatusCodes.CREATED).json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = async (req, res) => {
    const order = await Order.find({});
    res.status(StatusCodes.OK).json({ order, count: order.length })
}

const getSingleorder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
        throw new CustomError.NotFoundError(`No order found with this id ${id}`)
    }
    checkPermission(req.user, order.user); 
    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
    const order = await Order.find({ user: req.user.userId });
    res.status(StatusCodes.OK).json({ order, count: order.length }) 
}

const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { paymentIntentId } = req.body;
    
    if (!paymentIntentId) {
        throw new CustomError.BadRequestError('Please provide paymentIntentId');
    }
    
    const order = await Order.findOne({ _id: id });
    if (!order) {
        throw new CustomError.NotFoundError(`No order found with this id ${id}`)
    }
    checkPermission(req.user, order.user); 
    
    order.paymentIntentId = paymentIntentId;
    order.status = "paid";
    await order.save();
    res.status(StatusCodes.OK).json({ order });
}

const deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
        throw new CustomError.NotFoundError(`No order found with this id ${id}`)
    }
    checkPermission(req.user, order.user); 
    await order.remove();
    res.status(StatusCodes.OK).json({ msg: 'Order removed' });
}

module.exports = { createOrder, getAllOrders, getSingleorder, updateOrder, deleteOrder, getCurrentUserOrders }