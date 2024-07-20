var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} = require("../controllers/usersController");

router.get("/"); // 유저 전체 정보 조회
router.post("/register", registerUser); // 회원가입
router.post("/login", loginUser); // 로그인
router.post("/refresh-token", refreshToken); // 리프레시 토큰을 주면 엑세스 토큰 반환
router.get("/logout", authenticateToken, logoutUser);

module.exports = router;
