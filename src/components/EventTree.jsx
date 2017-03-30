import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTreeItemContainer from '../containers/EventTreeItem';

export default class EventTree extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const events = this.props.events.map(this.renderEvent, this);

        return (
            <div className="EventTree">
                {events}
            </div>
        );
    }

    renderEvent(event) {
        const eventBegin = event.getIn(['timing', 'begin', 'time']);

        // The event started after the script ended (and the browser tab is being cleaned up & closed)
        if (eventBegin >= this.props.config.resultObject.getIn(['timing', 'end', 'time'])) {
            return null;
        }

        return (
            <EventTreeItemContainer
                config={this.props.config}
                event={event}
                key={event.get('id')}
                store={this.props.config.store}
            />
        );
    }
}

EventTree.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    events: ImmutablePropTypes.list.isRequired,
};
