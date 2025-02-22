const OutwardChallan = require("../models/outwardChallanModel");
const Product = require("../models/productModel");

exports.addOutwardChallan = async (req, res) => {
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

    // Create outward challan
    const newOutwardChallan = new OutwardChallan({
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
        product.currentStock -= item.quantity;
        await product.save();
      }
    }

    await newOutwardChallan.save();
    return res
      .status(201)
      .json({ message: "Outward challan added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
