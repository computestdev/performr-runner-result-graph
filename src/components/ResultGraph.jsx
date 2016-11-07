import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import GraphHeader from './GraphHeader';
import EventTreeColumn from './EventTreeColumn';
import EventPlotColumnContainer from '../containers/EventPlotColumn';
import SelectedEventDetails from '../containers/SelectedEventDetails';
import NativeScrollXInput from './NativeScrollXInput';

import style from './style/ResultGraph.scss';

export default class ResultGraph extends PureComponent {
    constructor(props) {
        super(props);
        this._wrapperNode = null;
        this._setWrapperNode = x => { this._wrapperNode = x; };
        this._graphHeader = null;
        this._setGraphHeader = x => { this._graphHeader = x; };
        this._plotScrollXInput = null;
        this._setEventPlotScrollXInput = x => { this._plotScrollXInput = x; };
        this._plotColumn = null;
        this._setEventPlotColumn = x => { this._plotColumn = x; };

        this._lastSeenPlotScrollX = 0;
        this._lastSeenPlotColumnScrollX = 0;
        this._animationFrameId = null;
        this._window = null;
    }

    componentWillMount() {
        if (style.ref) {
            style.ref();
        }
    }

    componentDidMount() {
        this._window = this._wrapperNode.ownerDocument.defaultView;
        const {requestAnimationFrame} = this._window;

        const frame = () => {
            try {
                this.animationFrame();
            }
            finally {
                this._animationFrameId = requestAnimationFrame(frame);
            }
        };

        this._animationFrameId = requestAnimationFrame(frame);
    }

    componentWillUnmount() {
        const {cancelAnimationFrame} = this._window;

        cancelAnimationFrame(this._animationFrameId);
        this._animationFrameId = null;

        this._window = null;

        if (style.unref) {
            style.unref();
        }
    }

    animationFrame() {
        const scrollBarX = this._plotScrollXInput.scrollX;
        const plotColumnScrollX = this._plotColumn.scrollX;

        if (scrollBarX !== this._lastSeenPlotScrollX) {
            this._plotColumn.scrollX = scrollBarX;
            this._graphHeader.scrollX = scrollBarX;
        }
        else if (plotColumnScrollX !== this._lastSeenPlotColumnScrollX) {
            this._plotScrollXInput.scrollX = plotColumnScrollX;
            this._graphHeader.scrollX = plotColumnScrollX;
        }
        else {
            return;
        }

        this._lastSeenPlotScrollX = this._plotScrollXInput.scrollX;
        this._lastSeenPlotColumnScrollX = this._plotColumn.scrollX;
    }

    render() {
        return (
            <div className="ResultGraph" ref={this._setWrapperNode}>
                <GraphHeader
                    pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                    ref={this._setGraphHeader}
                    resultObject={this.props.resultObject}
                />
                <div className="eventPlot">
                    <div className="scroller">
                        <div className="scrollArea">
                            <EventTreeColumn resultObject={this.props.resultObject}/>
                            <EventPlotColumnContainer
                                pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                                ref={this._setEventPlotColumn}
                                resultObject={this.props.resultObject}
                            />
                        </div>
                    </div>
                    <NativeScrollXInput
                        pixelRange={getScriptPlotWidth(this.props.resultObject, this.props.pixelsPerMillisecond)}
                        ref={this._setEventPlotScrollXInput}
                    />
                </div>
                <SelectedEventDetails resultObject={this.props.resultObject}/>
            </div>
        );
    }
}

ResultGraph.propTypes = {
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
};
