const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BidHistory 스키마 정의
const bidHistorySchema = new Schema({
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Product 스키마 정의
const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productName: {
    type: String,
    required: true,
  },
  productPhotoUrl: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  price: {
    // 초기값: 판매자가 등록한 최저 입찰가 -> 누군가 입찰을 하면 최고 입찰가로 수정됨
    type: Number,
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
  bidHistory: [bidHistorySchema], // BidHistory 스키마를 배열 형태로 포함
  winnerId: {
    // 낙찰받은 사람의 id
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
