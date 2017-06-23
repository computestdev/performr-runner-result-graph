const selectScreenshot = (instanceKey, eventId) => ({
    id: eventId,
    instanceKey,
    type: 'PerformrRunnerResultGraph/SELECT_SCREENSHOT',
});

export default selectScreenshot;
