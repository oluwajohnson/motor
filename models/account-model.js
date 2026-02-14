const pool = require("../database")

//Get account by id
async function getAccountById(account_id) {
  const sql = "SELECT * FROM account WHERE account_id = $1"
  const data = await pool.query(sql, [account_id])
  return data.rows[0]
}


//update account information
async function updateAccount(id, firstname, lastname, email) {
  const sql = `
    UPDATE account
    SET account_firstname = $1,
        account_lastname = $2,
        account_email = $3
    WHERE account_id = $4
    RETURNING *`
  return await pool.query(sql, [firstname, lastname, email, id])
}


//update account password
async function updatePassword(id, password) {
  const sql = `
    UPDATE account
    SET account_password = $1
    WHERE account_id = $2`
  return await pool.query(sql, [password, id])
}
