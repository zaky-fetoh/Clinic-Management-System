const empLogic = require("../controller/employee_schedule/employee");
const express = require("express");


module.exports = express.Router()
    .post("/", empLogic.addEmployee)
    .put("/:empId", empLogic.updateEmployee)
    .get("/:empId", empLogic.getEmployee)
    .delete("/:empId", empLogic.deleteEmp)