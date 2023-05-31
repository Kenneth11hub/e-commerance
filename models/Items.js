const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    saleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sales",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "ordered", //ordered preparing transit delivered cancelled
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.bySaleId = function (saleId) {
  return this.where({ saleId });
};

modelSchema.query.bySynced = function (synced) {
  return this.where({ synced });
};

const Entity = mongoose.model("Items", modelSchema);

module.exports = Entity;
