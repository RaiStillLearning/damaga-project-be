// routes/profile.js
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const u = req.user; // dari authMiddleware, pastikan include role

    res.json({
      user: {
        id: u._id,
        username: u.username,
        email: u.email,
        avatar: u.avatar,
        // divisi: u.divisi,
        role: u.role, // ⬅️ penting
      },
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
