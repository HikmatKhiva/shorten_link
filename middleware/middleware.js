import jwt from "jsonwebtoken";
import config from "config";

export async function middleware(req, res, next) {
  if (res.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // token
    if (!token) {
      return res.status(401).json({ message: "User not found" });
    }
    const decode = jwt.decode(token, config.get("jwtSecret"));
    if (!decode) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User not found" });
  }
}
