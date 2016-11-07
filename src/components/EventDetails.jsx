import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTimingTable from './EventTimingTable';
import EventMetaDataTable from './EventMetaDataTable';
import CloseButton from './CloseButton';
import style from './style/EventDetails.scss';

export default class EventDetails extends PureComponent {
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
        const {event} = this.props;

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
                    <EventTimingTable event={event} resultObject={this.props.resultObject}/>
                    <EventMetaDataTable event={event} resultObject={this.props.resultObject}/>
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
    event: ImmutablePropTypes.map.isRequired,
    onClose: React.PropTypes.func,
    resultObject: ImmutablePropTypes.map.isRequired,
};
