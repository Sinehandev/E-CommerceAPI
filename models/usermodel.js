const mongoose = require('mongoose');
const validator=require('validator');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Provide name'],
        minlength:3,
        maxlength:20
    },
    email:{
        type:String,
         required:[true,'Please Provide email'],
         validate:{
            validator: validator.isEmail,
            message:'Please provide valid Email'
         },
         unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password '],
        validate:{
            validator: validator.isStrongPassword,
            message:'Password must Contain  minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 '
         }
    },
    role:{
        type:String,
        enum:['User','Admin'],
        default:'User'
    }
});

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
});
UserSchema.methods.comparePassword=async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
};
module.exports= mongoose.model('User',UserSchema);
