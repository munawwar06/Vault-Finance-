const fs = require('fs');

const exportTransactionsToCSV =
  (transactions) => {

    let csvData =
      'Amount,Description,Date\n';

    transactions.forEach((transaction) => {

      csvData +=
        `${transaction.amount},${transaction.description},${transaction.date}\n`;

    });

    fs.writeFileSync(
      'transactions.csv',
      csvData
    );

};

module.exports =
  exportTransactionsToCSV;