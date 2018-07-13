import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import getScriptPlotWidth from '../getScriptPlotWidth';
import EventPlot from './EventPlot';
import style from './style/EventPlotItem.scss';

const ELLIPSIS = '\u2026';

export default class EventPlotItem extends PureComponent {
    constructor(props) {
        super(props);
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
        const {config, pixelsPerMillisecond} = this.props;
        const {resultObject} = config;

        const relativeBegin = this.props.event.getIn(['timing', 'begin', 'time']) -
            resultObject.getIn(['timing', 'begin', 'time']);

        const left = relativeBegin * pixelsPerMillisecond;
        let width;

        if (this.eventHasEnded) {
            width = this.eventDuration * pixelsPerMillisecond;
        }
        else {
            // pretend that the event extends out of the plot
            const plotWidth = getScriptPlotWidth(resultObject, pixelsPerMillisecond);
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
                    config={this.props.config}
                    events={this.eventChildren}
                    pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                />
            </div>
        );
    }
}

EventPlotItem.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    expanded: PropTypes.bool.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
};

EventPlotItem.defaultProps = {
    expanded: true,
    selected: false,
};
