import { Router } from "express";
import { pool } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
export const authRouter = Router();
// new User Register
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await pool.query(
      `
      INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
    `,
      [name, email, hashPassword]
    );
    if (newUser.rows !== 0) {
      return res
        .status(200)
        .json({ message: "Email already there, No need to register again." });
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// User Login
authRouter.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await pool.query(
      ` 
      SELECT * FROM users WHERE email = $1
      `,
      [email]
    );
    if (user.rows === 0) {
      return res
        .status(400)
        .json({ message: "User is not registered, Sign Up first" });
    }
    const isPassword = await bcrypt.compareSync(
      password,
      user.rows[0].password
    );
    if (!isPassword) {
      return res.status(400).json({ message: "Password invalid" });
    }
    const token = jwt.sign(user.rows[0], config.get("jwtSecret"));
    return res.status(200).json({ message: "User Login", token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
