const Comment = require("../models/comment_schema");

const readData = (req, res) => {
  let id = req.params.id;

  Comment.find({ recipeId: id })
    .populate("author", "name")
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          msg: `Comment with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).json({
          msg: `Bad request, ${id} is not a valid id`,
        });
      } else {
        res.status(500).json(err);
      }
    });
};

const createData = (req, res) => {
  let commentData = req.body;

  Comment.create(commentData)
    .then((data) => {
      console.log("New Comment Created!", data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!!", err);
        res.status(422).json({
          msg: "Validation Error",
          error: err.message,
        });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const updateData = (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Comment.findByIdAndUpdate(id, body, {
    new: false,
  })
    .then((data) => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({
          msg: `Comment with id: ${id} not found`,
        });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error("Validation Error!!", err);
        res.status(422).json({
          msg: "Validation Error",
          error: err.message,
        });
      } else if (err.name === "CastError") {
        res.status(400).json({
          msg: `Bad request, ${id} is not a valid id`,
        });
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteData = (req, res) => {
  let id = req.params.id;

  Comment.findById(id)
    .then((data) => {
      if (data) {
        return data.remove();
      } else {
        res.status(404).json({
          msg: `Comment with id: ${id} not found`,
        });
      }
    })
    .then((data) => {
      console.log("Comment removed!");

      res.status(200).json({
        msg: `Comment with id: ${id} deleted successfully`,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        res.status(400).json({
          msg: `Bad request, ${id} is not a valid id`,
        });
      } else {
        res.status(500).json(err);
      }
    });
};

module.exports = {
  readData,
  createData,
  updateData,
  deleteData,
};
