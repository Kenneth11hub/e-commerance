const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    expiry: {
      type: Date,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discounted: {
      type: Number,
      required: false,
    },
    isDiscounted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byFarmer = function (farmerId) {
  if (farmerId === "63aa7bd042b1e0d90e533f35" || farmerId === "customer") {
    return this;
  }
  return this.where({ farmerId });
};

const Entity = mongoose.model("Products", modelSchema);

module.exports = Entity;
