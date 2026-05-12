const prisma = require('../config/db')

const calculateSummary = async (
  userId
) => {

  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId
      },
      include: {
        category: true
      }
    })

  let income = 0
  let expense = 0

  transactions.forEach((t) => {

    if (t.category.type === 'income') {
      income += t.amount
    } else {
      expense += t.amount
    }

  })

  return {
    income,
    expense,
    balance: income - expense
  }

}

module.exports = {
  calculateSummary
}