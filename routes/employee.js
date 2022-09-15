const empLogic = require("../controller/employee_schedule/employee");
const express = require("express");


module.exports = express.Router()
    .post("/", empLogic.addEmployee)
    .get("/", empLogic.getAllEmployee)
    .get("/:empId", empLogic.getEmployee)
    .delete("/:empId", empLogic.deleteEmp)
    .put("/:empId", empLogic.updateEmployee)