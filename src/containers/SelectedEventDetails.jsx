import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import selectEvent from '../actions/selectEvent';
import selectScreenshot from '../actions/selectScreenshot';
import EventDetails from '../components/EventDetails';

class SelectedEventDetailsWrapper extends PureComponent {
    render() {
        const {config, selectedEvent, onClose, onSelectScreenshot} = this.props;

        if (selectedEvent) {
            const event = config.resultObject.getIn(['eventMap', selectedEvent]);

            return (
                <EventDetails config={config} event={event} onClose={onClose} onSelectScreenshot={onSelectScreenshot}/>
            );
        }

        return null;
    }
}

SelectedEventDetailsWrapper.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    onClose: PropTypes.func,
    onSelectScreenshot: PropTypes.func,
    selectedEvent: PropTypes.string.isRequired,
};

const mapStateToProps = (state, {config}) => ({
    selectedEvent: config.getMyState(state, ['selectedEvent'], ''),
});

const mapDispatchToProps = (dispatch, {config}) => ({
    onClose: () => dispatch(selectEvent(config.instanceKey, '')),
    onSelectScreenshot: eventId => dispatch(selectScreenshot(config.instanceKey, eventId)),
});

const SelectedEventDetails = connect(mapStateToProps, mapDispatchToProps)(SelectedEventDetailsWrapper);
export default SelectedEventDetails;
