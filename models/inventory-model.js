const pool = require("../database")

/* Vehicles by classification */
async function getInventoryByClassificationId(classificationId) {
  const sql = `
    SELECT i.*, c.classification_name
    FROM inventory i
    JOIN classification c
      ON i.classification_id = c.classification_id
    WHERE i.classification_id = $1
  `
  const data = await pool.query(sql, [classificationId])
  return data.rows
}

/* Single vehicle */
async function getInventoryById(invId) {
  const sql = `
    SELECT *
    FROM inventory
    WHERE inv_id = $1
  `
  const data = await pool.query(sql, [invId])
  return data.rows[0]
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById
}
