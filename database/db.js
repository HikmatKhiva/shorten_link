import pkg from "pg";
import config from "config";

const { Pool } = pkg;
export const pool = new Pool({
  user: config.get("DB_USER"),
  host: config.get("DB_HOST"),
  password: config.get("DB_PASSWORD"),
  port: config.get("DB_PORT"),
  database: config.get("DATABASE"),
});
