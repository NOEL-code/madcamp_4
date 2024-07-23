var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  likeProduct,
  cancelLikeProduct,
  getUserLikeList,
} = require("../controllers/likeController");

router.post("/:productId", authenticateToken, likeProduct); // 좋아요 누르기
router.delete("/:productId", authenticateToken, cancelLikeProduct); // 좋아요 취소하기
router.get("/", authenticateToken, getUserLikeList);
module.exports = router;