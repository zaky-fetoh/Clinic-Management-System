const express = require("express")

const stHistLogic = require("../controller/patient_and_appointment/status_history");

module.exports = express.Router()
    .post("/", stHistLogic.addStHist)
    .get("/:stHistId", stHistLogic.getStHist)
    .put("/:stHistId", stHistLogic.updateStHist)
    .delete("/:stHistId", stHistLogic.deleteStHist)