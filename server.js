import express from "express";
import config from "config";
import { authRouter } from "./routes/auth.register.js";
const app = express();
const PORT = config.get("PORT") || 5500;

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
