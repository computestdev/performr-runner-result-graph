import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import style from './style/NativeScrollXInput.less';

export default class NativeScrollXInput extends PureComponent {
    constructor(props) {
        super(props);
        this._scrollerNode = null;
        this._setScrollerNode = x => { this._scrollerNode = x; };
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

    get scrollX() {
        return this._scrollerNode.scrollLeft;
    }

    set scrollX(value) {
        this._scrollerNode.scrollLeft = value;
    }

    render() {
        return (
            <div className="NativeScrollXInput" ref={this._setScrollerNode}>
                <div className="scrollArea" style={{width: this.props.pixelRange + 300 + 'px'}}/>
            </div>
        );
    }
}

NativeScrollXInput.propTypes = {
    pixelRange: PropTypes.number.isRequired,
};
