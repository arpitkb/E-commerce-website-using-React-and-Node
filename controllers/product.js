import Product from "../models/Product.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import wrapAsync from "../utils/wrapAsync.js";

// @desc     Get all products
// @route    GET /api/products
// @access   Public
export const getProducts = wrapAsync(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  // fields to exclude
  const removeFields = [
    "select",
    "sort",
    "limit",
    "page",
    "keyword",
    "category",
  ];

  // remove excluded fields from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // starts with query
  if (req.query.keyword) {
    reqQuery.name = {
      $regex: req.query.keyword,
      $options: "i",
    };
  }

  // category handle
  if (req.query.category) {
    reqQuery.category = {
      $regex: req.query.category,
      $options: "i",
    };
  }

  // create query string
  let qs = JSON.stringify(reqQuery);

  // create operators
  qs = qs.replace(/\b(lt|lte|gt|gte|in)\b/g, (match) => `$${match}`);

  let sortfactor = "-createdAt";
  // sorting
  if (req.query.sort) {
    sortfactor = req.query.sort.split(",").join(" ");
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = 3;
  const startIndex = (page - 1) * limit;
  const total = await Product.countDocuments(JSON.parse(qs));
  const pages = Math.ceil(total / limit);

  const products = await Product.find(JSON.parse(qs))
    .sort(sortfactor)
    .limit(limit)
    .skip(startIndex);
  res.status(200).json({
    products,
    page,
    pages,
  });
});

// @desc     Get single product
// @route    GET /api/products/:id
// @access   Public
export const getProduct = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse("Product not found", 404));
  }

  res.status(200).json(product);
});

// @desc     Get Top 3 products
// @route    GET /api/products/top
// @access   Public
export const getTopProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find().sort("-rating").limit(3);

  res.status(200).json(products);
});

// @desc     Delete a product
// @route    DELETE /api/products/:id
// @access   Private/Admin
export const deleteProduct = wrapAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ msg: "Product deleted successfully" });
});

// @desc     Create a product
// @route    POST /api/products
// @access   Private/Admin
export const createProduct = wrapAsync(async (req, res, next) => {
  if (!Number(req.body.price)) {
    return next(new ErrorResponse("Price should be a numeric value", 400));
  }

  const product = new Product({ ...req.body });

  product.user = req.user._id;

  await product.save();

  res.status(201).json(product);
  // res.json({ msg: "hi" });
});

// @desc     Update a product
// @route    PUT /api/products/:id
// @access   Private/Admin
export const updateProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!Number(req.body.price)) {
    return next(new ErrorResponse("Price should be a numeric value"));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorResponse("No product found", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json(updatedProduct);
});

// @desc     Add a review
// @route    POST /api/products/:id/review
// @access   Private/Admin
export const addReview = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorResponse("Poduct not found", 404));
  }

  const reviews = product.reviews.find(
    (el) => el.user.toString() === req.user._id.toString()
  );

  if (reviews) {
    return next(new ErrorResponse("Product already reviewed", 400));
  }

  const { rating, comment } = req.body;
  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
    name: req.user.name,
  };

  product.reviews.unshift(review);

  product.numReviews = product.reviews.length;

  product.rating = (
    product.reviews.reduce((acc, item) => acc + item.rating, 0) /
    product.numReviews
  ).toFixed(2);

  await product.save();

  res.status(201).json(product);
});
