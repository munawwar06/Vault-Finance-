class Transaction {

  constructor(
    id,
    amount,
    description,
    date,
    userId,
    categoryId
  ) {

    this.id = id;
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.userId = userId;
    this.categoryId = categoryId;

  }

}

module.exports = Transaction;