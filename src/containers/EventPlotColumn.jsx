import React, {PureComponent} from 'react';
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
}

EventPlotColumnWrapper.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    selectedTransaction: React.PropTypes.string,
};

const mapStateToProps = (state, {config}) => ({
    selectedTransaction: config.getMyState(state, ['selectedTransaction'], ''),
});

const EventPlotColumnContainer = connect(mapStateToProps, null, null, {withRef: true})(EventPlotColumnWrapper);

Object.defineProperty(EventPlotColumnContainer.prototype, 'scrollX', {
    get() {
        return this.getWrappedInstance()._wrapped.scrollX;
    },
    set(value) {
        this.getWrappedInstance()._wrapped.scrollX = value;
    },
});

export default EventPlotColumnContainer;
