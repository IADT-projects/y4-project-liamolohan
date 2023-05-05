const express = require("express");
const router = express.Router();

const {
  register,
  login,
  readData,
  readOne,
} = require("../controllers/user_controller");

router
  .get("/", readData)
  .get("/:id", readOne)
  .post("/register", register)
  .post("/login", login);

module.exports = router;
