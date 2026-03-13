import { pool } from "../config/database.js";

export const getLocations = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM locations ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM locations WHERE id = $1", [
      id,
    ]);

    if (!rows.length) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
