const { Schema, model } = require("mongoose");

const recipeSchema = Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [false, "Author field is required"],
    },
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    description: {
      type: String,
      required: [true, "Description field is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category field is required"],
    },
    difficulty: {
      type: Schema.Types.ObjectId,
      ref: "Difficulty",
      required: [true, "Difficulty field is required"],
    },
    cookingTime: {
      type: Number,
      required: [true, "Cooking Time field is required"],
    },
    prepTime: {
      type: Number,
      required: [true, "Prep Time field is required"],
    },
    totalTime: {
      type: Number,
      required: [true, "Total Time field is required"],
    },
    servingSize: {
      type: Number,
      required: [true, "Serving Size field is required"],
    },
    image_path: {
      type: String,
    },
    ingredients: {
      type: [Schema.Types.ObjectId],
      ref: "Ingredient",
      required: [true, "Ingredients field is required"],
    },
    instructions: {
      type: [String],
      required: [true, "Instructions field is required"],
    },
    // rating: {
    //   type: [Schema.Types.ObjectId],
    //   ref: "Rating",
    //   required: [false, "Rating field is required"],
    // },
    isFeatured: {
      type: Boolean,
      required: [true, "isFeatured field is required"],
    },
  },
  { timestamps: true }
);

module.exports = model("Recipe", recipeSchema);
