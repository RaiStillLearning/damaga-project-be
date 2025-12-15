const express = require("express");
const cors = require("cors");
const app = express();

const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const forgotRoutes = require("./routes/forgotPassword");
const verifyRoutes = require("./routes/verify-otp");
const resetRoutes = require("./routes/resetPassword");
const usersRoutes = require("./routes/users");
const profileRoutes = require("./routes/profile");
const updateProfileRoute = require("./routes/updateProfile");

//updated role
const updateRoleRoute = require("./routes/updateRole");

// hanya 1 middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // kalau pake cookie
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// log request
app.use((req, res, next) => {
  console.log("🔥 Incoming Request:", req.method, req.url, {
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
  });
  next();
});

// routes auth
app.use("/api/auth/signup", signupRoutes);
app.use("/api/auth/login", loginRoutes);
app.use("/api/auth/forgot-password", forgotRoutes);
app.use("/api/auth/reset-password/verify-otp", verifyRoutes);
app.use("/api/auth/reset-password", resetRoutes);
app.use("/api/users", usersRoutes);

// tiles routes
const tilesRoutes = require("./routes/tiles");
app.use(tilesRoutes);

// routes profile
app.use("/api/profile", profileRoutes);
app.use("/api/profile-update", updateProfileRoute);

//Routes Book A Room
const bookARoomRoutes = require("./routes/Book-A-Room/controllers");
app.use("/api/book-a-room", bookARoomRoutes);

//update role
app.use("/api/admin", updateRoleRoute);

//Room Rate
const roomRateRoutes = require("./routes/roomRateRutes");
app.use("/api/room-rates", roomRateRoutes);

//room status
const roomsRouter = require("./routes/rooms");
app.use("/api/rooms", roomsRouter);

module.exports = app;
