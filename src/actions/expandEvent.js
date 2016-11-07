const expandEvent = (eventId, expanded) => ({
    expanded: Boolean(expanded),
    id: eventId,
    type: 'EXPAND_EVENT',
});

export default expandEvent;
