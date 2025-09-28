const express = require("express");
const cors = require("cors");

const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const forgotRoutes = require("./routes/forgotPassword");
const resetRoutes = require("./routes/resetPassword");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/auth/signup", signupRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/auth/forgot-password", forgotRoutes);
app.use("/api/auth/reset-password", resetRoutes);
app.use("/api/users", usersRoutes);

module.exports = app;
