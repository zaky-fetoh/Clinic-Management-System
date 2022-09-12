const mongoose = require("mongoose");

const document_type = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  decument_name: {
    type: String,
    required: true,
    max: 64,
  },
});

module.exports = mongoose.model("document_type", document_type);
