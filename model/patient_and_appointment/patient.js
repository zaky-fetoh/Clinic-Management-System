const mongoose = require("mongoose");


const patientSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    }, 
    first_name:{
        type: String,
        required:true,
        max:64,
    },
    last_name:{ 
        type: String, 
        required:true,
        max:64,
    },
});

module.exports = mongoose.model("patient", patientSchema)
