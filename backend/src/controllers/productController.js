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
  const userId = req.params.userId;
  console.log("Fetching products for userId:", userId);

  try {
    const products = await getSuccessBidUserProducts(userId);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching user's success bid products:", error);
    res.status(500).json({ message: error.message });
  }
};

// 유저가 좋아요를 누른 상품 리스트 조회
exports.getLikedProductListByUserId = async (req, res) => {
  try {
    const products = await getLikedProductListByUserId(req.params.userId);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
