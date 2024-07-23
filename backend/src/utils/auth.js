const jwt = require("jsonwebtoken");

// 액세스 토큰 생성 함수
exports.generateAccessToken = (userId) => {
  const payload = { userId };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h", // 액세스 토큰 유효기간
  });
  return accessToken;
};

// 리프레시 토큰 생성 함수
exports.generateRefreshToken = (userId) => {
  const payload = { userId };
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d", // 리프레시 토큰 유효기간
  });
  return refreshToken;
};

// 리프레시 토큰 검증 함수
exports.verifyRefreshToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};
