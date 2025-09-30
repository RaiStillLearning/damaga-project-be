const jwt = require("jsonwebtoken");
const User = require("../model/Users"); // pastiin path sesuai

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: "No token provided" });

    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid token format" });

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ambil user fresh dari DB pake decoded.id
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // sekarang req.user = data fresh dari DB
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
