const { Schema, model } = require("mongoose");

const roleSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Role", roleSchema);
