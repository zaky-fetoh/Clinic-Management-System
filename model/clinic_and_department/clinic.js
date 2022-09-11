const mongoose = require("mongoose");
const joi = require("joi");

const clinicSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    clinic_name: {
        type: String,
        required: [true, "Clinic Nome Is Required"],
        lowercase: true,
    },
    address: {
        type: String,
        required: [true, "Clinic's Address is required"],
        lowercase: true,
    },
    details: {
        type: String,
    }
})

const joiSchema = joi.object({
    clinic_name: joi.String().min(2).max(30).required(),
    address: joi.String().min(2).max(255).required(),
    details: joi.String()
})

clinicSchema.pre("save", function(next){
    const {error, value} = joiSchema.validate(this)
    if(error){
        console.log("Invalide Input");
        throw error ;
    }else next()
}); 

module.exports = mongoose.model("clinic", clinicSchema); 
