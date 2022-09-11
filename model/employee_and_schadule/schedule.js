const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    in_department_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "in_department_emp",
        required: true, 
    },
    date:{
        type: Date, 
        required: true,
    }, 
    start_time:{
        type: Date,
        required:true,
    },
    end_time:{
        type:Date, 
        required: true,
    }
})
