const indeptLogic = require("../controller/employee_schedule/in_department")
const hasRoleLogic = require("../controller/employee_schedule/has_role")
const empLogic = require("../controller/employee_schedule/employee");

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
    .put("/:empId/role/:roleId", hasRoleLogic.updateEmpRole)
    .delete("/:empId/role/:roleId", hasRoleLogic.deleteEmpRole)

    .post("/:empId/in-department/", indeptLogic.addEmpDept)
    .get("/:empId/in-department/",indeptLogic.getAllEmpDept)
    .get("/:empId/in-department/:indeptId",indeptLogic.getEmpDept)
    .put("/:empId/in-department/:indeptId", indeptLogic.updateEmpDept)
    .delete("/:empId/in-department/:indeptId", indeptLogic.deleteEmpDept)