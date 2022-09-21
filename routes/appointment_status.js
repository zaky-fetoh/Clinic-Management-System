const express = require("express")

const appointStLogic = require("../controller/patient_and_appointment/appointment_status");

module.exports = express.Router()
    .post("/", appointStLogic.addAppointSta)
    .get("/:appsId", appointStLogic.getAppointStatus)
    .put("/:appsId", appointStLogic.updateAppoinStatus)
    .delete("/:appsId", appointStLogic.deleteAppoinStatus)

