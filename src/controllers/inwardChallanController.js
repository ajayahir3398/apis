const InwardChallan = require("../models/inwardChallanModel");
const Product = require("../models/productModel");

exports.addInwardChallan = async (req, res) => {
  try {
    const {
      customer,
      date,
      vehicleNo,
      driverName,
      driverMoNo,
      products,
    } = req.body;

    // Validate input
    if (
      !customer ||
      !date ||
      !vehicleNo ||
      !driverName ||
      !driverMoNo ||
      !products ||
      !Array.isArray(products)
    ) {
      return res
        .status(400)
        .json({
          message: "All fields are required and products should be an array",
        });
    }

    // Create inward challan
    const newInwardChallan = new InwardChallan({
      user: req.user.userId,
      customer,
      date,
      vehicleNo,
      driverName,
      driverMoNo,
      products,
    });

    // Update product stock
    for (const item of products) {
      const product = await Product.findOne({
        _id: item.productId,
        user: req.user.userId,
      });
      if (product) {
        product.currentStock += item.quantity;
        await product.save();
      }
    }

    await newInwardChallan.save();
    return res
      .status(201)
      .json({ message: "Inward challan added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
