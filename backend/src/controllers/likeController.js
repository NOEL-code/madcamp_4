const {
  likeProduct,
  cancelLikeProduct,
  getUserLikeList,
} = require("../services/likeService");

exports.likeProduct = async (req, res) => {
  try {
    const result = await likeProduct(req.user.id, req.params.productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 좋아요 취소하기
exports.cancelLikeProduct = async (req, res) => {
  try {
    const like = await cancelLikeProduct(req.user.id, req.params.productId);
    res.status(200).json(like);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// controllers/likeController.js
exports.getUserLikes = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await getUserLikeList(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getUserLikes controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
