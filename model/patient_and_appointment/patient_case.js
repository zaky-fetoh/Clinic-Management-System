const mongoose = require("mongoose");
const utils = require("../utils");
const patientModel = require("./patient");

const patientCaseSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
  },
  in_progress: {
    type: Boolean,
    default: true,
  },
  total_cost: {
    type: mongoose.Types.Decimal128,
  },
  amount_paid: {
    type: mongoose.Types.Decimal128,
  },
});

patientCaseSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(patientModel, this.patient_id)))
    throw new Error("This patient Does not Exist in patient Collection");
});

module.exports = mongoose.model("patient_case", patientCaseSchema);
