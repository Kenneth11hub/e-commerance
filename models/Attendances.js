const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    in: {
      type: String,
    },
    out: {
      type: String,
    },
    deletedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.query.byUser = function (userId) {
  return this.where({ userId });
};

const Entity = mongoose.model("Attendances", modelSchema);

module.exports = Entity;
