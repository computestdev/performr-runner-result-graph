import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import style from './style/EventTimingTable.scss';

export default class EventTimingTable extends PureComponent {
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
                        {this.renderContentCounter()}
                        {this.renderTime()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderContentCounter() {
        const scriptBegin = this.props.config.resultObject.getIn(['timing', 'begin', 'contentCounter']);
        const begin = this.props.event.getIn(['timing', 'begin', 'contentCounter']);
        const end = this.props.event.getIn(['timing', 'end', 'contentCounter']);

        if (!begin) {
            return null;
        }

        return [
            <tr key="begin">
                <th>Begin</th>
                <td>{Math.round(begin - scriptBegin) + ' ms'}</td>
            </tr>,
            <tr key="end">
                <th>End</th>
                <td>{end ? Math.round(end - scriptBegin) + ' ms' : '-'}</td>
            </tr>,
        ];
    }

    renderTime() {
        const begin = moment(this.props.event.getIn(['timing', 'begin', 'time']));
        const end = moment(this.props.event.getIn(['timing', 'end', 'time']));

        return [
            <tr key="beginTime">
                <th>Begin Time</th>
                <td>{begin.format(this.props.timeFormat)}</td>
            </tr>,
            <tr key="endTime">
                <th>End Time</th>
                <td>{end ? end.format(this.props.timeFormat) : '-'}</td>
            </tr>,
        ];
    }
}

EventTimingTable.defaultProps = {
    timeFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

EventTimingTable.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    timeFormat: React.PropTypes.string.isRequired,
};
