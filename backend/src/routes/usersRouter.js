var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  getAccountBalanceByUserId,
  likeProduct,
  cancelLikeProduct,
} = require("../controllers/usersController");

router.post("/register", registerUser); // 회원가입
router.post("/login", loginUser); // 로그인
router.post("/logout", authenticateToken, logoutUser); // 로그아웃
router.post("/refresh-token", refreshToken); // 리프레시 토큰을 주면 엑세스 토큰 반환
router.get(
  "/accountBalance/:userId",
  authenticateToken,
  getAccountBalanceByUserId
); // 계좌 잔고 조회
router.post("/like/:productId", authenticateToken, likeProduct); // 좋아요 누르기
router.delete("/like/:productId", authenticateToken, cancelLikeProduct); // 좋아요 취소하기

module.exports = router;
