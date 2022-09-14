const express = require("express");

const clinicLogic = require("../controller/clinic_and_department/clinic");
const clnDeptLogic = require("../controller/clinic_and_department/clinic_department");

module.exports = express
  .Router()
  .post("/", clinicLogic.addClinic)
  .get("/", clinicLogic.getAllClinics)
  .get("/number", clinicLogic.ClinicCount)
  .get("/department", clnDeptLogic.getClinicWithItsDepts)
  .get("/department/number", clnDeptLogic.getTotalCountOfDeptForEachClinic)

  .get("/:clinicId", clinicLogic.getClinic)
  .delete("/:clinicId", clinicLogic.deleteClinic)
  .put("/:clinicId", clinicLogic.updateClinic)

  .get("/:clinicId/department", clnDeptLogic.getAllDeptForClinic)
  .post("/:clinicId/department", clnDeptLogic.addDeptFromClinic)
  // the Following line has an issue
  .get("/:clinicId/department/number", clnDeptLogic.getTotalCountOfDeptAClinic);
