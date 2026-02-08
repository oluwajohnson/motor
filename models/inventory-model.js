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


async function addClassification(classification_name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    return await pool.query(sql, [classification_name])
  } catch (error) {
    return null
  }
}

async function getClassifications() {
  try {
    const data = await pool.query(
       "SELECT classification_id, classification_name FROM classification ORDER BY classification_name"
    )
    return data
  } catch (error) {
    throw error
  }
}

module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
  addClassification,
  getClassifications,
}
