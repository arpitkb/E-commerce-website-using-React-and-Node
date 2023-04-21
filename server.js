import express from "express";
import path from "path";
import dotenv from "dotenv";
import colors from "colors";
import productRoutes from "./routes/product.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import fileUpload from "express-fileupload";

dotenv.config();
import connectDB from "./config/db.js";
import errorhandler from "./middlewares/error.js";
import ErrorResponse from "./utils/ErrorResponse.js";

// security middlewares
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

const app = express();

// connect to database
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet({ contentSecurityPolicy: false }));

// Prevent XSS attacks
app.use(xssClean());

// add hpp
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
});
app.use(limiter);

// all routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

//serve static assets in production
// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   //set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// 404 handling
app.use((req, res, next) => {
  return next(new ErrorResponse("Page not found", 404));
});

// error handling middleware
app.use(errorhandler);

// listen to server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.green.bold.inverse);
});
