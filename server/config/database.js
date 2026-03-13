import PG from "pg";
import dotenv from "dotenv";

dotenv.config();

console.log("PGHOST =", process.env.PGHOST);
console.log("PGDATABASE =", process.env.PGDATABASE);
console.log("PGUSER =", process.env.PGUSER);
console.log("PGPORT =", process.env.PGPORT);

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
};

export const pool = new PG.Pool(config);
