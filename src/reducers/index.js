import {combineReducers} from 'redux';

import expandedEvents from './expandedEvents';
import selectedEvent from './selectedEvent';
import selectedTransaction from './selectedTransaction';

const rootReducer = combineReducers({
    expandedEvents,
    selectedEvent,
    selectedTransaction,
});

export default rootReducer;
