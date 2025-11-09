require("dotenv").config();
const connectDb = require("./config/mongoDb");

const app = require("./index");

connectDb();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server is running on port 5000");
  console.log("http://localhost:5000");
});
