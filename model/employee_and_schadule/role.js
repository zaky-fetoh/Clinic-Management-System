const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  role_name: {
    type: String,
    required: true,
    unique:true,
    min:3,
  },
});

module.exports = mongoose.model("role", roleSchema);
