const express = require("express");

const patientLogic = require("../controller/patient_and_appointment/patient");
const patientCaseLogic = require("../controller/patient_and_appointment/patient_case");


module.exports = express.Router()
    .post("/", patientLogic.addPatient)
    .get("/:patId", patientLogic.getPatient)
    .put("/:patId", patientLogic.updatePatient)
    .delete("/:patId", patientLogic.deletePatient) 

    .post("/:patId/case", patientCaseLogic.addPatientCase)
