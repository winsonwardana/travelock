function errHandler(err, req, res, next) {
  if (err.name === "Username is required") {
    res.status(400).json({
      message: "Username is required",
    });
  } else if (err.name === "Email is required") {
    res.status(400).json({
      message: "Email is required",
    });
  } else if (err.name === "Password is required") {
    res.status(400).json({
      message: "Password is required",
    });
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({
      message: `${err.errors[0].message}`,
    });
  } else if (err.name === "Invalid email/password") {
    res.status(400).json({
      message: "Invalid email/password",
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = errHandler;
