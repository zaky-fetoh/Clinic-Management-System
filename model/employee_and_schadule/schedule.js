const mongoose = require("mongoose");
const indeptModel = require("./indepartment_emp");
const utils = require("../utils");

const scheduleSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  in_department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "in_department_emp",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
});
scheduleSchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(indeptModel, this.in_department_id)))
    throw new Error(
      "This position is Not Rejestered at indepartment Collection"
    );
  next();
});

module.exports = mongoose.model("schedule", scheduleSchema);
