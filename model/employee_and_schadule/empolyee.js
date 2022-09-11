const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const joi = require("joi");

const employeeSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    user_name:{
        type: String,
        required: true,
        unique:true,
    },
    email:{
        type:string, 
        default:"NONE",
        unique:true,
    },
    password:{
        type: String,
        required: true,
    }, 
    phone:{
        type:string, 
        default:"NONE",
    },
    mobile:{
        type:string, 
        default:"NONE",
    },
    is_active:{
        type:Boolean,
        default:false,
    },
});

const joiSchema = joi.object({
    _id: joi.any(), 
    first_name:joi.string().min(3).max(20).required(),
    last_name:joi.string().min(3).max(20).required(),
    user_name:joi.string().min(3).max(50).required(), 
    password:joi.string().min(7).required(), 
    email:joi.string().email().required(),
    phone:joi.string().allow("NONE").min(11).max(11),
    mobile:joi.string().allow("NONE").min(11).max(11),
    is_active:joi.boolean(),
});



employeeSchema.pre("save",async function(next){
    const {error} = joiSchema.validate(this._doc)
    if(!error) throw error;
    this.password = await bcrypt.hash(this.password, 12);
    next();
})





