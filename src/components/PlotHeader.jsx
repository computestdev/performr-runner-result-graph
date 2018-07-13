import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import TransactionPlot from './TransactionPlot';
import style from './style/PlotHeader.scss';

export default class PlotHeader extends PureComponent {
    constructor(props) {
        super(props);

        this._scrollerNode = null;
        this._setScrollerNode = x => { this._scrollerNode = x; };
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        if (style.ref) {
            style.ref();
        }
    }

    componentWillUnmount() {
        if (style.unref) {
            style.unref();
        }
    }

    get scrollX() {
        return this._scrollerNode.scrollLeft;
    }

    set scrollX(value) {
        this._scrollerNode.scrollLeft = value;
    }

    render() {
        const {config, pixelsPerMillisecond} = this.props;
        const {resultObject} = config;

        return (
            <div className="PlotHeader">
                <div className="scroller" ref={this._setScrollerNode}>
                    <div
                        className="scrollArea"
                        style={{
                            width: getScriptPlotWidth(resultObject, pixelsPerMillisecond) + 'px',
                        }}
                    >
                        <TransactionPlot config={config} pixelsPerMillisecond={pixelsPerMillisecond}/>
                        <div className="gridLabels">
                            {this.renderGridLabels()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderGridLabels() {
        const {config, pixelsPerMillisecond} = this.props;
        const {resultObject} = config;
        const pixelsPerSecond = pixelsPerMillisecond * 1000;
        const duration = resultObject.getIn(['timing', 'duration']);
        const seconds = Math.floor(duration / 1000);
        const result = [];

        for (let i = 1; i <= seconds; ++i) {
            result.push(<span key={i} style={{left: i * pixelsPerSecond + 'px'}}>
                {i + 's'}
            </span>);
        }

        return result;
    }
}

PlotHeader.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
};
