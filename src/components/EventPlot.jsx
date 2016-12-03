import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventPlotItemContainer from '../containers/EventPlotItem';

export default class EventPlot extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const events = this.props.events.map(this.renderEvent, this);

        return (
            <div className="EventPlot">
                {events}
            </div>
        );
    }

    renderEvent(event) {
        const {config, pixelsPerMillisecond} = this.props;
        const eventBegin = event.getIn(['timing', 'begin', 'counter']);

        // The event started after the script ended (and the browser tab is being cleaned up & closed)
        if (eventBegin >= config.resultObject.getIn(['timing', 'end', 'counter'])) {
            return null;
        }

        return (
            <EventPlotItemContainer
                config={config}
                event={event}
                key={event.get('id')}
                pixelsPerMillisecond={pixelsPerMillisecond}
                store={config.store}
            />
        );
    }
}

EventPlot.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    events: ImmutablePropTypes.list.isRequired,
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
};
