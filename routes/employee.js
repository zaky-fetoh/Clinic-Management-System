const empLogic = require("../controller/employee_schedule/employee");
const hasRoleLogic = require("../controller/employee_schedule/has_role")
const express = require("express");


module.exports = express.Router()
    .post("/", empLogic.addEmployee)
    .get("/", empLogic.getAllEmployee)
    .get("/:empId", empLogic.getEmployee)
    .delete("/:empId", empLogic.deleteEmp)
    .put("/:empId", empLogic.updateEmployee)

    .get("/:empId/role",hasRoleLogic.getAllEmpRole)
    .post("/:empId/role/", hasRoleLogic.addEmpRole)
    .get("/:empId/role/:roleId",hasRoleLogic.getEmpRole)
    .put("/:empId/role/roleId", hasRoleLogic.updateEmpRole)
    .delete("/:empId/role/roleId", hasRoleLogic.deleteEmpRole)