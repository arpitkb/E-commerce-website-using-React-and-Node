import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    brand: {
      type: String,
      required: [true, "brand name is required"],
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Books",
        "Appliances",
        "Home and Kitchen",
        "Computers",
        "Grocery",
        "Movies and TV",
        "Sports",
        "Outdoor",
        "Arts, Crafts and Sewing",
      ],
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: [true, "rating is required"],
        },
        comment: {
          type: String,
          required: [true, "comment is required"],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
