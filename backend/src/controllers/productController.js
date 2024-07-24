// controllers/productController.js

const {
  getProducts,
  getProductById,
  saveProduct,
  updateProduct,
  deleteProductById,
  biddingProduct,
  closeBid,
  getUserProducts,
  getSuccessBidUserProducts,
  getLikedProductListByUserId,
} = require("../services/productService");
const upload = require("../utils/s3");

// 상품 전체 조회
exports.getProducts = async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 상품 1개 조회
exports.getProductById = async (req, res) => {
  try {
    console.log("여긴 아님");
    const product = await getProductById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 상품 저장
// controllers/productController.js

exports.saveProduct = [
  upload.array("productPhotos", 10), // 최대 10개의 파일 업로드 허용
  async (req, res) => {
    try {
      const productData = req.body;
      productData.productPhotoUrl = req.files.map((file) => file.location);
      const newProduct = await saveProduct(productData);
      res.status(201).json(newProduct);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// 상품 수정
exports.updateProduct = [
  upload.array("productPhotos", 10), // 최대 10개의 파일 업로드 허용
  async (req, res) => {
    try {
      const productData = req.body;
      if (req.files.length > 0) {
        productData.productPhotoUrl = req.files.map((file) => file.location);
      }
      const updatedProduct = await updateProduct(
        req.params.productId,
        productData
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(updatedProduct);
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Server error" });
    }
  },
];

// 상품 삭제
exports.deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await deleteProductById(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 입찰하기
exports.biddingProduct = async (req, res) => {
  try {
    const bid = await biddingProduct(req.params.productId, req.body);
    res.status(200).json(bid);
  } catch (err) {
    console.error("Error in biddingProduct controller:", err);
    res.status(500).json({ message: err.message });
  }
};

// 낙찰하기
exports.closeBid = async (req, res) => {
  try {
    const closedBid = await closeBid(req.params.productId, req.user.id);
    res.status(200).json(closedBid);
  } catch (err) {
    console.error("Error in closeBid controller:", err);
    res.status(500).json({ message: err.message });
  }
};

// 유저가 올린 상품 리스트 조회
exports.getUserProducts = async (req, res) => {
  try {
    const products = await getUserProducts(req.params.userId);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 유저가 낙찰받은 상품 리스트 조회
exports.getSuccessBidUserProducts = async (req, res) => {
  try {
    const userId = req.params.id;
    const products = await getSuccessBidUserProducts(userId);
    if (products.length === 0) {
      return res
        .status(202)
        .json({ message: "No products found for this user" });
    }
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching user's success bid products:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// 유저가 좋아요를 누른 상품 리스트 조회
exports.getLikedProductListByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log("사용자 ID:", userId); // 로그 추가
    const products = await getLikedProductListByUserId(userId); // Ensure the user ID is fetched correctly
    console.log("좋아요 상품 목록 조회 완료"); // 로그 추가
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching liked product list:", err);
    res.status(500).json({ message: "Server error" });
  }
};
