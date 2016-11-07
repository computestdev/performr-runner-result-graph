const selectTransaction = (transactionId) => ({
    id: transactionId,
    type: 'SELECT_TRANSACTION',
});

export default selectTransaction;
