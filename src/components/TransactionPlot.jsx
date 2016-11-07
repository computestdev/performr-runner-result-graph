import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import TransactionPlotItemContainer from '../containers/TransactionPlotItem';
import balanceEntitiesOverPlotLines from '../balanceEntitiesOverPlotLines';
import style from './style/TransactionPlot.scss';

export default class TransactionPlot extends PureComponent {
    constructor(props) {
        super(props);
        this._transactionPositions = null;
        this.calculatePositions();
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

    componentWillReceiveProps(nextProps) {
        if (this.props.resultObject !== nextProps.resultObject) {
            this.calculatePositions();
        }
    }

    calculatePositions() {
        this._transactionPositions = balanceEntitiesOverPlotLines(this.props.resultObject.get('transactions'));
    }

    render() {
        return (
            <div className="TransactionPlot">
                {this.renderLines()}
            </div>
        );
    }

    renderLines() {
        return this._transactionPositions.map((line, i) =>
            <div className="line" key={i}>{this.renderLine(line)}</div>
        );
    }

    renderLine(line) {
        return line.map(transaction =>
            <TransactionPlotItemContainer
                key={transaction.get('id')}
                pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                resultObject={this.props.resultObject}
                transaction={transaction}
            />
        );
    }
}

TransactionPlot.propTypes = {
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
};
