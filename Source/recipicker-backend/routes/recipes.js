const express = require("express");
const router = express.Router();
const imageUpload = require("../utils/image_upload");

const { loginRequired } = require("../controllers/auth_controller");
const {
  readData,
  readOne,
  createData,
  updateData,
  deleteData,
  readRecent,
  readFeatured,
  search,
  readAuthor,
  readCategory,
} = require("../controllers/recipe_controller");

router
  .get("/", readData)
  .get("/category/:id", readCategory)
  .get("/recent", readRecent)
  .get("/featured", readFeatured)
  .get("/author", readAuthor)
  .get("/search", search)
  .get("/:id", readOne)
  .post("/", loginRequired, imageUpload.single("file"), createData)
  .put("/:id", loginRequired, imageUpload.single("file"), updateData)
  .delete("/:id", loginRequired, deleteData);

module.exports = router;
