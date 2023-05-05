const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

require("dotenv").config();
require("./utils/db.js")();

const app = express();
const port = 4001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use((req, res, next) => {
  // Using optional chaining, check the request has headers
  if (req.headers?.authorization?.split(" ")[0] === "Bearer") {
    // using jsonwebtoken verify the authorization header, using the APP_KEY in the .env file.
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.APP_KEY,
      (err, decoded) => {
        // if there is an error set user to undefined
        if (err) req.user = undefined;

        // if there is no error, decode and go on to the next middleware
        req.user = decoded;
        next();
      }
    );
  } else {
    // if the required headers aren't there, set user to undefined and go next
    req.user = undefined;
    next();
  }
});

// Routes
app.use("/api/bookmarks", require("./routes/bookmarks"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/difficulties", require("./routes/difficulties"));
app.use("/api/genders", require("./routes/genders"));
app.use("/api/ingredients", require("./routes/ingredients"));
app.use("/api/ratings", require("./routes/ratings"));
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`recipicker backend listening on http://localhost:${port}`);
});
