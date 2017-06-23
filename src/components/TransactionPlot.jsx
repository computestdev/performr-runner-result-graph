import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';

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
        if (!Immutable.is(this.props.config, nextProps.config)) {
            this.calculatePositions();
        }
    }

    calculatePositions() {
        this._transactionPositions = balanceEntitiesOverPlotLines(this.props.config.resultObject.get('transactions'));
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
                config={this.props.config}
                key={transaction.get('id')}
                pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                store={this.props.config.store}
                transaction={transaction}
            />
        );
    }
}

TransactionPlot.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
};
