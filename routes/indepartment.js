const indeptLogic = require("../controller/employee_schedule/in_department")
const scheduleLogic = require("../controller/employee_schedule/schedule")

const express = require("express");


module.exports = express.Router()
    .get("/:indeptId", indeptLogic.getIndept)
    .put("/:indeptId", indeptLogic.updateIndept)
    .delete("/:indeptId", indeptLogic.deleteIndept)

    .post("/:indeptId/schedule", scheduleLogic.addIndeptSchedule)
    .get("/:indeptId/schedule", scheduleLogic.getAllIndeptSchedule)
