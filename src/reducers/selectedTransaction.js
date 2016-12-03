const selectedTransaction = (state = '', action) => {
    if (action.type === 'PerformrRunnerResultGraph/SELECT_TRANSACTION') {
        return action.id;
    }

    return state;
};

export default selectedTransaction;
