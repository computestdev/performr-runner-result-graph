import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventTree from './EventTree';
import style from './style/EventTreeItem.scss';

export default class EventTreeItem extends PureComponent {
    constructor(props) {
        super(props);
        this.handleTitleClick = this.handleTitleClick.bind(this);
        this.handleTitleKeyPress = this.handleTitleKeyPress.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleExpandKeyPress = this.handleExpandKeyPress.bind(this);
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

    handleTitleKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onEventSelected && e.key === 'Enter') {
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

    handleExpandKeyPress(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.props.onEventExpand && e.key === 'Enter') {
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
            <div
                className="title"
                onClick={this.handleTitleClick}
                onKeyPress={this.handleTitleKeyPress}
                tabIndex={this.props.onEventSelected ? '0' : null}
                title={this.eventLongTitle}
            >
                <span
                    className="expandButton"
                    onClick={this.handleExpandClick}
                    onKeyPress={this.handleExpandKeyPress}
                    tabIndex={this.props.onEventExpand && this.hasChildren ? '0' : null}
                />
                <span className="titleText">{this.eventShortTitle || this.eventType}</span>
            </div>
        );
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
    expanded: React.PropTypes.bool.isRequired,
    onEventExpand: React.PropTypes.func,
    onEventSelected: React.PropTypes.func,
    selected: React.PropTypes.bool.isRequired,
};

EventTreeItem.defaultProps = {
    expanded: true,
    selected: false,
};
