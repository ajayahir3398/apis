const mongoose = require("mongoose");

const inwardChallanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
        productId: {
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

const InwardChallan = mongoose.model("InwardChallan", inwardChallanSchema);
module.exports = InwardChallan;
