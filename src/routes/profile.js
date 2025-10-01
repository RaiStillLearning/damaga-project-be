const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// GET profile
router.get("/", auth, async (req, res) => {
  try {
    console.log("📍 GET /api/profile - user:", req.user); // ✅ debug

    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
        divisi: req.user.divisi,
      },
    });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE profile
router.put("/", auth, async (req, res) => {
  try {
    const { username, avatar } = req.body;

    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user.username = username || req.user.username;
    req.user.avatar = avatar || req.user.avatar;

    await req.user.save();

    res.json({
      user: {
        username: req.user.username,
        email: req.user.email,
        avatar: req.user.avatar,
        divisi: req.user.divisi,
      },
    });
  } catch (err) {
    console.error("❌ Failed to update:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
