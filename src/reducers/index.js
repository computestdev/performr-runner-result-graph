import {Map as ImmutableMap} from 'immutable';

import expandedEvents from './expandedEvents';
import selectedEvent from './selectedEvent';
import selectedTransaction from './selectedTransaction';

const myReducers = (state = new ImmutableMap(), action) => {
    return state
    .set('expandedEvents', expandedEvents(state.get('expandedEvents'), action))
    .set('selectedEvent', selectedEvent(state.get('selectedEvent'), action))
    .set('selectedTransaction', selectedTransaction(state.get('selectedTransaction'), action))
    ;
};

const instanceReducer = (instanceKey, state = new ImmutableMap(), action) => {
    if (instanceKey !== action.instanceKey && action.type !== '@@INIT') {
        return state;
    }

    return state.set(instanceKey, myReducers(state.get(instanceKey), action));
};

const rootReducer = (instanceKey, state = {}, action) => {
    if (ImmutableMap.isMap(state)) {
        return state.set('PerformrRunnerResultGraph', instanceReducer(instanceKey, state.get('PerformrRunnerResultGraph'), action));
    }

    // assume it is a pojo
    return Object.assign({}, state, {
        PerformrRunnerResultGraph: instanceReducer(instanceKey, state.PerformrRunnerResultGraph, action),
    });
};

const createRootReducer = instanceKey => {
    return rootReducer.bind(null, instanceKey);
};

export default createRootReducer;
