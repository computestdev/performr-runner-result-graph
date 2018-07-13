import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTimingTable from './EventTimingTable';
import EventMetaDataTable from './EventMetaDataTable';
import CloseButton from './CloseButton';

export default class EventDetails extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {config, event, onSelectScreenshot} = this.props;

        return (
            <div className="EventDetails">
                {this.renderCloseButton()}
                <div className="title">
                    {event.get('longTitle') || event.get('type')}
                </div>
                <div className="comment">
                    {event.get('comment')}
                </div>
                <div className="meta">
                    <EventTimingTable config={config} event={event}/>
                    <EventMetaDataTable config={config} event={event} onSelectScreenshot={onSelectScreenshot}/>
                </div>
            </div>
        );
    }

    renderCloseButton() {
        if (!this.props.onClose) {
            return null;
        }

        return (
            <CloseButton onClose={this.props.onClose}/>
        );
    }
}

EventDetails.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    onClose: PropTypes.func,
    onSelectScreenshot: PropTypes.func.isRequired,
};
