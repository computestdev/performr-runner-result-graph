import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import EventPlot from './EventPlot';
import style from './style/EventPlotItem.scss';

const ELLIPSIS = '\u2026';

export default class EventPlotItem extends PureComponent {
    constructor(props) {
        super(props);
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

    get eventChildren() {
        return this.props.event.get('children');
    }

    get hasChildren() {
        return !this.eventChildren.isEmpty();
    }

    get eventType() {
        return this.props.event.get('type');
    }

    get eventShortTitle() {
        return this.props.event.get('shortTitle');
    }

    get eventDuration() {
        return this.props.event.getIn(['timing', 'duration']);
    }

    /**
     * If false, the event was still ongoing when the script ended
     *
     * @return {boolean}
     */
    get eventHasEnded() {
        return this.eventDuration !== null;
    }

    render() {
        const className = ['EventPlotItem'];

        if (this.hasChildren) {
            className.push('hasChildren');

            if (this.props.expanded) {
                className.push('expanded');
            }
        }

        if (this.props.selected) {
            className.push('selected');
        }

        return (
            <div className={className.join(' ')}>
                {this.renderPlot()}
                {this.renderChildren()}
            </div>
        );
    }

    renderPlot() {
        const relativeBegin = this.props.event.getIn(['timing', 'begin', 'counter']) -
            this.props.resultObject.getIn(['timing', 'begin', 'counter']);

        const left = relativeBegin * this.props.pixelsPerMillisecond;
        let width;

        if (this.eventHasEnded) {
            width = this.eventDuration * this.props.pixelsPerMillisecond;
        }
        else {
            // pretend that the event extends out of the plot
            const plotWidth = getScriptPlotWidth(this.props.resultObject, this.props.pixelsPerMillisecond);
            width = plotWidth - left;
        }

        if (width < 1) {
            width = 1;
        }

        const time = Math.round(this.eventDuration) + ' ms';
        const tooltip =
            (this.eventHasEnded ? time : ELLIPSIS + ' ms') +
            ': ' +
            (this.eventShortTitle || this.eventType);

        return (
            <div className="plotWrap" title={tooltip}>
                <div
                    className="plot"
                    style={{
                        left: left + 'px',
                        width: width + 'px',
                    }}
                >
                    <span className="time">{this.eventHasEnded ? time : ''}</span>
                </div>
            </div>
        );
    }

    renderChildren() {
        if (!this.hasChildren) {
            return null;
        }

        return (
            <div className="children">
                <EventPlot
                    events={this.eventChildren}
                    pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                    resultObject={this.props.resultObject}
                />
            </div>
        );
    }
}

EventPlotItem.propTypes = {
    event: ImmutablePropTypes.map.isRequired,
    expanded: React.PropTypes.bool.isRequired,
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
    selected: React.PropTypes.bool.isRequired,
};

EventPlotItem.defaultProps = {
    expanded: true,
    selected: false,
};
