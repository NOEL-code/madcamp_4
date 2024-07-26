const jwt = require("jsonwebtoken");

exports.makeAccessToken = (userId) => {
  const payload = { id: userId.toString() }; // userId를 객체로 변환
  console.log("액세스 토큰 생성 시작:", payload);
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });
  console.log("액세스 토큰 생성 완료:", token);
  return token;
};

exports.makeRefreshToken = (userId) => {
  const payload = { id: userId.toString() }; // userId를 객체로 변환
  console.log("리프레시 토큰 생성 시작:", payload);
  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  console.log("리프레시 토큰 생성 완료:", token);
  return token;
};

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
