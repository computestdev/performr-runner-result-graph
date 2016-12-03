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
        const scriptBegin = this.props.config.resultObject.getIn(['timing', 'begin', 'counter']);
        const begin = this.props.event.getIn(['timing', 'begin', 'counter']);
        const end = this.props.event.getIn(['timing', 'end', 'counter']);
        const duration = this.props.event.getIn(['timing', 'duration']);
        const beginTime = moment(this.props.event.getIn(['timing', 'begin', 'time']));
        const endTime = moment(this.props.event.getIn(['timing', 'end', 'time']));

        return (
            <div className="EventTimingTable">
                <table>
                    <tbody>
                        <tr>
                            <th>Duration</th>
                            <td>{duration ? Math.round(duration) + ' ms' : '-'}</td>
                        </tr>
                        <tr>
                            <th>Begin</th>
                            <td>{Math.round(begin - scriptBegin) + ' ms'}</td>
                        </tr>
                        <tr>
                            <th>End</th>
                            <td>{end ? Math.round(end - scriptBegin) + ' ms' : '-'}</td>
                        </tr>
                        <tr>
                            <th>Begin Time</th>
                            <td>{beginTime.format(this.props.timeFormat)}</td>
                        </tr>
                        <tr>
                            <th>End Time</th>
                            <td>{end ? endTime.format(this.props.timeFormat) : '-'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
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
