const mongoose = require("mongoose");


const patientSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    }, 
    first_name:{
        type: String,
        required:true,
    },
    last_name:{ 
        type: String, 
        required:true,
    },
});

module.exports = mongoose.model("patient", patientSchema)
