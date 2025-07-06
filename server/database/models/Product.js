const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
      trim:true
    },
    product_sub_category: {
      type: String,
      required: true,
      trim:true,
    },
    product_carbon_footprint: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Product", ProductSchema);
