const loginRequired = (req, res, next) => {
  if (req.user) {
    next(); // if there is a user go next
  } else {
    // if user is undefined, return 401 and Unauthorized user error.
    res.status(401).json({
      msg: "Unauthorized user!",
    });
  }
};

module.exports = {
  loginRequired, // export loginRequired
};
