var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  biddingProduct,
  closeBid,
  updateSameScoreBid,
  createGame,
  updateScore,
  closeGame,
  findGameByProductId,
} = require("../controllers/bidController");

router.post("/:productId", authenticateToken, biddingProduct); // 입찰하기
router.post("/close/:productId", authenticateToken, closeBid); // 낙찰하기 -> 글쓴이만 가능
router.put("/sameScore/:productId", authenticateToken, updateSameScoreBid); // 같은 가격으로 낙찰 -> isClose code: 2로 수정

router.get("/game/:productId", authenticateToken, findGameByProductId); //게임 정보 가져오가
router.post("/create/game", authenticateToken, createGame); // 게임 만들기
router.put("/update/score", authenticateToken, updateScore); //게임 점수 업데이트 하기
router.post("/close/game", authenticateToken, closeGame); // 게임 종료 -> 낙찰하기

module.exports = router;
