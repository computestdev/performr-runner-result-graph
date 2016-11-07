import React, {PureComponent} from 'react';
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
        return (
            <div className="PlotHeader">
                <div className="scroller" ref={this._setScrollerNode}>
                    <div
                        className="scrollArea"
                        style={{
                            width: getScriptPlotWidth(this.props.resultObject, this.props.pixelsPerMillisecond) + 'px',
                        }}
                    >
                        <TransactionPlot pixelsPerMillisecond={this.props.pixelsPerMillisecond} resultObject={this.props.resultObject}/>
                        <div className="gridLabels">
                            {this.renderGridLabels()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderGridLabels() {
        const pixelsPerSecond = this.props.pixelsPerMillisecond * 1000;
        const duration = this.props.resultObject.getIn(['timing', 'duration']);
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
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
};
