const Product = require("../models/Product");
const { User } = require("../models/User");
const mongoose = require("mongoose");

// 상품 전체 조회
exports.getProducts = async () => {
  const products = await Product.aggregate([
    {
      $lookup: {
        from: "like",
        localField: "_id",
        foreignField: "productId",
        as: "likes",
      },
    },
    {
      $addFields: {
        likesCount: { $size: "$likes" },
      },
    },
    {
      $project: {
        likes: 0, // likes 배열을 제외하고 반환
      },
    },
  ]);

  return products;
};

// 상품 1개 조회
exports.getProductById = async (productId) => {
  try {
    const product = await Product.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(productId) },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "productId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          likes: 0, // likes 배열을 제외하고 반환
        },
      },
    ]);

    return product[0];
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw new Error("Server error");
  }
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
  return await Product.find({ winnerId: userId }).where("winnerId").ne(null);
};

// 유저가 좋아요를 누른 상품 리스트 조회
exports.getLikedProductListByUserId = async (userId) => {
  console.log("좋아요 상품 목록 조회 시작"); // 로그 추가
  const user = await User.findById(userId).populate({
    path: "favorites.productId",
    model: "Product",
  });

  if (!user) {
    console.log("사용자 없음"); // 로그 추가
    throw new Error("User not found");
  }

  console.log("사용자 좋아요 목록:", user.favorites); // 로그 추가
  return user.favorites.map((favorite) => favorite.productId);
};
