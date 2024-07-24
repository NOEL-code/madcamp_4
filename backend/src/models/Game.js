const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  users: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      score: {
        type: Number,
        default: 0,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
    },
  ],
  sellerId: {
    type: Schema.Types.ObjectId,
  },
  productId: {
    type: Schema.Types.ObjectId,
  },
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
