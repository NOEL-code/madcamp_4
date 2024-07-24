const Product = require("../models/Product");
const { Like } = require("../models/Like");
const mongoose = require("mongoose");
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

// 유저가 낙찰받은 상품 리스트 조회
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
exports.getLikedProductListByUserId = async (userId) => {
  try {
    console.log(userId);
    console.log("좋아요 상품 목록 조회 시작");

    const likes = await Like.find({ userId });

    if (likes.length === 0) {
      console.log("좋아요를 누른 상품이 없습니다.");
      return [];
    }

    const productIds = likes.map((like) => like.productId);
    console.log("좋아요 상품 ID 목록:", productIds);

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

    console.log("좋아요 상품 목록 조회 완료:", products);
    return products;
  } catch (error) {
    console.error("Error in getLikedProductListByUserId:", error);
    throw error;
  }
};
