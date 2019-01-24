import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux';

import EventPlotColumn from '../components/EventPlotColumn';

class EventPlotColumnWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this._wrapped = null;
        this._setWrapped = x => { this._wrapped = x; };
    }

    render() {
        const {config, selectedTransaction, pixelsPerMillisecond} = this.props;
        const transactionObject = selectedTransaction
            ? config.resultObject.getIn(['transactionMap', selectedTransaction])
            : null;

        return (
            <EventPlotColumn
                config={config}
                pixelsPerMillisecond={pixelsPerMillisecond}
                ref={this._setWrapped}
                selectedTransaction={transactionObject}
            />
        );
    }

    get scrollX() {
        return this._wrapped.scrollX;
    }

    set scrollX(value) {
        this._wrapped.scrollX = value;
    }
}

EventPlotColumnWrapper.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
    selectedTransaction: PropTypes.string,
};

const mapStateToProps = (state, {config}) => ({
    selectedTransaction: config.getMyState(state, ['selectedTransaction'], ''),
});

const EventPlotColumnContainer = connect(mapStateToProps, null, null, {forwardRef: true})(EventPlotColumnWrapper);

export default EventPlotColumnContainer;
