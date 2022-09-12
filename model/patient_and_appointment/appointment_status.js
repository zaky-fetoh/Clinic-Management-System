const mongoose = require("mongoose");


const appoStaSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    status_name:{
        type:String, 
        required:true,
    },
});

module.exports = mongoose.model("appointment_Status", appoStaSchema); 
