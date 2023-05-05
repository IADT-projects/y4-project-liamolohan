const express = require("express");
const router = express.Router();

const { loginRequired } = require("../controllers/auth_controller");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
} = require("../controllers/comment_controller");

router
  .get("/:id", readData)
  .post("/", loginRequired, createData)
  .put("/:id", loginRequired, updateData)
  .delete("/:id", loginRequired, deleteData);

module.exports = router;
