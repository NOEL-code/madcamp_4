const mongoose = require("mongoose");

const favoriteItemSchema = new Schema({
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

const UserSchema = mongoose.Schema({
  userEmail: String,
  userPassword: String,
  name: String,
  phoneNumber: String,
  favorites: [favoriteItemSchema],
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
