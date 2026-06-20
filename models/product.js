const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Please provide product name!'],
        maxlength:100
    },
    price:{
        type:Number,
        required:[true,'Please provide product Price $_______'],
        default:0
    },
    description:{
        type:String,
        required:[true,'Please provide product Descrption'],
        maxlength:[1000,'Description must within 1000 charaters']
    },
    image:{
        type:String,
        default:'/uploads/example.jpeg'
    },
    category:{
        type:String,
        required:[true,'Please Select Category'],
        enum:['phone','laptop','earbuds']
    },
    company:{
        type:String,
        required:[true,'Please provide company'],
        enum:{
            values:['iqoo','oppo','samsung','asus','realme','nothing','lenovo','oneplus'],
            message:'{VALUE} is not supported'
        }
    },
    colors:{
        type:[String],
        required:[true,"Please Give color of the product"],
    },
    featured:{
        type:Boolean,
        default:false,

    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    inventory:{
        type:Number,
        required:true,
        default:20,
    },
    averageRating:{
        type:Number,
        default:0
    },
    numOfReview:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
ProductSchema.virtual('reviews', {
    ref: 'Review',          
    localField: '_id',      
    foreignField: 'product',
    justOne: false,        
    //match: {rating: 5} 
})
ProductSchema.pre('remove', async function(){
    await this.model('Review').deleteMany({product:this._id})
})
module.exports=mongoose.model("Product",ProductSchema)