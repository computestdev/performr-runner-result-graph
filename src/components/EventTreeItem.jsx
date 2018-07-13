import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTree from './EventTree';
import style from './style/EventTreeItem.scss';

export default class EventTreeItem extends PureComponent {
    constructor(props) {
        super(props);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        if (style.ref) {
            style.ref();
        }
    }

    componentWillUnmount() {
        if (style.unref) {
            style.unref();
        }
    }

    get eventChildren() {
        return this.props.event.get('children');
    }

    get hasChildren() {
        return !this.eventChildren.isEmpty();
    }

    get eventId() {
        return this.props.event.get('id');
    }

    get eventType() {
        return this.props.event.get('type');
    }

    get eventShortTitle() {
        return this.props.event.get('shortTitle');
    }

    get eventLongTitle() {
        return this.props.event.get('longTitle');
    }

    handleTitleClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onEventSelected) {
            this.props.onEventSelected(this.eventId);
        }
    }

    handleExpandClick(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onEventExpand) {
            this.props.onEventExpand(this.eventId, !this.props.expanded);
        }
    }

    render() {
        const className = ['EventTreeItem'];

        if (this.hasChildren) {
            className.push('hasChildren');

            if (this.props.expanded) {
                className.push('expanded');
            }
        }

        if (this.props.selected) {
            className.push('selected');
        }

        // todo: show a different icon for each event type (and a generic icon for unknown event types)

        return (
            <div className={className.join(' ')}>
                {this.renderTitle()}
                {this.renderChildren()}
            </div>
        );
    }

    renderTitle() {
        return (
            <div className="title" title={this.eventLongTitle}>
                {this.renderExpandButton()}

                <button
                    className="titleText"
                    onClick={this.handleTitleClick}
                >
                    {this.eventShortTitle || this.eventType}
                </button>
            </div>
        );
    }

    renderExpandButton() {
        if (this.props.onEventExpand && this.hasChildren) {
            return (
                <button
                    className="expandButton"
                    onClick={this.handleExpandClick}
                />
            );
        }

        return null;
    }

    renderChildren() {
        if (!this.hasChildren) {
            return null;
        }

        return (
            <div className="children">
                <EventTree
                    config={this.props.config}
                    events={this.eventChildren}
                />
            </div>
        );
    }
}

EventTreeItem.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    event: ImmutablePropTypes.map.isRequired,
    expanded: PropTypes.bool.isRequired,
    onEventExpand: PropTypes.func,
    onEventSelected: PropTypes.func,
    selected: PropTypes.bool.isRequired,
};

EventTreeItem.defaultProps = {
    expanded: true,
    selected: false,
};
