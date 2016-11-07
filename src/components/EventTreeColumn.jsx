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
                    events={this.props.resultObject.get('events')}
                    resultObject={this.props.resultObject}
                />
            </div>
        );
    }
}

EventTreeColumn.propTypes = {
    resultObject: ImmutablePropTypes.map.isRequired,
};
