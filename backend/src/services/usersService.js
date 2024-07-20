const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { makeAccessToken, makeRefreshToken } = require("../utils/makeToken");
const TokenModel = require("../models/Token");
const mongoose = require("mongoose");

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
  let user = await User.findOne({ userEmail });
  if (user) {
    console.error("registerUser error: User already exists");
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userPassword, salt);

  user = new User({
    userEmail,
    userPassword: hashedPassword,
    name,
    phoneNumber,
  });

  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  const accessToken = makeAccessToken(payload);
  const refreshToken = makeRefreshToken(payload);

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
    userEmail: user.userEmail,
  };

  const payload = {
    user: {
      id: user.id,
    },
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
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const userToken = await TokenModel.findToken(decoded.user.id);

    if (!userToken || userToken.refreshToken !== refreshToken) {
      console.error("refreshAccessToken error: 유효하지 않은 리프레시 토큰");
      throw new Error("유효하지 않은 리프레시 토큰");
    }

    const payload = {
      user: {
        id: decoded.user.id,
      },
    };

    const newAccessToken = makeAccessToken(payload);
    console.log(
      "refreshAccessToken service successful, new accessToken:",
      newAccessToken
    );
    return { accessToken: newAccessToken };
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
    userEmail: user.userEmail,
    phoneNumber: user.phoneNumber,
  };
};

exports.logoutUser = async (userId) => {
  console.log("logoutUser service called with userId:", userId);
  await TokenModel.deleteToken(userId);
  console.log("logoutUser service successful");
};