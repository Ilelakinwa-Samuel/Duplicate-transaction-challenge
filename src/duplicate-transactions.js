function findDuplicateTransactions(transactions) {
  const transactionGroups = {};

  for (const transaction of transactions) {
    const key = `${transaction.sourceAccount} - ${transaction.targetAccount} - ${transaction.category} - ${transaction.amount}`;
    if (!transactionGroups[key]) {
      transactionGroups[key] = [];
    }
    const duplicateTransactions = transactionGroups[key];
    for (const duplicateTransaction of duplicateTransactions) {
      const timeDifference = Math.abs(
        duplicateTransaction.time - transaction.time
      );

      if (timeDifference < 60000) {
        //1 minute =60,000 milliseconds
        duplicateTransactions.push(transaction);
        break;
      }
    }
    if (
      duplicateTransactions.length === 0 ||
      duplicateTransactions[duplicateTransactions.length - 1] !== transaction
    ) {
      duplicateTransactions.push(transaction);
    }
  }
  const duplicateTransactionGroups = object.values(transactionGroups);
  duplicateTransactionGroups.sort(
    (group1, group2) => group1[0].time - group2[0].time
  );

  return duplicateTransactionGroups;
}

export default findDuplicateTransactions;
