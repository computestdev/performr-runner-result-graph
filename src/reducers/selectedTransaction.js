const selectedTransaction = (state = '', action) => {
    if (action.type === 'SELECT_TRANSACTION') {
        return action.id;
    }

    return state;
};

export default selectedTransaction;
