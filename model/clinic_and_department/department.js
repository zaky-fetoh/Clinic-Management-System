const mongoose = require("mongoose");
const clinic_model = require("./clinic");
const joi = require("joi");

const utils =require("../utils");

departmentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  department_name: {
    type: String,
    required: true,
  },
  clinic_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "clinic",
  },
});

const joiSchema = joi.object({
  _id: joi.any(),
  clinic_id: joi.any(),
  department_name: joi.string().min(3).max(255).required(),
});

departmentSchema.pre("save", async function (next) {
  const { error } = joiSchema.validate(this._doc);
  if (error) throw error;
  if (!(await utils.checkifRefExist(clinic_model,this.clinic_id))) 
        throw new Error("This Clinic Does not exist");
  next();
});

module.exports = mongoose.model("department", departmentSchema);
