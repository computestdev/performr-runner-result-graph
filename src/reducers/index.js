import {Map as ImmutableMap} from 'immutable';

import expandedEvents from './expandedEvents';
import selectedEvent from './selectedEvent';
import selectedTransaction from './selectedTransaction';
import selectedScreenshot from './selectedScreenshot';

const myReducers = (state = new ImmutableMap(), action) => {
    return state
    .set('expandedEvents', expandedEvents(state.get('expandedEvents'), action))
    .set('selectedEvent', selectedEvent(state.get('selectedEvent'), action))
    .set('selectedTransaction', selectedTransaction(state.get('selectedTransaction'), action))
    .set('selectedScreenshot', selectedScreenshot(state.get('selectedScreenshot'), action))
    ;
};

export const createInstanceReducer = instanceKey => (state = new ImmutableMap(), action) => {
    if (instanceKey !== action.instanceKey && action.type !== '@@INIT') {
        return state;
    }

    return myReducers(state, action);
};

export const createRootReducer = instanceKeys => {
    const reducers = [...instanceKeys].map(key => [key, createInstanceReducer(key)]);

    return (oldState = new ImmutableMap(), action) => oldState.withMutations(state => {
        for (const [key, reducer] of reducers) {
            state.set(key, reducer(oldState.get(key), action));
        }
    });
};

export const stateKey = 'PerformrRunnerResultGraph';
