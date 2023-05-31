const mongoose = require("mongoose");

const CartsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    isOrdered: {
      type: Boolean,
      default: false, //onCart ordered preparing pending delivered
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

CartsSchema.query.isOrdered = function () {
  return this.where({ isOrdered: false });
};
const Carts = mongoose.model("Carts", CartsSchema);

module.exports = Carts;
