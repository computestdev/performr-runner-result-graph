import {connect} from 'react-redux';

import EventTreeItem from '../components/EventTreeItem';
import expandEvent from '../actions/expandEvent';
import selectEvent from '../actions/selectEvent';

const mapStateToProps = (state, ownProps) => ({
    expanded: state.expandedEvents.get(ownProps.event.get('id')) === true,
    selected: state.selectedEvent === ownProps.event.get('id'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onEventExpand: (eventId, expand) => dispatch(expandEvent(eventId, expand)),
    onEventSelected: eventId => dispatch(selectEvent(eventId)),
});

const EventTreeItemContainer = connect(mapStateToProps, mapDispatchToProps)(EventTreeItem);
export default EventTreeItemContainer;
