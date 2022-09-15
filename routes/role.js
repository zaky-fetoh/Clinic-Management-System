const roleLogic = require("../controller/employee_schedule/role");
const express = require("express");


module.exports = express.Router()
    .post("/", roleLogic.addRole)
    .get("/", roleLogic.getAllRole)
    .get("/:RoleId", roleLogic.getRole)
    .delete("/:RoleId", roleLogic.deleteRole)
    .put("/:RoleId", roleLogic.updateRole)