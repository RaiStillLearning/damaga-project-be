const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(process.env.API_PH)
  .then(() => console.log("✅ Berhasil Terhubung ke MongoDB"))
  .catch((err) => console.log("❌ Gagal Terhubung ke MongoDB", err));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  console.log("http://localhost:5000");
});
