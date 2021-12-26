import express from "express";
const router = express.Router({ mergeParams: true });
import {
  updateUser,
  getUsers,
  deleteUser,
  getUser,
  updateUserAdmin,
  getOrders,
} from "../controllers/user.js";
import { protect, isAdmin } from "../middlewares/auth.js";

router.route("/").put(protect, updateUser).get(protect, isAdmin, getUsers);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUser)
  .put(protect, isAdmin, updateUserAdmin);
router.route("/:id/orders").get(protect, isAdmin, getOrders);

export default router;
