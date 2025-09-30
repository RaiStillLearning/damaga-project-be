const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const auth = require("../middleware/auth");

// UPDATE profile
router.put("/", auth, async (req, res) => {
  try {
    const { username, avatar } = req.body; // email tidak diubah

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, avatar },
      { new: true }
    ).select("-password");

    // Kirim data updated
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

module.exports = router;
