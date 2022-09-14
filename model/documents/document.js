const mongoose = require("mongoose");

const utils = require("../utils");
const docTypeModel = require("./document_type");
const patientModel = require("../patient_and_appointment/patient");
const patientCaseModel = require("../patient_and_appointment/patient_case");
const appointModel = require("../patient_and_appointment/appointment");
const indept = require("../employee_and_schadule/indepartment_emp");

const documentSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  internal_document_id: {
    type: String,
    max: 64,
  },
  document_name: {
    type: String,
    max: 255,
  },
  document_type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "document_type",
    required: true,
  },
  time_created: {
    type: Date,
    default: Date.now,
  },
  document_url: {
    type: String,
  },
  details: {
    type: String,
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  patient_case_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient_case",
  },
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
  },
  in_department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "in_department_emp",
  },
});


documentSchema.pre("save", async function(next){
    if (!(await utils.checkifRefExist(docTypeModel, this.document_type_id)))
    throw new Error("this Document Type Does not Exist in document Type Collection");

    if (!(await utils.checkifRefExist(patientModel, this.patient_id)))
    throw new Error("this patient_id Does not Exist in patient Collection");

    if (!(await utils.checkifRefExist(patientCaseModel, this.patient_case_id)))
    throw new Error("this patiet_case_id Does not Exist in patient_case Collection");

    if (!(await utils.checkifRefExist(appointModel, this.appointment_id)))
    throw new Error("this appointment_id Does not Exist in appointment Collection");

    if (!(await utils.checkifRefExist(indept, this.in_department_id)))
    throw new Error("this Indepartment Does not Exist in Role Collection");

    next();
})


modul.exports = mongoose.model("document", documentSchema);