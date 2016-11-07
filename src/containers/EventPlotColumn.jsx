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
        const {selectedTransaction, pixelsPerMillisecond, resultObject} = this.props;
        const transactionObject = selectedTransaction
            ? resultObject.getIn(['transactionMap', selectedTransaction])
            : null;

        return (
            <EventPlotColumn
                pixelsPerMillisecond={pixelsPerMillisecond}
                ref={this._setWrapped}
                resultObject={resultObject}
                selectedTransaction={transactionObject}
            />
        );
    }
}

EventPlotColumnWrapper.propTypes = {
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
    selectedTransaction: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
    selectedTransaction: state.selectedTransaction,
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
