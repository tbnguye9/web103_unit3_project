import { pool } from "../config/database.js";

export const getEvents = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM events ORDER BY id");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getEventsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY id",
      [locationId],
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM events WHERE id = $1", [
      id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
