import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));
