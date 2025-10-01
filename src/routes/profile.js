const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const auth = require("../middleware/auth");

// GET profile
router.get("/", auth, async (req, res) => {
  try {
    console.log("📍 GET /api/profile - userId:", req.userId); // ✅ debug

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      console.error("❌ User not found:", req.userId);
      return res.status(404).json({ error: "User not found" });
    }

    console.log("✅ User found:", user); // ✅ debug

    // ✅ PERBAIKAN: Wrap dalam object dengan key "user"
    res.json({
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        divisi: user.divisi,
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

    const updated = await User.findByIdAndUpdate(
      req.userId,
      { username, avatar },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ PERBAIKAN: Wrap dalam object dengan key "user"
    res.json({
      user: {
        username: updated.username,
        email: updated.email,
        avatar: updated.avatar,
        divisi: updated.divisi,
      },
    });
  } catch (err) {
    console.error("❌ Failed to update:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
