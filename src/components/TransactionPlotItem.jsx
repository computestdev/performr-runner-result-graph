import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class TransactionPlotItem extends PureComponent {
    constructor(props) {
        super(props);
        this.handlePlotClick = this.handlePlotClick.bind(this);
    }

    get transactionId() {
        return this.props.transaction.get('id');
    }

    get transactionTitle() {
        return this.props.transaction.get('title');
    }

    get transactionDuration() {
        return this.props.transaction.getIn(['timing', 'duration']);
    }

    handlePlotClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onTransactionSelected) {
            this.props.onTransactionSelected(this.transactionId);
        }
    }

    render() {
        const className = ['TransactionPlotItem'];

        if (this.props.selected) {
            className.push('selected');
        }

        return (
            <div className={className.join(' ')}>
                {this.renderPlot()}
            </div>
        );
    }

    renderPlot() {
        const {config, pixelsPerMillisecond} = this.props;
        const {resultObject} = config;

        const relativeBegin = this.props.transaction.getIn(['timing', 'begin', 'time']) -
            resultObject.getIn(['timing', 'begin', 'time']);

        const left = relativeBegin * pixelsPerMillisecond;
        let width = this.transactionDuration * pixelsPerMillisecond;

        if (width < 1) {
            width = 1;
        }

        const time = Math.round(this.transactionDuration) + ' ms';

        return (
            <div className="plotWrap" title={time + ': ' + this.transactionId + ': ' + this.transactionTitle}>
                <button
                    className="plot"
                    onClick={this.handlePlotClick}
                    style={{
                        left: left + 'px',
                        width: width + 'px',
                    }}
                >
                    <span className="title">{this.transactionTitle || this.transactionId}</span>
                    <span className="time">{time}</span>
                </button>
            </div>
        );
    }
}

TransactionPlotItem.defaultProps = {
    selected: false,
};

TransactionPlotItem.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    onTransactionSelected: PropTypes.func,
    pixelsPerMillisecond: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    transaction: ImmutablePropTypes.map.isRequired,
};
