import { Router } from "express";
import { pool } from "../database/db.js";
import { middleware } from "../middleware/middleware.js";
import shortid from "shortid";
import config from "config";
import dotenv from "dotenv";
export const linkRouter = Router();
dotenv.config();
linkRouter.get("/", middleware, async (req, res) => {
  try {
    const user = req.user;
    const links = await pool.query(`SELECT * FROM links WHERE owner = $1`, [
      user.id,
    ]);
    res.status(200).json({ links: links.rows });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// get a link
linkRouter.get("/:id", middleware, async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const link = await pool.query(
      `SELECT * FROM links WHERE owners = $1 AND id = $2`,
      [user.id, id]
    );
    if (link.rows === 0) {
      return res.status(400).json({ message: "Link not found" });
    }
    res.status(200).json({ link: link.rows });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
// generate new Link
linkRouter.post("/generate", middleware, async (req, res) => {
  try {
    const user = req.user;
    const baseUrl = process.env.baseUrl || config.get("baseURL");
    const { url: from } = req.body;
    const link = await pool.query(
      `
      SELECT * FROM links WHERE link_from = $1
    `,
      [from]
    );
    if (link.rowCount !== 0) {
      return res.status(400).json({ message: "Link already exists" });
    }
    const code = shortid.generate();
    const to = baseUrl + "/t/" + code;
    const newLink = await pool.query(
      `INSERT INTO links(link_from,link_to,link_code,owner,date_time) VALUES($1,$2,$3,$4,$5) RETURNING *`,
      [from, to, code, user.id, new Date()]
    );
    res
      .status(201)
      .json({ message: "generate successfully", link: newLink.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// delete a link
linkRouter.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query(
      `DELETE FROM links WHERE id = $1 RETURNING *`,
      [id]
    );
    if (deleted.rowCount === 0)
      return res.status(400).json({ message: "link not found" });
    res.status(200).json({ message: "link deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
