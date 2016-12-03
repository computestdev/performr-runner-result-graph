import {Map as ImmutableMap} from 'immutable';

const expandedEvents = (state = new ImmutableMap(), action) => {
    if (action.type === 'PerformrRunnerResultGraph/EXPAND_EVENT') {
        return state.set(action.id, action.expanded);
    }

    return state;
};

export default expandedEvents;
