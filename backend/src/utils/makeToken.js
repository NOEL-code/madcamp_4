const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  console.log("액세스 토큰 생성 시작:", payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  console.log("액세스 토큰 생성 완료:", token);
  return token;
};

const generateRefreshToken = (payload) => {
  console.log("리프레시 토큰 생성 시작:", payload);
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  console.log("리프레시 토큰 생성 완료:", token);
  return token;
};

module.exports = { generateAccessToken, generateRefreshToken };
