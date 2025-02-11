const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc Get all users
exports.login = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.register = async (req, res) => {
  try {
    const {
      businessName,
      name,
      gstNo,
      mobileNo,
      email,
      gender,
      dob,
      street,
      street2,
      city,
      state,
      pinCode,
      country,
      password,
      confirmPassword,
    } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Mobile number already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      businessName,
      name,
      gstNo,
      mobileNo,
      email,
      gender,
      dob,
      address: { street, street2, city, state, pinCode, country },
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
