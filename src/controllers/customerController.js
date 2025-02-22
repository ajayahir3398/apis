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
    const existingEmail = await Customer.findOne({
      email,
      user: req.user.userId,
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the mobile number already exists
    const existingMobileNo = await Customer.findOne({
      mobileNo,
      user: req.user.userId,
    });
    if (existingMobileNo) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Check if the business name already exists
    const existingBusinessName = await Customer.findOne({
      businessName,
      user: req.user.userId,
    });
    if (existingBusinessName) {
      return res.status(400).json({ message: "Business name already exists" });
    }

    // Check if the GST number already exists
    const existingGstNo = await Customer.findOne({
      gstNo,
      user: req.user.userId,
    });
    if (existingGstNo) {
      return res.status(400).json({ message: "GST number already exists" });
    }

    // Create customer
    const newCustomer = new Customer({
      user: req.user.userId,
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

exports.getCustomer = async (req, res) => {
  try {
    const { customerId } = req.query;

    if (customerId) {
      const customer = await Customer.findOne({
        _id: customerId,
        user: req.user.userId,
      });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      return res.status(200).json(customer);
    }

    const customers = await Customer.find({ user: req.user.userId });
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCustomerKeyValuePair = async (req, res) => {
  try {
    const customers = await Customer.find(
      { user: req.user.userId },
      "businessName _id"
    );
    const customerList = customers.map((customer) => ({
      key: customer._id,
      value: customer.businessName,
    }));
    return res.status(200).json(customerList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
