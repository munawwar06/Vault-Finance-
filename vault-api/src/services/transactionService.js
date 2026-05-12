const prisma = require('../config/db');

const createTransaction =
  async (
    data
  ) => {

    return await prisma.transaction.create({
      data
    });

};

const getTransactions =
  async (
    userId
  ) => {

    return await prisma.transaction.findMany({
      where: {
        userId
      }
    });

};

module.exports = {
  createTransaction,
  getTransactions
};