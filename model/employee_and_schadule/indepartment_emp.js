const mongoose = require("mongoose");
const employeeModel = require("../employee_and_schadule/empolyee");
const deptModel = require("../clinic_and_department/department");
const utils = require("../utils");

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
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "employee",
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

inDepartmentSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(employeeModel, this.employee_id)))
    throw new Error("This employee is Not Rejestered at employee Collection");

  if (!(await utils.checkifRefExist(deptModel, this.department_id)))
    throw new Error(
      "This department is not rejestered at department Collection"
    );
  next();
});

module.exports = mongoose.model("in_department_emp", inDepartmentSchema);
