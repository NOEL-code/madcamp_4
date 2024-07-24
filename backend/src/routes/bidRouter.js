var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  biddingProduct,
  closeBid,
  updateSameScoreBid,
  createGame,
  updateScore,
} = require("../controllers/bidController");

router.post("/:productId", authenticateToken, biddingProduct); // 입찰하기
router.post("/close/:productId", authenticateToken, closeBid); // 낙찰하기 -> 글쓴이만 가능
router.put("/sameScore/:productId", authenticateToken, updateSameScoreBid); // 같은 가격으로 낙찰 -> isClose code: 2로 수정

router.post("/create-game", authenticateToken, createGame);
router.put("/update-score", authenticateToken, updateScore);

module.exports = router;
