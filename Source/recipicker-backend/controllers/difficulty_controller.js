const Difficulty = require("../models/difficulty_schema");

const readData = (req, res) => {
  Difficulty.find()
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("None found!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const readOne = (req, res) => {
  let id = req.params.id;

  Difficulty.findById(id)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          msg: `Difficulty with id: ${id} not found`,
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
  let difficultyData = req.body;

  Difficulty.create(difficultyData)
    .then((data) => {
      console.log("New Difficulty Created!", data);
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

  Difficulty.findByIdAndUpdate(id, body, {
    new: false,
  })
    .then((data) => {
      if (data) {
        res.status(201).json(data);
      } else {
        res.status(404).json({
          msg: `Difficulty with id: ${id} not found`,
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

  Difficulty.findById(id)
    .then((data) => {
      if (data) {
        return data.remove();
      } else {
        res.status(404).json({
          msg: `Difficulty with id: ${id} not found`,
        });
      }
    })
    .then((data) => {
      console.log("Difficulty removed!");

      res.status(200).json({
        msg: `Difficulty with id: ${id} deleted successfully`,
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
  readOne,
  createData,
  updateData,
  deleteData,
};
