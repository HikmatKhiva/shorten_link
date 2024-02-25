import pkg from "pg";
import config from "config";
import dotenv from "dotenv";
// env
dotenv.config();
const { Pool } = pkg;
let setting_DB;
if (process.env.NODE_ENV === "development") {
  setting_DB = {
    user: config.get("DB_USER"),
    host: config.get("DB_HOST"),
    password: config.get("DB_PASSWORD"),
    port: config.get("DB_PORT"),
    database: config.get("DATABASE"),
  };
}
if (process.env.NODE_ENV === "production") {
  setting_DB = {
    connectionString: process.env.POSTGRESQL_URL + "?sslmode=require",
  };
}
export const pool = new Pool(setting_DB);
