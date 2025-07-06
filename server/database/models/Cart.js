const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart",CartSchema);
