module.exports = function messages() {
  let message = ""
  const errors = this.messages.error
  const success = this.messages.success

  if (errors) {
    message += `<div class="flash-error">${errors.join("<br>")}</div>`
  }

  if (success) {
    message += `<div class="flash-success">${success.join("<br>")}</div>`
  }

  return message
}
