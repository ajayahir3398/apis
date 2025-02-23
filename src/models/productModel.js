const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    uom: { type: String, required: true }, // Unit of Measurement
    category: { type: String, required: true },
    image: { type: String, required: true }, // Base64 encoded image
    currentStock: { type: Number, required: true, default: 0 }, // Track current stock level
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
