import express, { urlencoded } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { authenticateToken } from "./middlewares/auth.js";
import cors from "cors";

import { sloteRouter } from "./routes/sloteRoutes.js";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route

app.use("/user", authRouter);
app.use("/authed", userRouter);

app.use("/slot", sloteRouter);
app.get("/", (req, res) => {
  res.send("Hello, World! (ES6 Imports)");
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
