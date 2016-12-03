const selectTransaction = (instanceKey, transactionId) => ({
    id: transactionId,
    instanceKey,
    type: 'PerformrRunnerResultGraph/SELECT_TRANSACTION',
});

export default selectTransaction;
