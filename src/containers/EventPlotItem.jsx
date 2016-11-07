import {connect} from 'react-redux';

import EventPlotItem from '../components/EventPlotItem';

const mapStateToProps = (state, ownProps) => ({
    expanded: state.expandedEvents.get(ownProps.event.get('id')) === true,
    selected: state.selectedEvent === ownProps.event.get('id'),
});

const EventPlotItemContainer = connect(mapStateToProps)(EventPlotItem);
export default EventPlotItemContainer;
