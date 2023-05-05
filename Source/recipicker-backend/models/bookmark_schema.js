const { Schema, model } = require("mongoose");

const bookmarkSchema = Schema(
  {
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "recipeId field is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Bookmark", bookmarkSchema);
