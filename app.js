const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
mongoose.pluralize(null);

const clinicRoute = require("./routes/clinic");
const deptRoute = require("./routes/department");
const empRoute = require("./routes/employee");
const roleRoute = require("./routes/role");
const indeptRoute = require("./routes/indepartment");

async function run() {
  try {
    await mongoose.connect(process.env.URI);
    console.log("MONGODB is connected");
  } catch (e) {
    console.log("unable to Connect DB");
    console.log(e.message);
  }
  express()
    .use(morgan())
    .use(express.json())
    .use(express.urlencoded())
    .use("/clinic", clinicRoute)
    .use("/department", deptRoute)
    .use("/employee", empRoute)
    .use("/role", roleRoute)
    .use("/in-department", indeptRoute)

    .listen(process.env.PORT || 3000, () => {
      console.log("Server is listening");
    });

}; run()

