const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {
  try {
    const { productName, price, availableStock, uom, category, image } = req.body;

    // Validate input
    if (!productName || !price || !availableStock || !uom || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create product
    const newProduct = new Product({
      productName,
      price,
      availableStock,
      uom,
      category,
      image,
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};