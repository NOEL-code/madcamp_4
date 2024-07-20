const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPhotoUrl: [
    {
      type: Number,
      required: true,
      default: 0,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
