const triggerError = (req, res, next) => {
  try {
    throw new Error("Intentional 500 error")
  } catch (err) {
    err.status = 500
    next(err)
  }
}

module.exports = { triggerError }
