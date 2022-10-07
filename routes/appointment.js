const appointmantLogic = require("../controller/patient_and_appointment/appointment");

const express = require("express")


module.exports = express.Router()
    .post("/", appointmantLogic.addAppoint)
    .get("/:appId", appointmantLogic.getAppointment)
    .put("/:appId", appointmantLogic.updateAppointment)
    .delete("/:appId", appointmantLogic.deleteAppointment)

