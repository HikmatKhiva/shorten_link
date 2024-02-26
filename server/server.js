import express from "express";
import config from "config";
import cors from "cors";
import dotenv from "dotenv";
// import path from "path";
import { authRouter } from "./routes/auth.register.js";
import { linkRouter } from "./routes/link.route.js";
import { redirectRoute } from "./routes/redirect.js";
const app = express();
dotenv.config();
const PORT = process.env?.PORT || config.get("PORT") || 5500;
app.use(express.json({ extended: true }));
app.use(cors());
// const __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static(path.join(__dirname, "client", "dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   });
// }
// Routes
app.use("/api/auth", authRouter);
app.use("/api/links", linkRouter);
app.use("/t", redirectRoute);
app.listen(PORT, () => {
  console.log(`server running ${process.env.BASE_URL}:${PORT}`);
});
