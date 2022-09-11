const mongoose = require("mongoose");
const roleModel = require("./role");
const deptModel = require("../clinic_and_department/department");


const inDepartmentSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
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
    is_active: {
        type: Boolean,
        default: false,
    },
});

inDepartmentSchema.pre("save",async function(next){
    const emp = await employeeModel.findOne({
        _id:this.employee_id,
    },{projection:{_id:1}});
    if(!emp) throw new Error("This Employee is Not Rejestered at Employee Collection");
    
    const dpt = deptModel.findOne({_id: this.department_id,},{
        projection:{_id:1}});
    if(!dpt) throw new Error("This department is not rejestered at department Collection");
    next();
});

module.exports = mongoose.model("in_department_emp", inDepartmentSchema);
