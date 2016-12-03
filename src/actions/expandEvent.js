const expandEvent = (instanceKey, eventId, expanded) => ({
    expanded: Boolean(expanded),
    id: eventId,
    instanceKey,
    type: 'PerformrRunnerResultGraph/EXPAND_EVENT',
});

export default expandEvent;
