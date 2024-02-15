import { Router } from "express";
import { pool } from "../database/db.js";
import bcrypt from "bcrypt";
export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);
    console.log(hashPassword);
    const newUser = await pool.query(
      `
      INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING
    `,
      [name, email, hashPassword]
    );
    console.log(newUser);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

authRouter.get("/all", async (req, res) => {
  try {
    const newUser = await pool.query(` 
     SELECT * FROM users 
    `);
    console.log(newUser.rows);
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
