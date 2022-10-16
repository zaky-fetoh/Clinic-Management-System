const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const joi = require("joi");

const employeeSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    default: "NONE",
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "NONE",
  },
  mobile: {
    type: String,
    default: "NONE",
  },
  is_active: {
    type: Boolean,
    default: false,
  },
});

const joiSchema = joi.object({
  _id: joi.any(),
  first_name: joi.string().min(3).max(20).required(),
  last_name: joi.string().min(3).max(20).required(),
  user_name: joi.string().min(3).max(50).required(),
  password: joi.string().min(7).required(),
  email: joi.string().email().required(),
  phone: joi.string().allow("NONE").min(11).max(11),
  mobile: joi.string().allow("NONE").min(11).max(11),
  is_active: joi.boolean(),
});

employeeSchema.pre("save", async function (next) {
  const { error } = joiSchema.validate(this._doc);
  if (error) throw error;
  const DBPass = await module.exports.findOne(
    {_id: this._id,}, {password:1});
  //this if check protects when excuting an update function 
  //not to hash a hashed password simply
  //if this recored exists in the database check the password changes
  //then encrypt the new password
  //if the record does not exists in the database then encrypt 
  //that password
  if(!DBPass || DBPass && this.password !== DBPass.password)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("employee", employeeSchema);
