const Customer = require("../models/customerModel");

exports.addCustomer = async (req, res) => {
  try {
    const {
      businessName,
      customerName,
      gstNo,
      mobileNo,
      email,
      gender,
      dob,
      image,
      street,
      street2,
      city,
      state,
      pinCode,
      country,
    } = req.body;

    // Validate input
    if (
      !businessName ||
      !customerName ||
      !gstNo ||
      !mobileNo ||
      !email ||
      !gender ||
      !dob ||
      !image ||
      !street ||
      !city ||
      !state ||
      !pinCode ||
      !country
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingEmail = await Customer.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the mobile number already exists
    const existingMobileNo = await Customer.findOne({ mobileNo });
    if (existingMobileNo) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Check if the business name already exists
    const existingBusinessName = await Customer.findOne({ businessName });
    if (existingBusinessName) {
      return res.status(400).json({ message: "Business name already exists" });
    }

    // Check if the GST number already exists
    const existingGstNo = await Customer.findOne({ gstNo });
    if (existingGstNo) {
      return res.status(400).json({ message: "GST number already exists" });
    }

    // Create customer
    const newCustomer = new Customer({
      businessName,
      customerName,
      gstNo,
      mobileNo,
      email,
      gender,
      dob,
      image,
      address: { street, street2, city, state, pinCode, country },
    });

    await newCustomer.save();
    return res.status(201).json({ message: "Customer added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
