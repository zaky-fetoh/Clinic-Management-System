const express = require("express");

const clinicLogic = require("../controller/clinic");

module.exports = express
  .Router()
  .post("/",clinicLogic.addClinic)
  .get("/",clinicLogic.getAllClinics)
  .get("/:clinicId", clinicLogic.getClinic)
  .delete("/:clinicId", clinicLogic.deleteClinic)
  .put("/:clinicId", clinicLogic.updateClinic);
