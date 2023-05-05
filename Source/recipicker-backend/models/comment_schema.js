const { Schema, model } = require("mongoose");

const commentSchema = Schema(
  {
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "recipeId field is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "recipeId field is required"],
    },
    comment: {
      type: String,
      required: [true, "recipeId field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
