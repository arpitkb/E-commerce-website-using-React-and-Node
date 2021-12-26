import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import wrapAsync from "../utils/wrapAsync.js";

// @desc     Register a user
// @route    POST /api/auth/register
// @access   Public
export const registerUser = wrapAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const olduser = await User.findOne({ email });
  if (olduser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJWT();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  });
});

// @desc     Login a user
// @route    POST /api/auth/login
// @access   Public
export const loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Missing credentials", 400));
  }

  // check for user
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // check if password matches
  const match = await user.matchPassword(password);
  if (!match) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = user.getJWT();

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  });
});

// @desc     Get loggedin user
// @route    GET /api/auth/me
// @access   Private
export const getUser = wrapAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json(user);
});
