const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    customerName: { type: String, required: true },
    gstNo: { type: String, required: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },
    address: {
      street: { type: String, required: true },
      street2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
