const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const auth = require("../middleware/auth");

// UPDATE profile
router.put("/", auth, async (req, res) => {
  try {
    const { username, avatar } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId, // 🔑 langsung pakai userId dari auth
      { username, avatar },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
