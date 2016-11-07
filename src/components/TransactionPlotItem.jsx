import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './style/TransactionPlotItem.scss';

export default class TransactionPlotItem extends PureComponent {
    constructor(props) {
        super(props);
        this.handlePlotClick = this.handlePlotClick.bind(this);
        this.handlePlotKeyPress = this.handlePlotKeyPress.bind(this);
    }

    componentWillMount() {
        if (style.ref) {
            style.ref();
        }
    }

    componentWillUnmount() {
        if (style.unref) {
            style.unref();
        }
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

    handlePlotKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onTransactionSelected && e.key === 'Enter') {
            this.props.onTransactionSelected(this.transactionId);
        }
    }

    render() {
        return (
            <div className="TransactionPlotItem">
                {this.renderPlot()}
            </div>
        );
    }

    renderPlot() {
        const relativeBegin = this.props.transaction.getIn(['timing', 'begin', 'counter']) -
            this.props.resultObject.getIn(['timing', 'begin', 'counter']);

        const left = relativeBegin * this.props.pixelsPerMillisecond;
        let width = this.transactionDuration * this.props.pixelsPerMillisecond;

        if (width < 1) {
            width = 1;
        }

        const time = Math.round(this.transactionDuration) + ' ms';

        return (
            <div className="plotWrap" title={time + ': ' + this.transactionId + ': ' + this.transactionTitle}>
                <div
                    className="plot"
                    onClick={this.handlePlotClick}
                    onKeyPress={this.handlePlotKeyPress}
                    style={{
                        left: left + 'px',
                        width: width + 'px',
                    }}
                    tabIndex={this.props.onTransactionSelected ? '0' : null}
                >
                    <span className="title">{this.transactionTitle || this.transactionId}</span>
                    <span className="time">{time}</span>
                </div>
            </div>
        );
    }
}

TransactionPlotItem.propTypes = {
    onTransactionSelected: React.PropTypes.func,
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
    transaction: ImmutablePropTypes.map.isRequired,
};
