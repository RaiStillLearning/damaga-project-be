// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    divisi: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "/default-avatar.png" },
    otp: String,
    otpExpires: Date,
    otpVerified: { type: Boolean, default: false },
    // TAMBAHKAN INI
    dashboardTiles: {
      type: [
        {
          id: String,
          title: String,
          url: String,
          iconName: String,
          description: String,
          color: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
