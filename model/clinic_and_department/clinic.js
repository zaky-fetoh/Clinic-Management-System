const mongoose = require("mongoose");
const joi = require("joi");

const clinicSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  clinic_name: {
    type: String,
    required: [true, "Clinic Nome Is Required"],
    lowercase: true,
  },
  address: {
    type: String,
    required: [true, "Clinic's Address is required"],
    lowercase: true,
  },
  details: {
    type: String,
  },
});

const joiSchema = joi.object({
  clinic_name: joi.string().min(2).max(30).required(),
  address: joi.string().min(2).max(255).required(),
  details: joi.string(),
  _id: joi.any(),
});

clinicSchema.pre("save", function (next) {
  const { error } = joiSchema.validate(this._doc);
  if (error) {
    console.error("Invalide Input");
    throw error;
  } else next();
});

module.exports = mongoose.model("clinic", clinicSchema);
