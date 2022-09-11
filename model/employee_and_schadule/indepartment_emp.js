const mongoose = require("mongoose");
const roleModel = require("./role");
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

inDepartmentSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(roleModel, this.role_id)))
    throw new Error("This role is Not Rejestered at role Collection");

  if (!(await utils.checkifRefExist(deptModel, this.department_id)))
    throw new Error(
      "This department is not rejestered at department Collection"
    );
  next();
});

module.exports = mongoose.model("in_department_emp", inDepartmentSchema);
