import express from "express";
import config from "config";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.register.js";
import { linkRouter } from "./routes/link.route.js";
import { redirectRoute } from "./routes/redirect.js";
const app = express();
dotenv.config();
const PORT = process.env?.PORT || config.get("PORT") || 5500;
app.use(express.json({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Routes
app.use("/api/auth", authRouter);
app.use("/api/links", linkRouter);
app.use("/t", redirectRoute);
app.listen(PORT, () => {
  console.log(`server running http://localhost:${PORT}`);
});
