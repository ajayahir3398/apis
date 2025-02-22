const mongoose = require("mongoose");

const outwardChallanSchema = new mongoose.Schema(
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

const OutwardChallan = mongoose.model("OutwardChallan", outwardChallanSchema);
module.exports = OutwardChallan;
