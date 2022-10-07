const mongoose = require("mongoose");

const utils = require("../utils");
const patientCaseModel = require("./patient_case");
const indeptModel = require("../employee_and_schadule/indepartment_emp");
const appoStaModel = require("./appointment_status");

const appointmentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  patient_case_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient_case",
    required: true,
  },
  in_department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "in_department_emp",
    required: true,
  },
  appointment_status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment_Status",
    required: true,
  },
  time_created: {
    type: Date,
    default: Date.now,
  },
  appointment_start_time: {
    type: Date,
    required: true,
  },
  appointment_end_time: {
    type: Date,
  },
});

appointmentSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(patientCaseModel, this.patient_case_id)))
    throw new Error(
      "This patient Case Does not Exist in patient_case Collection"
    );

  if (!(await utils.checkifRefExist(indeptModel, this.in_department_id)))
    throw new Error(
      "This in_department_id Does not Exist in in_department Collection"
    );

  if (!(await utils.checkifRefExist(appoStaModel, this.appointment_status_id)))
    throw new Error(
      "This appointment_Status_id Does not Exist in appointment_Status_id Collection"
    );

  next();
});

module.exports = mongoose.model("appointment", appointmentSchema);
