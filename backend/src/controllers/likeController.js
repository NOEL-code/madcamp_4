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

exports.getUserLikeList = async (req, res) => {
  try {
    const likeList = await getUserLikeList(req.user.id);
    res.status(200).json(likeList);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
