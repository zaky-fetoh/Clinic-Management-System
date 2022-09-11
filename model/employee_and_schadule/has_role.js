const mongoose = require("mongoose");
const employeeModel = require("./empolyee");
const roleModel =require("./role");

const hasRoleSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "role",
    },
    time_from: {
        type: Date,
        required: true,
    },
    time_to: {
        type: Date,
    },
    is_active:{
        type:Boolean,
        default:false,
    }
});

hasRoleSchema.pre("save", async function(next){
    const emp = await employeeModel.findOne({
        _id:this.employee_id,
    },{projection:{_id:1}});
    if(!emp) throw new Error("This Employee is Not Rejestered at Employee Collection");
    
    const ro = await roleModel.findOne({_id:this.role_id,},{
        projection:{_id:1}
    });
    if(!ro) throw new Error("this Role Does not Exist in Role Collection"); 
    
    next()
})

module.exports = mongoose.model("has_role", hasRoleSchema);