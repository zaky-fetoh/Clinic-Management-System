const express = require("express");

const clinicLogic = require("../controller/clinic_and_department/clinic");
const clnDeptLogic = require("../controller/clinic_and_department/clinic_department");

module.exports = express
  .Router()
  .post("/", clinicLogic.addClinic)
  .get("/", clinicLogic.getAllClinics)
  .get("/:clinicId", clinicLogic.getClinic)
  .delete("/:clinicId", clinicLogic.deleteClinic)
  .put("/:clinicId", clinicLogic.updateClinic)

  .get("/:clinicId/department", clnDeptLogic.getAllDeptForClinic)
  .post("/:clinicId/department", clnDeptLogic.addDeptFromClinic)
