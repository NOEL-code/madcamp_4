// services/productService.js

const Product = require("../models/Product");
const User = require("../models/User");
// 상품 전체 조회
exports.getProducts = async () => {
  return await Product.find();
};

// 상품 1개 조회
exports.getProductById = async (productId) => {
  return await Product.findById(productId);
};

// 상품 저장
exports.saveProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

// 상품 수정
exports.updateProduct = async (productId, productData) => {
  return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

// 상품 삭제
exports.deleteProductById = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};

// 입찰하기
exports.biddingProduct = async (productId, bidData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  product.bidHistory.push(bidData);
  if (bidData.bidAmount > product.price) {
    product.price = bidData.bidAmount;
    product.winnerId = bidData.bidderId;
  } else {
    throw new Error("Must over exist bid price ");
  }
  return await product.save();
};

// 낙찰하기
exports.closeBid = async (productId, userId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  if (product.userId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // 가장 높은 입찰 금액을 찾기
  let highestBid = 0;
  let highestBidderId = null;
  for (const bid of product.bidHistory) {
    if (bid.bidAmount > highestBid) {
      highestBid = bid.bidAmount;
      highestBidderId = bid.bidderId;
    }
  }

  if (highestBidderId) {
    product.winnerId = highestBidderId; // 낙찰받은 사람의 ID 설정
  }

  product.dueDate = new Date(); // 낙찰 날짜 설정
  return await product.save();
};

// 유저가 올린 상품 리스트 조회
exports.getUserProducts = async (userId) => {
  return await Product.find({ userId });
};

// 유저가 낙찰받은 상품 리스트 조회
exports.getSuccessBidUserProducts = async (userId) => {
  return await Product.find({ winnerId: userId });
};

// 유저가 좋아요를 누른 상품 리스트 조회
exports.getLikedProductListByUserId = async (userId) => {
  const user = await User.findById(userId).populate({
    path: "favorites.productId",
    model: "Product",
  });

  // product의 전체 정보를 리턴
  return user.favorites.map((favorite) => favorite.productId);
};
