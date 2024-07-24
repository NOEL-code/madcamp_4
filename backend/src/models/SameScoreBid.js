const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SameScoreBiddingSchema = new Schema({
  users: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      score: {
        type: Number,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  productId: {
    type: Schema.Types.ObjectId,
  },
});

const SameScoreBidding = mongoose.model("Account", SameScoreBiddingSchema);

module.exports = SameScoreBidding;
