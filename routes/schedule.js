const scheduleLogic = require("../controller/employee_schedule/schedule")
const express = require("express");

module.exports = express.Router()
    .get("/:schId", scheduleLogic.getSchedule)
    .put("/:schId", scheduleLogic.updateSchedule)
    .delete("/:schId", scheduleLogic.deleteSchedule)