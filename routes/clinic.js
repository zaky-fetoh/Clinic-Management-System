const express = require("express");

const clinicLogic = require("../controller/clinic");

module.exports = express
  .Router()
  .get("/clinic", clinicLogic.getAllClinics)
  .post("/clinic", clinicLogic.addClinic);
