const prisma = require('../config/db')

const getAllTransactions = async (
  userId
) => {

  return await prisma.transaction.findMany({
    where: {
      userId
    }
  })

}

module.exports = {
  getAllTransactions
}