const selectedScreenshot = (state = '', action) => {
    if (action.type === 'PerformrRunnerResultGraph/SELECT_SCREENSHOT') {
        return action.id;
    }

    return state;
};

export default selectedScreenshot;
