const selectedEvent = (state = '', action) => {
    if (action.type === 'SELECT_EVENT') {
        return action.id;
    }

    return state;
};

export default selectedEvent;
