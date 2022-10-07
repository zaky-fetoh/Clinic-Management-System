const mongoose = require("mongoose");
const employeeModel = require("./empolyee");
const roleModel = require("./role");
const utils = require("../utils");

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
  is_active: {
    type: Boolean,
    default: false,
  },
});

hasRoleSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(employeeModel, this.employee_id)))
    throw new Error("This Employee is Not Rejestered at Employee Collection");

  if (!(await utils.checkifRefExist(roleModel, this.role_id)))
    throw new Error("this Role Does not Exist in Role Collection");

  next();
});

module.exports = mongoose.model("has_role", hasRoleSchema);
