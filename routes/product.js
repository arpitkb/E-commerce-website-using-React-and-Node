import express from "express";
const router = express.Router({ mergeParams: true });
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  addReview,
  getTopProducts,
} from "../controllers/product.js";
import { isAdmin, protect } from "../middlewares/auth.js";

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

router.route("/top").get(getTopProducts);

router
  .route("/:id")
  .get(getProduct)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

router.route("/:id/review").post(protect, addReview);

export default router;
