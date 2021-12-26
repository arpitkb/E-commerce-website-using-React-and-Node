import Order from "../models/Order.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import wrapAsync from "../utils/wrapAsync.js";

// @desc     Update a user
// @route    PUT /api/users
// @access   Private
export const updateUser = wrapAsync(async (req, res, next) => {
  const { name, email, oldpassword, password } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorResponse("user not found", 404));
  }

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    if (!oldpassword) {
      return next(new ErrorResponse("Please provide current password", 401));
    }
    // check if password matches
    const match = await user.matchPassword(oldpassword);
    if (!match) {
      return next(new ErrorResponse("Password is incorrect", 401));
    }
    user.password = password;
  }

  const updatedUser = await user.save();

  const token = updatedUser.getJWT();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: token,
  });
});

// @desc     GET All users
// @route    GET /api/users
// @access   Private/admin
export const getUsers = wrapAsync(async (req, res, next) => {
  const users = await User.find().select("-password");

  res.status(200).json(users);
});

// @desc     DELETE user by id
// @route    DELETE /api/users/:id
// @access   Private/admin
export const deleteUser = wrapAsync(async (req, res, next) => {
  const id = req.params.id;

  await User.findByIdAndDelete(id);

  res.status(200).json({
    msg: "User removed",
  });
});

// @desc     Update user by id
// @route    PUT /api/users/:id
// @access   Private/admin
export const updateUserAdmin = wrapAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(new ErrorResponse("user not found", 404));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
});

// @desc     GET user by id
// @route    GET /api/users/:id
// @access   Private/admin
export const getUser = wrapAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");
  if (!user) {
    return next(new ErrorResponse("user not found", 404));
  }

  res.status(200).json(user);
});

// @desc     GET All orders of a user
// @route    GET /api/users/:id/orders
// @access   Private/admin
export const getOrders = wrapAsync(async (req, res, next) => {
  const id = req.params.id;

  const orders = await Order.find({ user: id });

  res.status(200).json(orders);
});
