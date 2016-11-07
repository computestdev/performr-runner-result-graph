import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import selectEvent from '../actions/selectEvent';
import EventDetails from '../components/EventDetails';

class SelectedEventDetailsWrapper extends PureComponent {
    render() {
        const {selectedEvent, resultObject} = this.props;

        if (selectedEvent) {
            const event = resultObject.getIn(['eventMap', selectedEvent]);

            return (
                <EventDetails event={event} onClose={this.props.onClose} resultObject={resultObject}/>
            );
        }

        return null;
    }
}

SelectedEventDetailsWrapper.propTypes = {
    onClose: React.PropTypes.func,
    resultObject: ImmutablePropTypes.map.isRequired,
    selectedEvent: React.PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    selectedEvent: state.selectedEvent,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClose: () => dispatch(selectEvent('')),
});

const SelectedEventDetails = connect(mapStateToProps, mapDispatchToProps)(SelectedEventDetailsWrapper);
export default SelectedEventDetails;
