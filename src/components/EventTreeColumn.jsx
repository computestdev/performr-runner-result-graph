import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTree from './EventTree';

export default class EventTreeColumn extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="EventTreeColumn">
                <EventTree
                    config={this.props.config}
                    events={this.props.config.resultObject.get('events')}
                />
            </div>
        );
    }
}

EventTreeColumn.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
};
