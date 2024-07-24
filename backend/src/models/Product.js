const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// BidHistory 스키마 정의
const bidHistorySchema = new Schema({
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bidderName: {
    type: String,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  gameScore: {
    type: Number,
  },
  isSameScore: {
    type: Boolean,
    default: false,
  },
  bidTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
const categories = [
  "의류",
  "가방",
  "시계",
  "주얼리",
  "테크",
  "가구/리빙",
  "미술품",
  "푸드",
];

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
  category: {
    type: String,
    enum: categories,
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
  isClose: {
    type: Number,
    default: 0, // 0: 입찰 받는 중, 1: 판매완료, 2: 동점자 게임 대기 중
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
