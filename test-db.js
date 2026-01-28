// const pool = require("./database")

// async function testConnection() {
//   try {
//     const result = await pool.query("SELECT NOW()")
//     console.log("Connected:", result.rows[0])
//   } catch (err) {
//     console.error("DB connection failed:", err)
//   } finally {
//     pool.end()
//   }
// }

// testConnection()


const pool = require("./database");

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB connected:", result.rows[0]);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
}

testConnection();
