const prisma = require('../config/db')

exports.createTransaction = async (req, res) => {

  const {
    amount,
    description,
    date,
    categoryId
  } = req.body

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      description,
      date: new Date(date),
      userId: req.user.id,
      categoryId
    }
  })

  res.status(201).json(transaction)
}

exports.getTransactions = async (req, res) => {

  const transactions =
    await prisma.transaction.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        category: true
      }
    })

  res.json(transactions)
}

exports.getTransactionById = async (req, res) => {

  const transaction =
    await prisma.transaction.findUnique({
      where: {
        id: Number(req.params.id)
      }
    })

  res.json(transaction)
}

exports.updateTransaction = async (req, res) => {

  const updated =
    await prisma.transaction.update({
      where: {
        id: Number(req.params.id)
      },
      data: req.body
    })

  res.json(updated)
}

exports.deleteTransaction = async (req, res) => {

  await prisma.transaction.delete({
    where: {
      id: Number(req.params.id)
    }
  })

  res.json({
    message: 'Transaction deleted'
  })
}