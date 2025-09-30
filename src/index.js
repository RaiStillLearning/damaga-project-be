const express = require("express");
const cors = require("cors");
const app = express();

// const authRoutes = require("./routes/Auth");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const forgotRoutes = require("./routes/forgotPassword");
const verifyRoutes = require("./routes/verify-otp");
const resetRoutes = require("./routes/resetPassword");
const usersRoutes = require("./routes/users");

const profileRoutes = require("./routes/profile");
const updateProfileRoute = require("./routes/updateProfile");

// middleware JSON harus di atas semua route
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// routes auth
app.use((req, res, next) => {
  console.log("🔥 Incoming Request:", req.method, req.url);
  next();
});
// app.use("/api/auth", authRoutes);
app.use("/api/auth/signup", signupRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/auth/forgot-password", forgotRoutes);
app.use("/api/auth/reset-password/verify-otp", verifyRoutes);
app.use("/api/auth/reset-password", resetRoutes);
app.use("/api/users", usersRoutes);

// routes profile
app.use("/api/profile", profileRoutes);
app.use("/api/profile-update", updateProfileRoute);

module.exports = app;
