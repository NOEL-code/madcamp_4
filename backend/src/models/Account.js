const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
