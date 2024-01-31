import moment, { Moment } from 'moment';

export const getTransactionGraphData = (
  data: any[],
  startDate: Moment,
  endDate: Moment
) => {
  const sortedTransactions = [...data]?.sort((a, b) => {
    const dateA = moment(a.timestamp);
    const dateB = moment(b.timestamp);
    return dateA.diff(dateB);
  });

  const result = [];

  let lastAvailableAmount = 0; // Default amount before the initial date

  for (
    let currentDate = startDate.clone();
    currentDate.isSameOrBefore(endDate, 'day');
    currentDate.add(1, 'day')
  ) {
    const transactionsForCurrentDate = sortedTransactions?.filter(
      (transaction: any) =>
        moment(transaction.timestamp).isSame(currentDate, 'day')
    );
    if (transactionsForCurrentDate?.length > 0) {
      transactionsForCurrentDate?.forEach((transaction: any) => {
        result.push({
          timestamp: transaction.timestamp,
          amount: +transaction.balanceAfter.amount
        });
        lastAvailableAmount = +transaction.balanceAfter.amount; // Update last available amount
      });
    } else {
      // If there are no transactions for the current date, use the amount from the last available transaction
      result.push({
        timestamp: currentDate.toISOString(),
        amount: lastAvailableAmount
      });
    }
  }

  return result;
};
