const fs = require('fs')

const exportCSV = (
  transactions,
  filePath
) => {

  let csv =
    'Amount,Description,Date\n'

  transactions.forEach((t) => {

    csv +=
      `${t.amount},${t.description},${t.date}\n`

  })

  fs.writeFileSync(filePath, csv)

}

module.exports = exportCSV