const validateEmail = (email) => {

  return email.includes('@')

}

const validatePassword = (
  password
) => {

  return password.length >= 6

}

module.exports = {
  validateEmail,
  validatePassword
}