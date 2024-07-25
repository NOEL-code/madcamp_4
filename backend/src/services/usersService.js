const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const {
  makeAccessToken,
  makeRefreshToken,
  verifyRefreshToken,
} = require("../utils/auth");
const TokenModel = require("./tokenService");

exports.registerUser = async ({
  userEmail,
  userPassword,
  name,
  phoneNumber,
}) => {
  console.log("registerUser service called with:", {
    userEmail,
    userPassword,
    name,
    phoneNumber,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userPassword, salt);

  const user = new User({
    userEmail,
    userPassword: hashedPassword,
    name,
    phoneNumber,
  });

  await user.save();

  const accessToken = makeAccessToken(user._id);
  const refreshToken = makeRefreshToken(user._id);

  await TokenModel.updateRefresh({
    user_id: user.id,
    refreshToken,
  });

  console.log("registerUser service successful, tokens:", {
    accessToken,
    refreshToken,
  });
  return { accessToken, refreshToken };
};

exports.loginUser = async ({ userEmail, userPassword }) => {
  console.log("loginUser service called with:", { userEmail, userPassword });
  let user = await User.findOne({ userEmail });
  if (!user) {
    console.error("loginUser error: 가입된 id가 아님");
    throw new Error("가입된 id가 아님");
  }

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);
  if (!isMatch) {
    console.error("loginUser error: 비밀번호가 일치하지 않습니다.");
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const resUser = {
    id: user._id,
    phoneNumber: user.phoneNumber,
    name: user.name,
    balance: user.account.balance,
    favorites: user.favorites,
  };

  const payload = {
    id: user.id,
  };
  const accessToken = makeAccessToken(payload);
  const refreshToken = makeRefreshToken(payload);

  await TokenModel.updateRefresh({
    user_id: user.id,
    refreshToken,
  });

  console.log("loginUser service successful, tokens and user:", {
    accessToken,
    refreshToken,
    resUser,
  });
  return { accessToken, refreshToken, resUser };
};

exports.refreshAccessToken = async (refreshToken) => {
  console.log("refreshAccessToken service called with:", refreshToken);
  try {
    const decoded = await verifyRefreshToken(refreshToken);
    const userToken = await TokenModel.findToken(decoded.id);

    if (!userToken || userToken.refreshToken !== refreshToken) {
      console.error("refreshAccessToken error: 유효하지 않은 리프레시 토큰");
      throw new Error("유효하지 않은 리프레시 토큰");
    }

    const newAccessToken = makeAccessToken({ id: decoded.id });
    console.log(
      "refreshAccessToken service successful, new accessToken:",
      newAccessToken
    );
    return newAccessToken;
  } catch (error) {
    console.error("refreshAccessToken service error:", error.message);
    throw new Error("유효하지 않은 리프레시 토큰");
  }
};

exports.getCurrentUser = async (userId) => {
  console.log("getCurrentUser service called with userId:", userId);
  const user = await User.findById(userId).select("-userPassword"); // 비밀번호 제외
  if (!user) {
    console.error("getCurrentUser error: User not found");
    throw new Error("User not found");
  }
  console.log("getCurrentUser service successful, user:", user);
  return {
    id: user._id,
    userName: user.name,
  };
};

exports.logoutUser = async (userId) => {
  console.log("logoutUser service called with userId:", userId);
  await TokenModel.deleteToken(userId);
  console.log("logoutUser service successful");
};

exports.getAccountBalanceByUserId = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user.account.balance;
};
