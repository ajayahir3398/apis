const Supplier = require("../models/supplierModel");

exports.addSupplier = async (req, res) => {
  try {
    const {
      businessName,
      supplierName,
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
      !supplierName ||
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
    const existingEmail = await Supplier.findOne({
      email,
      user: req.user.userId,
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if the mobile number already exists
    const existingMobileNo = await Supplier.findOne({
      mobileNo,
      user: req.user.userId,
    });
    if (existingMobileNo) {
      return res.status(400).json({ message: "Mobile number already exists" });
    }

    // Check if the business name already exists
    const existingBusinessName = await Supplier.findOne({
      businessName,
      user: req.user.userId,
    });
    if (existingBusinessName) {
      return res.status(400).json({ message: "Business name already exists" });
    }

    // Check if the GST number already exists
    const existingGstNo = await Supplier.findOne({
      gstNo,
      user: req.user.userId,
    });
    if (existingGstNo) {
      return res.status(400).json({ message: "GST number already exists" });
    }

    // Create supplier
    const newSupplier = new Supplier({
      user: req.user.userId,
      businessName,
      supplierName,
      gstNo,
      mobileNo,
      email,
      gender,
      dob,
      image,
      address: { street, street2, city, state, pinCode, country },
    });

    await newSupplier.save();
    return res.status(201).json({ message: "Supplier added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSupplier = async (req, res) => {
  try {
    const { supplierId } = req.query;

    if (supplierId) {
      const supplier = await Supplier.findOne({
        _id: supplierId,
        user: req.user.userId,
      });
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      return res.status(200).json(supplier);
    }

    const suppliers = await Supplier.find({ user: req.user.userId });
    return res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSupplierKeyValuePair = async (req, res) => {
  try {
    const suppliers = await Supplier.find(
      { user: req.user.userId },
      "businessName _id"
    );
    const supplierList = suppliers.map((supplier) => ({
      key: supplier._id,
      value: supplier.businessName,
    }));
    return res.status(200).json(supplierList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;
    const {
      businessName,
      supplierName,
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
      !supplierName ||
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

    const supplier = await Supplier.findOneAndUpdate(
      { _id: supplierId, user: req.user.userId },
      {
        businessName,
        supplierName,
        gstNo,
        mobileNo,
        email,
        gender,
        dob,
        image,
        address: { street, street2, city, state, pinCode, country },
      },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier updated successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const { supplierId } = req.params;

    const supplier = await Supplier.findOneAndDelete({
      _id: supplierId,
      user: req.user.userId,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};