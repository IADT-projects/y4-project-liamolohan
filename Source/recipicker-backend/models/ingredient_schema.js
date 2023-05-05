const { Schema, model } = require("mongoose");

const ingredientsSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    brand: {
      type: String,
      required: [true, "Ingredient Brand is required"],
    },
    per: {
      type: Number,
      required: [true, "Per (in grams) field is required"],
    },
    calories: {
      type: Number,
      required: [true, "Calories field is required"],
    },
    energy: {
      type: Number,
      required: [true, "Energy field is required"],
    },
    fat: {
      type: Number,
      required: [true, "Fat field is required"],
    },
    saturates: {
      type: Number,
      required: [true, "Saturates field is required"],
    },
    carbohydrates: {
      type: Number,
      required: [true, "Carbohydrates field is required"],
    },
    sugars: {
      type: Number,
      required: [true, "Sugars field is required"],
    },
    salt: {
      type: Number,
      required: [true, "Salt field is required"],
    },
    fibre: {
      type: Number,
      required: [true, "Fibre field is required"],
    },
    protein: {
      type: Number,
      required: [true, "Protein field is required"],
    },
    // measurements: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Measurement",
    //   required: [true, "Measurements field is required"],
    // },
  },
  { timestamps: true }
);

module.exports = model("Ingredient", ingredientsSchema);
