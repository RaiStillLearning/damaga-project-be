const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const auth = require("../middleware/auth");

// GET profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE profile
router.put("/", auth, async (req, res) => {
  try {
    const { username, avatar } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { username, avatar },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
