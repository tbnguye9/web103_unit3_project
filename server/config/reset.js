import { pool } from "./database.js";

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;

      CREATE TABLE locations (
        id       SERIAL PRIMARY KEY,
        name     VARCHAR(255) NOT NULL,
        address  VARCHAR(255),
        city     VARCHAR(255),
        state    VARCHAR(255),
        zip      VARCHAR(20),
        image    TEXT
      );

      CREATE TABLE events (
        id          SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(id),
        title       VARCHAR(255) NOT NULL,
        date        VARCHAR(100),
        time        VARCHAR(100),
        image       TEXT
      );

      INSERT INTO locations (name, address, city, state, zip, image) VALUES
        ('Echo Lounge', '551 Flat Shoals Ave SE', 'Atlanta', 'GA', '30316', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'),
        ('House of Blues', '2200 N Lamar St', 'Dallas', 'TX', '75202', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'),
        ('Pavilion', '800 W Katella Ave', 'Anaheim', 'CA', '92802', 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800'),
        ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', '75219', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800');

      INSERT INTO events (location_id, title, date, time, image) VALUES
        (1, 'Indie Night', 'Mar 20, 2025', '8:00 PM', 'https://i.scdn.co/image/ab6761610000e5ebe63ceef20dce0ac6522c4011'),
        (1, 'Jazz Fusion', 'Apr 5, 2025', '7:30 PM', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800'),
        (2, 'Rock Festival', 'Mar 23, 2025', '7:00 PM', 'https://images.unsplash.com/photo-1468359601543-843bfaef291a?w=800'),
        (2, 'Blues Night', 'Apr 10, 2025', '9:00 PM', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800'),
        (3, 'EDM Rave', 'May 1, 2025', '10:00 PM', 'https://bandwagmag.com/wp-content/uploads/2016/12/10-og.jpg'),
        (4, 'NBA Game', 'Mar 30, 2025', '7:30 PM', 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800'),
        (4, 'Concert Night', 'Apr 15, 2025', '8:00 PM', 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800');
    `);

    console.log("✅ Tables created and seeded!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    client.release();
    process.exit();
  }
};

createTables();
