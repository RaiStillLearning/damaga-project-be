const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../model/Users");
const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
  console.log("REQ BODY:", req.body);
  res.json({ body: req.body });

  try {
    const { username, divisi, email, password } = req.body;

    if (!username || !divisi || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      divisi,
      email,
      password: hashed,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
