import { Router } from "express";
import { pool } from "../database/db.js";
export const redirectRoute = Router();
redirectRoute.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await pool.query(
      `
        SELECT * FROM links WHERE link_code = $1
    `,
      [code]
    );
    if (link.rowCount === 0) {
      res.status(404).json("cannot find Link");
    }
    await pool.query(
      `
      UPDATE links SET clicks =$1 WHERE id = $2 RETURNING *
    `,
      [+link.rows[0].clicks + 1, link.rows[0].id]
    );
    res.redirect(link.rows[0].link_from);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
