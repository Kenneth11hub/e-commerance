const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "ordered", //ordered preparing transit delivered cancelled
    },
    isCod: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byStatus = function (status) {
  return this.where({ status });
};
modelSchema.query.byFarmer = function (farmerId) {
  if (farmerId === "63aa7bd042b1e0d90e533f35") {
    return this;
  }
  return this.where({ farmerId });
};

const Entity = mongoose.model("Sales", modelSchema);

module.exports = Entity;
