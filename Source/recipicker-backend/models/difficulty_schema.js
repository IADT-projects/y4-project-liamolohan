const { Schema, model } = require("mongoose");

const difficultySchema = Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
});

module.exports = model("Difficulty", difficultySchema);
