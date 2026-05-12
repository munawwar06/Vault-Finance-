const prisma = require('../config/db')

exports.getSummary = async (req, res) => {

  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId: req.user.id
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

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  })
}