const {
  biddingProduct,
  closeBid,
  updateSameScoreBid,
  createGame,
} = require("../services/bidService");

// 입찰하기
exports.biddingProduct = async (req, res) => {
  try {
    const bid = await biddingProduct(req.params.productId, req.body);
    res.status(200).json(bid);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 낙찰하기
exports.closeBid = async (req, res) => {
  try {
    const closedBid = await closeBid(req.params.productId, req.user.id);
    res.status(200).json(closedBid);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateSameScoreBid = async (req, res) => {
  try {
    const product = await updateSameScoreBid(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    console.error("Error in updateSameScoreBid", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createGame = async (req, res) => {
  try {
    const game = await createGame(req.body);
    res.status(200).json(game);
  } catch (err) {
    console.error("Error in createGame", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateScore = async (req, res) => {
  const { productId, userId, score } = req.body;
  try {
    const game = await updateScore(productId, userId, score);
    res.status(200).json(game);
  } catch (err) {
    console.error("Error in updateScore", err);
    res.status(500).json({ message: "Server error" });
  }
};
