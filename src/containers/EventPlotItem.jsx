import {connect} from 'react-redux';

import EventPlotItem from '../components/EventPlotItem';

const mapStateToProps = (state, {config, event}) => ({
    expanded: config.getMyState(state, ['expandedEvents', event.get('id')]) === true,
    selected: config.getMyState(state, ['selectedEvent']) === event.get('id'),
});

const EventPlotItemContainer = connect(mapStateToProps)(EventPlotItem);
export default EventPlotItemContainer;
