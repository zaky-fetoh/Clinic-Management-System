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
const schedRoute = require("./routes/schedule");

const patientRoute = require("./routes/patient");
const patientCaseRoute = require("./routes/patient_case");
const appointStRoute = require("./routes/appointment_status");
const appointRoute = require("./routes/appointment");
const stHistRoute = require("./routes/status_history");

const GraphQLSchema = require("./graphql/schema")
const xgql = require("express-graphql");
const gqlContext = require("./graphql/db_context")

async function run() {

  console.log("hello");
  try {
    await mongoose.connect(process.env.URI);
    console.log("MONGODB is connected");
  } catch (e) {
    console.log("unable to Connect DB");
    console.log(e.message);
  }
  express()
    .use(morgan())
    .use("/graphql", xgql.graphqlHTTP({
      schema: GraphQLSchema,
      context:gqlContext,
      graphiql: true, 
    }))
    .use(express.json())
    .use(express.urlencoded())
    .use("/clinic", clinicRoute)
    .use("/department", deptRoute)

    .use("/in-department", indeptRoute)
    .use("/schedule", schedRoute)
    .use("/employee", empRoute)
    .use("/role", roleRoute)

    .use("/patient", patientRoute)
    .use("/patient-case", patientCaseRoute)
    .use("/appointment-status", appointStRoute)
    .use("/appointment", appointRoute)
    .use("/status-history", stHistRoute)

    .listen(process.env.PORT || 3000, () => {
      console.log("Server is listening");
    });

}; run()

