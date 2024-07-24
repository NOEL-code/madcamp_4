const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const LikeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = { Like };
