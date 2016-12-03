import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import selectEvent from '../actions/selectEvent';
import EventDetails from '../components/EventDetails';

class SelectedEventDetailsWrapper extends PureComponent {
    render() {
        const {config, selectedEvent} = this.props;

        if (selectedEvent) {
            const event = config.resultObject.getIn(['eventMap', selectedEvent]);

            return (
                <EventDetails config={config} event={event} onClose={this.props.onClose}/>
            );
        }

        return null;
    }
}

SelectedEventDetailsWrapper.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    onClose: React.PropTypes.func,
    selectedEvent: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, {config}) => ({
    selectedEvent: config.getMyState(state, ['selectedEvent'], ''),
});

const mapDispatchToProps = (dispatch, {config}) => ({
    onClose: () => dispatch(selectEvent(config.instanceKey, '')),
});

const SelectedEventDetails = connect(mapStateToProps, mapDispatchToProps)(SelectedEventDetailsWrapper);
export default SelectedEventDetails;
