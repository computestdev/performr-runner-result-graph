import {Map} from 'immutable';

const expandedEvents = (state = new Map(), action) => {
    if (action.type === 'EXPAND_EVENT') {
        return state.set(action.id, action.expanded);
    }

    return state;
};

export default expandedEvents;
