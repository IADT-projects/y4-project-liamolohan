const fs = require("fs");
const Recipe = require("../models/recipe_schema");
const Bookmark = require("../models/bookmark_schema");
const Comment = require("../models/comment_schema");

const deleteImage = async (filename) => {
  if (process.env.STORAGE_ENGINE === "S3") {
    const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

    const s3 = new S3Client({
      region: process.env.MY_AWS_REGION,
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
      },
    });

    try {
      const data = await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.MY_AWS_BUCKET,
          Key: filename,
        })
      );
      console.log("Success, Object deleted.", data);
    } catch (err) {
      console.log("Error", err);
    }
  } else {
    let path = `public${process.env.STATIC_FILES_URL}${filename}`;
    fs.access(path, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log(`${filename} was deleted`);
      });
    });
  }
};

const readData = (req, res) => {
  Recipe.find()
    .populate("author", "name")
    .populate("category", "name")
    .populate("ingredients")
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

  Recipe.findById(id)
    .populate("author", "name")
    .populate("category")
    .populate("ingredients")
    .then((data) => {
      if (data) {
        let img = `${process.env.STATIC_FILES_URL}${data.image_path}`;
        data.image_path = img;
        res.status(200).json(data);
      } else {
        res.status(404).json({
          msg: `Recipe with id: ${id} not found`,
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

const readFeatured = (req, res) => {
  Recipe.find({ isFeatured: true })
    .limit(1)
    .populate("author", "name")
    .populate("category", "name")
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

const readAuthor = (req, res) => {
  let userId = req.body.author._id;

  Recipe.find({ author: userId })
    .populate("author", "name")
    .populate("category", "name")
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

const readCategory = (req, res) => {
  let id = req.params.id;

  Recipe.find({ category: id })
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

const readRecent = (req, res) => {
  Recipe.find()
    .limit(8)
    .populate("author", "name")
    .populate("category", "name")
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

const createData = (req, res) => {
  let recipeData = req.body;

  console.log(req.file);

  if (req.file) {
    recipeData.image_path =
      process.env.STORAGE_ENGINE === "S3" ? req.file.key : req.file.filename;
  }
  // include this else, if image required
  else {
    return res.status(422).json({
      message: req.imageError || "Image not uploaded!",
    });
  }

  Recipe.create(recipeData)
    .then((data) => {
      console.log("New Recipe Created!", data);
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
  let file = req.file;

  console.log(file);

  if (file) {
    body.image_path =
      process.env.STORAGE_ENGINE === "S3" ? req.file.key : req.file.filename;
  }
  // include this else, if image required
  else {
    return res.status(422).json({
      message: req.imageError || "Image not uploaded!",
    });
  }

  Recipe.findByIdAndUpdate(id, body, {
    new: false,
  })
    .then((data) => {
      if (data) {
        ///Delete old image////
        deleteImage(data.image_path);
        ///////////////////////
        res.status(201).json(data);
      } else {
        res.status(404).json({
          msg: `Recipe with id: ${id} not found`,
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
  let imagePath = "";

  Recipe.findById(id)
    .then((data) => {
      if (data) {
        imagePath = data.image_path;
        return data.remove();
      } else {
        res.status(404).json({
          msg: `Recipe with id: ${id} not found`,
        });
      }
    })
    .then((data) => {
      console.log("Recipe removed!");

      Bookmark.deleteMany({ recipeId: id })
        .then((data) => {
          console.log("Bookmark removed!");
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

      Comment.deleteMany({ recipeId: id })
        .then((data) => {
          console.log("Comments removed!");
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

      deleteImage(imagePath);

      res.status(200).json({
        msg: `Recipe with id: ${id} deleted successfully`,
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

const search = (req, res) => {
  const query = req.query.q; // Get the search query from the request

  Recipe.find({
    name: { $regex: query, $options: "i" },
  })
    .populate("author", "name")
    .populate("category", "name")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  readData,
  readOne,
  readRecent,
  readFeatured,
  readAuthor,
  readCategory,
  createData,
  updateData,
  deleteData,
  search,
};
