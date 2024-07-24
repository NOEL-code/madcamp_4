const Product = require("../models/Product");
const { User } = require("../models/User");
const mongoose = require("mongoose");
const Alarm = require("../models/Alarm");
// 상품 전체 조회
exports.getProducts = async () => {
  const products = await Product.aggregate([
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
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const user = await User.findById(bidData.bidderId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user has enough balance
    if (user.account.balance < bidData.bidAmount) {
      throw new Error("Insufficient balance");
    }

    const bidDataWithUserName = {
      bidderId: bidData.bidderId,
      bidderName: user.name,
      bidAmount: bidData.bidAmount,
    };

    user.account.balance -= bidData.bidAmount;
    await user.save();

    // Refund the previous highest bidder
    if (product.bidHistory.length > 0) {
      const lastBid = product.bidHistory[product.bidHistory.length - 1];
      const previousBidder = await User.findById(lastBid.bidderId);
      if (previousBidder) {
        previousBidder.account.balance += lastBid.bidAmount;
        await previousBidder.save();
        console.log(
          `Refunded ${lastBid.bidAmount} to previous bidder ${previousBidder.name}, new balance: ${previousBidder.account.balance}`
        );
      }
    }

    // Deduct the bid amount from the current bidder's balance

    console.log(
      `Deducted ${bidData.bidAmount} from current bidder ${user.name}, new balance: ${user.account.balance}`
    );

    product.bidHistory.push(bidDataWithUserName);

    if (bidDataWithUserName.bidAmount > product.price) {
      product.price = bidDataWithUserName.bidAmount;
    } else {
      throw new Error("Bid amount must be higher than the current price");
    }

    await product.save();
    return product;
  } catch (error) {
    console.error("Error in biddingProduct service:", error);
    throw error;
  }
};
// 낙찰하기
exports.closeBid = async (productId, userId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.userId.toString() !== userId) {
      throw new Error("Unauthorized");
    }
    if (product.winnerId) {
      throw new Error("The auction is already closed.");
    }

    // Find the highest bid
    let highestBid = 0;
    let highestBidderId = null;
    for (const bid of product.bidHistory) {
      if (bid.bidAmount > highestBid) {
        highestBid = bid.bidAmount;
        highestBidderId = bid.bidderId;
      }
    }

    if (highestBidderId) {
      product.winnerId = highestBidderId; // Set the winnerId
    } else {
      throw new Error("No bids available to close the auction");
    }

    product.dueDate = new Date(); // Set the close date

    // Credit the seller's account balance
    const seller = await User.findById(product.userId);
    if (!seller) {
      throw new Error("Seller not found");
    }
    seller.account.balance += highestBid;
    await seller.save();

    console.log(
      `Credited ${highestBid} to seller ${seller.name}, new balance: ${seller.account.balance}`
    );

    const newAlarm = {
      userId: userId,
      title: "낙찰 성공",
      content: `회원님께서 입찰에 참여한 ${product.productName} 상품이 ${product.price}원으로 회원님께 낙찰되었습니다. `,
    };

    const saveAlarm = new Alarm(newAlarm);

    return await product.save();
  } catch (error) {
    console.error("Error in closeBid service:", error);
    throw error;
  }
};

exports.sameScoreBidding = async (userIds) => {};

// 유저가 올린 상품 리스트 조회
exports.getUserProducts = async (userId) => {
  const products = await Product.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
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

  return products;
};

// 유저가 낙찰받은 상품 리스트 조
exports.getSuccessBidUserProducts = async (userId) => {
  try {
    console.log("Fetching products for userId:", userId);
    const products = await Product.aggregate([
      {
        $match: { winnerId: new mongoose.Types.ObjectId(userId) },
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

    console.log("Products found:", products);

    if (products.length === 0) {
      throw new Error("No products found for this user");
    }

    return products;
  } catch (error) {
    console.error("Error in getSuccessBidUserProducts:", error);
    throw new Error(
      "Error fetching user's success bid products: " + error.message
    );
  }
};

// 유저가 좋아요를 누른 상품 리스트 조회
exports.getLikedProductListByUserId = async (userId) => {
  console.log("좋아요 상품 목록 조회 시작"); // 로그 추가
  const user = await User.findById(userId);

  if (!user) {
    console.log("사용자 없음"); // 로그 추가
    throw new Error("User not found");
  }

  const productIds = user.favorites.map((favorite) => favorite.productId);

  const products = await Product.aggregate([
    {
      $match: { _id: { $in: productIds } },
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

  return products;
};
