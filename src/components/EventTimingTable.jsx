import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import style from './style/EventTimingTable.scss';

export default class EventTimingTable extends PureComponent {
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

    render() {
        const duration = this.props.event.getIn(['timing', 'duration']);

        return (
            <div className="EventTimingTable">
                <table>
                    <tbody>
                        <tr>
                            <th>Duration</th>
                            <td>{duration ? Math.round(duration) + ' ms' : '-'}</td>
                        </tr>
                        {this.renderTime()}
                        <tr>
                            <td colSpan="2"><hr/></td>
                        </tr>
                        {this.renderBackgroundCounter()}
                        {this.renderScriptCounter()}
                        {this.renderContentCounter()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderBackgroundCounter() {
        const begin = this.props.event.getIn(['timing', 'begin', 'backgroundCounter']);
        const end = this.props.event.getIn(['timing', 'end', 'backgroundCounter']);

        if (!begin) {
            return null;
        }

        return [
            <tr key="begin">
                <th rowSpan="2">Background</th>
                <td title="Performance counter at event begin (in background process)">{Math.round(begin) + ' ms'}</td>
            </tr>,
            <tr key="end">
                <td title="Performance counter at event end (in background process)">{end ? Math.round(end) + ' ms' : '-'}</td>
            </tr>,
        ];
    }

    renderScriptCounter() {
        const begin = this.props.event.getIn(['timing', 'begin', 'scriptCounter']);
        const end = this.props.event.getIn(['timing', 'end', 'scriptCounter']);

        if (!begin) {
            return null;
        }

        return [
            <tr key="begin">
                <th rowSpan="2">Script</th>
                <td title="Performance counter at event begin (in script process)">{Math.round(begin) + ' ms'}</td>
            </tr>,
            <tr key="end">
                <td title="Performance counter at event end (in script process)">{end ? Math.round(end) + ' ms' : '-'}</td>
            </tr>,
        ];
    }

    renderContentCounter() {
        const begin = this.props.event.getIn(['timing', 'begin', 'contentCounter']);
        const end = this.props.event.getIn(['timing', 'end', 'contentCounter']);

        if (!begin) {
            return null;
        }

        return [
            <tr key="begin">
                <th rowSpan="2">Content</th>
                <td title="Performance counter at event begin (in content process)">{Math.round(begin) + ' ms'}</td>
            </tr>,
            <tr key="end">
                <td title="Performance counter at event end (in content process)">{end ? Math.round(end) + ' ms' : '-'}</td>
            </tr>,
        ];
    }

    renderTime() {
        const begin = moment(this.props.event.getIn(['timing', 'begin', 'time']));
        const end = moment(this.props.event.getIn(['timing', 'end', 'time']));

        return [
            <tr key="beginTime">
                <th rowSpan="2">Time</th>
                <td title="Wall time at event begin">{begin.format(this.props.timeFormat)}</td>
            </tr>,
            <tr key="endTime">
                <td title="Wall time at event end">{end ? end.format(this.props.timeFormat) : '-'}</td>
            </tr>,
        ];
    }
}

EventTimingTable.defaultProps = {
    timeFormat: 'YYYY-MM-DD HH:mm:ss SSS',
};

EventTimingTable.propTypes = {
    event: ImmutablePropTypes.map.isRequired,
    timeFormat: PropTypes.string.isRequired,
};
