const prisma = require('../config/db');

exports.createTransaction = async (req, res) => {
  try {
    const { amount, description, categoryId, date } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        categoryId,
        date: new Date(date),
        userId: req.user.id
      }
    });

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id
      }
    });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json(transaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: req.body
    });

    res.json(updatedTransaction);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await prisma.transaction.delete({
      where: {
        id: parseInt(req.params.id)
      }
    });

    res.json({
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};