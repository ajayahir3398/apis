const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, sessionId: new Date().getTime() },
      JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
    console.log(req.body);

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
