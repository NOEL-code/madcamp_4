const mongoose = require("mongoose");
const { Schema } = mongoose; // mongoose에서 Schema를 가져옵니다.

// 즐겨찾기 항목 스키마 정의

// 유저 스키마 정의
const UserSchema = new Schema({
  userEmail: String,
  userPassword: String,
  name: String,
  phoneNumber: String,
  account: {
    balance: {
      type: Number,
      required: true,
      default: 100000000,
    },
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
