const { Like } = require("../models/Like");

exports.likeProduct = async (userId, productId) => {
  // 이미 존재하는 좋아요인지 검사
  const existingLike = await Like.findOne({ userId, productId });
  if (existingLike) {
    return { message: "Like already exists", like: existingLike };
  }

  // 새로운 좋아요 생성
  const newLike = new Like({ userId, productId });
  await newLike.save();
  return { message: "Like created", like: newLike };
};

exports.cancelLikeProduct = async (userId, productId) => {
  const like = await Like.findOneAndDelete({ userId, productId });
  if (!like) {
    throw new Error("Like not found");
  }
  return like;
};

exports.getUserLikeList = async (userId) => {
  try {
    const likeList = await Like.find({ userId }).populate("productId");
    const products = likeList.map((like) => like.productId);
    return products;
  } catch (error) {
    console.error("Error fetching user like list:", error);
    throw new Error("Failed to fetch user like list");
  }
};
