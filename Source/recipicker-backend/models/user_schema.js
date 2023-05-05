const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name field is required"],
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of Birth field is required"],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
    },
    location: {
      type: String,
      required: [true, "Location field is required"],
    },
    gender: {
      type: Schema.Types.ObjectId,
      ref: "Gender",
      required: [true, "Gender field is required"],
    },
    pronouns: {
      type: String,
      required: [false, "Pronouns field is not required"],
    },
    bookmarks: {
      type: Schema.Types.ObjectId,
      ref: "Bookmark",
      required: [false, "Bookmark field is not required"],
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: [false, "Role field is required"],
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password, function (result) {
    return result;
  });
};

module.exports = model("User", userSchema);
