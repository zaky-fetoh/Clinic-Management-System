const express = require("express");

const deptLogic = require("../controller/clinic_and_department/department");

module.exports = express
  .Router()
  .get("/:deptId",deptLogic.getDepart)
  .put("/:deptId",deptLogic.updateDept)
  .delete("/:deptId",deptLogic.deleteDept)
