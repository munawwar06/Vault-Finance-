const calculateSummary = (
  transactions
) => {

  let income = 0;
  let expenses = 0;

  transactions.forEach((transaction) => {

    if (
      transaction.category.type === 'income'
    ) {

      income += transaction.amount;

    } else {

      expenses += transaction.amount;

    }

  });

  return {
    income,
    expenses,
    balance: income - expenses
  };

};

module.exports = {
  calculateSummary
};