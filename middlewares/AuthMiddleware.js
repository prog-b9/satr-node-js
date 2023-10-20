const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "token is empty" });
    }

    const decode = jwt.verify(token, "tokenKey");
    // req.user => user من عندي انا انشأها
    req.user = decode;
    next();
  } catch (error) {
    return res.json({ message: "token is wrong" });
  }
};

module.exports = AuthMiddleware;
