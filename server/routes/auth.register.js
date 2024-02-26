import { Router } from "express";
import { pool } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { middleware } from "../middleware/middleware.js";
export const authRouter = Router();
// new User Register
authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (user.rowCount !== 0) {
      return res
        .status(400)
        .json({ message: "Email already there, No need to register again." });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await pool.query(
      `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *
    `,
      [name, email, hashPassword]
    );
    const token = jwt.sign(newUser.rows[0], config.get("jwtSecret"));
    return res.status(201).json({
      token,
      userId: newUser.rows[0].id,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// User Login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      ` 
      SELECT * FROM users WHERE email = $1
      `,
      [email]
    );
    if (user.rowCount === 0) {
      return res
        .status(400)
        .json({ message: "User is not registered, Sign Up first" });
    }
    const isPassword = await bcrypt.compareSync(
      password,
      user.rows[0].password
    );
    if (!isPassword) {
      return res.status(400).json({ message: "password invalid" });
    }
    const token = jwt.sign(user.rows[0], config.get("jwtSecret"));
    return res.status(200).json({
      token,
      userId: user.rows[0].id,
      name: user.rows[0].name,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// update user
authRouter.post("/update/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateUser = await pool.query(
      `
      UPDATE users SET  name = $1 WHERE id = $2 RETURNING *
    `,
      [id, name]
    );
    res.status(200).json({ message: "" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
