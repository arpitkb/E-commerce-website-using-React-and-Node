import Order from "../models/Order.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import wrapAsync from "../utils/wrapAsync.js";

// @desc     Create a new order
// @route    POST /api/orders
// @access   Private
export const createOrder = wrapAsync(async (req, res, next) => {
  const { formData, paymentResult } = req.body;
  const { orderItems, ...rest } = formData;

  if (!orderItems || orderItems.length === 0) {
    return next(
      new ErrorResponse("Could not place order, No items found in cart", 400)
    );
  }

  if (!paymentResult || paymentResult.status !== "COMPLETED") {
    return next(new ErrorResponse("Payment could not be done", 400));
  }

  const order = new Order({ ...rest, orderItems, user: req.user._id });

  order.isPaid = true;
  order.paidAt = Date.now();

  order.paymentResult = {
    id: paymentResult.id,
    status: paymentResult.status,
    update_time: paymentResult.update_time,
    email_address: paymentResult.payer.email_address,
  };

  await order.save();
  res.status(201).json(order);
});

// @desc     Get order by id
// @route    GET /api/orders/:id
// @access   Private
export const getOrder = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.isAdmin === false
  ) {
    return next(new ErrorResponse("Permission denied", 401));
  }

  res.status(200).json(order);
});

// @desc     Update order to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
export const updateOrderToPaid = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  if (order.user._id.toString() !== req.user._id.toString()) {
    return next(new ErrorResponse("Permission denied", 401));
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedorder = await order.save();

  res.status(201).json(updatedorder);
});

// @desc     Get loggedin user's orders
// @route    GET /api/orders/myorders
// @access   Private
export const getMyOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

// @desc     Get All orders
// @route    GET /api/orders/all
// @access   Private/admin
export const getAllOrders = wrapAsync(async (req, res, next) => {
  const orders = await Order.find().populate("user", "id name");

  res.status(200).json(orders);
});

// @desc     Update order to delivered
// @route    PUT /api/orders/:id/delivery
// @access   Private/Admin
export const updateOrderToDelivered = wrapAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse("Order not found", 404));
  }

  if (!order.isPaid) {
    return next(new ErrorResponse("Order payment not done!", 400));
  }

  if (order.isDelivered) {
    return next(new ErrorResponse("Already delivered", 400));
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(201).json({ msg: "Order delivered" });
});
