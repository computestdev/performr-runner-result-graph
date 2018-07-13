import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import GraphHeader from './GraphHeader';
import EventTreeColumn from './EventTreeColumn';
import EventPlotColumnContainer from '../containers/EventPlotColumn';
import SelectedEventDetailsContainer from '../containers/SelectedEventDetails';
import NativeScrollXInput from './NativeScrollXInput';
import ScreenshotPopupContainer from '../containers/ScreenshotPopup';

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
        const {config, pixelsPerMillisecond} = this.props;
        return (
            <div className="ResultGraph" ref={this._setWrapperNode}>
                <GraphHeader
                    config={config}
                    pixelsPerMillisecond={pixelsPerMillisecond}
                    ref={this._setGraphHeader}
                />
                <div className="eventPlot">
                    <div className="scroller">
                        <div className="scrollArea">
                            <EventTreeColumn config={config}/>
                            <EventPlotColumnContainer
                                config={config}
                                pixelsPerMillisecond={pixelsPerMillisecond}
                                ref={this._setEventPlotColumn}
                                store={config.store}
                            />
                        </div>
                    </div>
                    <NativeScrollXInput
                        pixelRange={getScriptPlotWidth(config.resultObject, pixelsPerMillisecond)}
                        ref={this._setEventPlotScrollXInput}
                    />
                </div>
                <SelectedEventDetailsContainer config={config} store={config.store}/>
                <ScreenshotPopupContainer config={config} store={config.store}/>
            </div>
        );
    }
}

ResultGraph.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
};
