import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import EventPlot from './EventPlot';
import style from './style/EventPlotColumn.scss';

export default class EventPlotColumn extends PureComponent {
    constructor(props) {
        super(props);

        this._scrollerNode = null;
        this._setScrollerNode = x => { this._scrollerNode = x; };
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

    get scrollX() {
        return this._scrollerNode.scrollLeft;
    }

    set scrollX(value) {
        this._scrollerNode.scrollLeft = value;
    }

    render() {
        const {config, pixelsPerMillisecond} = this.props;
        const {resultObject} = config;
        const pixelsPerSecond = pixelsPerMillisecond * 1000;
        const pixelsPerDecisecond = pixelsPerMillisecond * 100;

        const majorGrid = [
            '90deg',
            'transparent 0',
            `transparent ${pixelsPerSecond - 2}px`,
            `#777777 ${pixelsPerSecond - 2}px`,
            `#777777 ${pixelsPerSecond}px`,
        ];

        const minorGrid = [
            '90deg',
            'transparent 0',
            `transparent ${pixelsPerDecisecond - 1}px`,
            `#999999 ${pixelsPerDecisecond - 1}px`,
            `#999999 ${pixelsPerDecisecond}px`,
        ];

        return (
            <div className="EventPlotColumn">
                <div className="scroller" ref={this._setScrollerNode}>
                    <div
                        className="scrollArea"
                        style={{
                            background: 'repeating-linear-gradient(' + majorGrid.join(',') + '),' +
                                        'repeating-linear-gradient(' + minorGrid.join(',') + ')',
                            width: getScriptPlotWidth(resultObject, pixelsPerMillisecond) + 'px',
                        }}
                    >
                        {this.renderSelectedTransactionIndicator()}
                        <EventPlot
                            config={config}
                            events={resultObject.get('events')}
                            pixelsPerMillisecond={pixelsPerMillisecond}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderSelectedTransactionIndicator() {
        const {config, pixelsPerMillisecond, selectedTransaction} = this.props;
        const {resultObject} = config;

        if (!selectedTransaction) {
            return null;
        }

        const relativeBegin = selectedTransaction.getIn(['timing', 'begin', 'counter'])
            - resultObject.getIn(['timing', 'begin', 'counter']);
        const relativeEnd = selectedTransaction.getIn(['timing', 'end', 'counter'])
            - resultObject.getIn(['timing', 'begin', 'counter']);

        const beginPx = relativeBegin * pixelsPerMillisecond;
        const endPx = relativeEnd * pixelsPerMillisecond;

        return (
            <div className="selectedTransactionIndicator">
                <div
                    className="left"
                    style={{
                        width: beginPx + 'px',
                    }}
                />
                <div
                    className="right"
                    style={{
                        left: endPx + 'px',
                    }}
                />
            </div>
        );
    }
}

EventPlotColumn.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    selectedTransaction: ImmutablePropTypes.map,
};
