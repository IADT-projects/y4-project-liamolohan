const { Schema, model } = require("mongoose");

const measurementSchema = Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  abbreviatedName: {
    type: String,
    required: [true, "Abbreviated Name field is required"],
  },
});

module.exports = model("Measurement", measurementSchema);
