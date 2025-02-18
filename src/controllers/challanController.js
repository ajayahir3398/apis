const Challan = require("../models/challanModel");

exports.addChallan = async (req, res) => {
  try {
    const { customer, date, vehicleNo, driverName, driverMoNo, products } = req.body;

    // Validate input
    if (!customer || !date || !vehicleNo || !driverName || !driverMoNo || !products || !Array.isArray(products)) {
      return res.status(400).json({ message: "All fields are required and products should be an array" });
    }

    // Create challan
    const newChallan = new Challan({
      customer,
      date,
      vehicleNo,
      driverName,
      driverMoNo,
      products,
    });

    await newChallan.save();
    return res.status(201).json({ message: "Challan added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};