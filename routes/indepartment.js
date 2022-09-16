const indeptLogic = require("../controller/employee_schedule/in_department")
const express = require("express");


module.exports = express.Router()
    .get("/:indeptId", indeptLogic.getIndept)
    .delete("/:indeptId", indeptLogic.deleteIndept)
    .put("/:indeptId", indeptLogic.updateIndept)