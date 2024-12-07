const errorHandlers = (error, req, res, next) => {
  let status = 500;
  let message = "Internal server Error";

  if (error.name === "BAD_REQUEST") {
    status = 400;
    message = "Midtrans Bad Request";
  }

  if (
    error.name === "SequelizeValidationError" ||
    error.name == "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = error.errors[0].message;
  }

  if (
    error.name == "SequelizeDatabaseError" ||
    error.name == "SequelizeForeignKeyConstraintError"
  ) {
    status = 400;
    message = `Invalid input Type`;
  }

  if (error.name === "ORDER_DENIED") {
    message = "The room is already booked for the selected dates";
    status = 400;
  }

  if (error.name === "CANCEL_DENIED" || error.name === "REFUND_DENIED") {
    message = "Invalid booking status";
    status = 400;
  }

  if (error.name === "REFUND_EXPIRED") {
    message = "Refund date expired";
    status = 400;
  }

  if (error.name === "INVALID_LOGIN") {
    message = "Invalid Email / Password";
    status = 401;
  }

  if (error.name === "EMPTY_EMAIL") {
    message = "Email is Required";
    status = 401;
  }

  if (error.name === "EMPTY_PASSWORD") {
    message = "Password is Required";
    status = 401;
  }

  if (error.name === "JsonWebTokenError") {
    message = "Invalid Token";
    status = 401;
  }

  if (error.name === "FORBIDDEN") {
    message = "You are not Authorized to access";
    status = 403;
  }

  if (error.name === "UNAUTHORIZED") {
    message = "Please login first";
    status = 403;
  }

  if (error.name === "NOT_FOUND") {
    message = "Data not Found";
    status = 404;
  }

  res.status(status).json({ message });
};

module.exports = errorHandlers;
