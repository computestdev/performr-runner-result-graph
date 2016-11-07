import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './style/EventMetaDataTable.scss';

export default class EventMetaDataTable extends PureComponent {
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
        const {eventType} = this;
        const entries = [...this.props.event.get('metaData').entries()];

        return entries.map(([key, value]) => {
            if (eventType === 'screenshot' && key === 'data') {
                return null; // this will be a very large value, skip it
            }

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
    event: ImmutablePropTypes.map.isRequired,
    // resultObject: ImmutablePropTypes.map.isRequired,
};
