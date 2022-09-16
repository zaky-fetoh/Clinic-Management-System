const roleLogic = require("../controller/employee_schedule/role");
const express = require("express");


module.exports = express.Router()
    .post("/", roleLogic.addRole)
    .get("/", roleLogic.getAllRole)
    .get("/:roleId", roleLogic.getRole)
    .delete("/:roleId", roleLogic.deleteRole)
    .put("/:roleId", roleLogic.updateRole)