const prisma = require('../config/db')

const getUserByEmail = async (email) => {

  return await prisma.user.findUnique({
    where: {
      email
    }
  })

}

module.exports = {
  getUserByEmail
}