const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/Users");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email dan password wajib diisi" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Password salah" });

    // Sign token dengan user._id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userData = {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      divisi: user.divisi,
    };

    console.log("Login success for:", userData);

    // Kirim token + userData sekaligus
    return res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
});

module.exports = router;
