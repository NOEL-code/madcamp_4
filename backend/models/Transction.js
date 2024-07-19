const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  senderAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  receiverAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
