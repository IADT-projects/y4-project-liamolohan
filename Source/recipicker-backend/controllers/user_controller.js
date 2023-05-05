const User = require("../models/user_schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  let newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);

  newUser.save((err, user) => {
    if (err) {
      return res.status(400).json({
        msg: err,
      });
    } else {
      user.password = undefined;
      return res.status(201).json(user);
    }
  });
};

const login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user || !user.comparePassword(req.body.password)) {
        res.status(401).json({
          msg: "Authentication failed. Invalid email or password",
        });
      } else {
        let token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            location: user.location,
            gender: user.gender,
            _id: user._id,
          },
          process.env.APP_KEY
        );

        res.status(200).json({
          msg: "Successfully Logged In!",
          token: token,
          userId: user._id,
          userRole: user.role,
        });
      }
    })
    .catch((err) => {
      throw err;
    });
};

const readData = (req, res) => {
  User.find()
    .select("-password")
    .select("-updatedAt")
    .select("-__v")
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

  User.findById(id)
    .select("name")
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({
          msg: `User with id: ${id} not found`,
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

module.exports = {
  register,
  login,
  readData,
  readOne,
};
