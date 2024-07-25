const {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getAccountBalanceByUserId,
  getCurrentUser,
} = require("../services/usersService");

// 회원가입
exports.registerUser = async (req, res) => {
  console.log("registerUser called with body:", req.body);
  const { userEmail, userPassword, name, phoneNumber } = req.body;

  try {
    const { accessToken, refreshToken } = await registerUser({
      userEmail,
      userPassword,
      name,
      phoneNumber,
    });
    console.log("registerUser successful:", { accessToken, refreshToken });
    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    if (err.message === "User already exists") {
      console.error("registerUser error: User already exists");
      return res.status(400).json({ message: err.message });
    }
    console.error("registerUser error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 로그인
exports.loginUser = async (req, res) => {
  console.log("loginUser called with body:", req.body);
  const { userEmail, userPassword } = req.body;

  try {
    const { accessToken, refreshToken, resUser } = await loginUser({
      userEmail,
      userPassword,
    });
    console.log("loginUser successful:", {
      accessToken,
      refreshToken,
      resUser,
    });
    res.status(201).json({ accessToken, refreshToken, resUser });
  } catch (err) {
    if (err.message === "가입된 id가 아님") {
      console.error("loginUser error:", err.message);
      return res.status(401).json({ message: err.message });
    }
    if (err.message === "비밀번호가 일치하지 않습니다.") {
      console.error("loginUser error:", err.message);
      return res.status(403).json({ message: err.message });
    }
    console.error("loginUser error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// 로그아웃
exports.logoutUser = async (req, res) => {
  console.log("logoutUser called with user id:", req.user.id);
  try {
    await logoutUser(req.user.id);
    console.log("logoutUser successful");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("logoutUser error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// 리프레시 토큰으로 엑세스 토큰 반환
exports.refreshToken = async (req, res) => {
  console.log("refreshToken called with body:", req.body);
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.error("refreshToken error: 리프레시 토큰이 필요합니다.");
    return res.status(401).json({ message: "리프레시 토큰이 필요합니다." });
  }

  try {
    const accessToken = await refreshAccessToken(refreshToken);
    console.log("refreshToken successful, new accessToken:", accessToken);
    res.status(200).json({ accessToken });
  } catch (err) {
    console.error("refreshToken error:", err.message);
    res.status(403).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await getCurrentUser(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// 계좌 잔고 조회
exports.getAccountBalanceByUserId = async (req, res) => {
  try {
    const balance = await getAccountBalanceByUserId(req.params.userId);
    res.status(200).json({ balance });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
