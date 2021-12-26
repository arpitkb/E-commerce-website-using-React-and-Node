import express from "express";
const router = express.Router({ mergeParams: true });
import { registerUser, loginUser, getUser } from "../controllers/auth.js";
import { protect } from "../middlewares/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getUser);

export default router;
