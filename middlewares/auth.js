import ErrorResponse from "../utils/ErrorResponse.js";
import wrapAsync from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = wrapAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized", 401));
  }
});

export const isAdmin = wrapAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new ErrorResponse("Not authorized", 401));
  }

  if (!req.user.isAdmin) {
    return next(new ErrorResponse("Not authorized as admin", 401));
  }

  next();
});
