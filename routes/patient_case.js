const express = require("express")

const patientCaseLogic = require("../controller/patient_and_appointment/patient_case");

module.exports = express.Router()
    .get("/:pcId", patientCaseLogic.getPatientCase)
    .put("/:pcId", patientCaseLogic.updatePatientCase)
    .delete("/:pcId", patientCaseLogic.deletePatientCase)

