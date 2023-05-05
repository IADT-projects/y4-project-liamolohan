const express = require("express");
const router = express.Router();

const { loginRequired } = require("../controllers/auth_controller");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/rating_controller");

router
  .get("/", readData)
  .get("/:id", readOne)
  .post("/", loginRequired, createData)
  .put("/:id", loginRequired, updateData)
  .delete("/:id", loginRequired, deleteData);

module.exports = router;
