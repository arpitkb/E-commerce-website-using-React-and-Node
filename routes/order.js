import express from "express";
const router = express.Router({ mergeParams: true });
import {
  createOrder,
  getOrder,
  updateOrderToPaid,
  getMyOrders,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/order.js";
import { protect, isAdmin } from "../middlewares/auth.js";

router.route("/").post(protect, createOrder).get(protect, getMyOrders);
router.route("/all").get(protect, isAdmin, getAllOrders);
router.route("/:id").get(protect, getOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/delivery").put(protect, isAdmin, updateOrderToDelivered);

export default router;
