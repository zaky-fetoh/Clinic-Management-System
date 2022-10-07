const mongoose = require("mongoose");

const utils = require("../utils");
const appointModel = require("./appointment");
const appointStatusModel = require("./appointment_status");

const statusHistorySchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
    required: true,
  },
  appointment_status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment_Status",
    required: true,
  },
  status_time: {
    required: true,
    type: Date,
  },
  details: {
    required: true,
    type: String,
    max: 255,
  },
});

statusHistorySchema.pre("save", async function (next) {
  if (!(await utils.checkifRefExist(appointModel, this.appointment_id)))
    throw new Error(
      "This appointment_id is not rejestered at appointment Collection"
    );

  if (
    !(await utils.checkifRefExist(
      appointStatusModel,
      this.appointment_status_id
    ))
  )
    throw new Error(
      "This department_status_id is not rejestered at appointment_status Collection"
    );

  next();
});

module.exports = mongoose.model("status_history", statusHistorySchema);
