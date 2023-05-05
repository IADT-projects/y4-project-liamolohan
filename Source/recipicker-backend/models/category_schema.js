const { Schema, model } = require("mongoose");

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
    },
    image_path: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Category", categorySchema);
