var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProductById,
  getUserProducts,
  getSuccessBidUserProducts,
  getLikedProductListByUserId,
} = require("../controllers/productController");

router.get("/", getProducts); // 상품 전체 조회
router.get("/:productId", getProductById); // 상품 1개 조회
router.get("/user/:userId", getUserProducts); // 유저가 올린 상품 리스트 조회
router.get("/likedProductList/:userId", getLikedProductListByUserId); // 유저가 좋아요를 누른 상품 리스트 조회

router.post("/", saveProduct); // 상품 저장
router.put("/:productId", authenticateToken, updateProduct); // 상품 수정
router.delete("/:productId", authenticateToken, deleteProductById); // 상품 삭제

router.get("/successBid/user/:userId", getSuccessBidUserProducts); // 유저가 낙찰받은 상품 리스트 조회

module.exports = router;
