import {connect} from 'react-redux';

import EventTreeItem from '../components/EventTreeItem';
import expandEvent from '../actions/expandEvent';
import selectEvent from '../actions/selectEvent';

const mapStateToProps = (state, {config, event}) => ({
    expanded: config.getMyState(state, ['expandedEvents', event.get('id')]) === true,
    selected: config.getMyState(state, ['selectedEvent']) === event.get('id'),
});

const mapDispatchToProps = (dispatch, {config}) => ({
    onEventExpand: (eventId, expand) => dispatch(expandEvent(config.instanceKey, eventId, expand)),
    onEventSelected: eventId => dispatch(selectEvent(config.instanceKey, eventId)),
});

const EventTreeItemContainer = connect(mapStateToProps, mapDispatchToProps)(EventTreeItem);
export default EventTreeItemContainer;
