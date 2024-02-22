import express from "express";
import config from "config";
import { authRouter } from "./routes/auth.register.js";
import { linkRouter } from "./routes/link.route.js";
const app = express();
const PORT = process.env?.PORT || config.get("PORT") || 5500;

app.use(express.json({ extended: true }));
// Routes
app.use("/api/auth", authRouter);
app.use("/api/links", linkRouter);
app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
