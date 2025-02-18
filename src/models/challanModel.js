const mongoose = require("mongoose");

const challanSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    date: { type: Date, required: true },
    vehicleNo: { type: String, required: true },
    driverName: { type: String, required: true },
    driverMoNo: { type: String, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Challan = mongoose.model("Challan", challanSchema);
module.exports = Challan;
