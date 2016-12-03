const selectEvent = (instanceKey, eventId) => ({
    id: eventId,
    instanceKey,
    type: 'PerformrRunnerResultGraph/SELECT_EVENT',
});

export default selectEvent;
