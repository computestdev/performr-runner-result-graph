import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './style/EventMetaDataTable.scss';

export default class EventMetaDataTable extends PureComponent {
    constructor(props) {
        super(props);

        this.handleViewScreenshotButton = () => {
            this.props.onSelectScreenshot(this.eventId);
        };
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

    get eventId() {
        return this.props.event.get('id');
    }

    get eventType() {
        return this.props.event.get('type');
    }

    render() {
        return (
            <div className="EventMetaDataTable">
                <table>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderRows() {
        const entries = [...this.props.event.get('metaData').entries()];

        return entries.map(([key, value]) => {
            return (
                <tr key={key}>
                    <th>{String(key)}</th>
                    <td>{this.renderValue(key, value)}</td>
                </tr>
            );
        });
    }

    renderValue(key, value) {
        const eventType = this.props.event.get('type');

        if (!value) {
            return String(value);
        }

        if (eventType === 'screenshot' && key === 'data') {
            return (
                <button className="viewScreenshotButton" onClick={this.handleViewScreenshotButton} type="button">
                    View Screenshot
                </button>
            );
        }

        if (typeof value === 'string') {
            return value;
        }

        if (typeof value === 'boolean' || typeof value === 'number') {
            return String(value);
        }

        if ((key === 'requestHeaders' || key === 'responseHeaders') && /^browser:http/.test(eventType)) {
            return value.map((map, i) => (
                <div className="line" key={i}>{map.get('name') + ': ' + map.get('value')}</div>
            ));
        }

        if (value.toJS) { // Immutable.js
            return JSON.stringify(value.toJS(), null, 2);
        }

        return String(value);
    }
}

EventMetaDataTable.propTypes = {
    // config: ImmutablePropTypes.record.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    onSelectScreenshot: PropTypes.func.isRequired,
};
