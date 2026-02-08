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


// async function getInventoryByClassificationId(classification_id) {
//   const sql = `
//     SELECT i.*, c.classification_name
//     FROM inventory i
//     JOIN classification c
//       ON i.classification_id = c.classification_id
//     WHERE i.classification_id = $1
//   `
//   const data = await pool.query(sql, [classification_id])
//   return data.rows
// }




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


async function addInventory(
  classification_id,
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color
) {
  try {
    const sql = `
      INSERT INTO inventory (
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_description,
        inv_image,
        inv_thumbnail,
        inv_price,
        inv_miles,
        inv_color
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *`

    return await pool.query(sql, [
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color
    ])
  } catch (error) {
    console.error("addInventory error:", error)
    return null
  }
}





module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
  addClassification,
  getClassifications,
  addInventory,
}
