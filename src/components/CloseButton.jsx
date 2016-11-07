import React, {PureComponent} from 'react';

import style from './style/CloseButton.scss';

export default class CloseButton extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(e) {
        this.props.onClose();
    }

    render() {
        return (
            <button className="CloseButton" onClick={this.handleClick} type="button">
                close
            </button>
        );
    }

}

CloseButton.propTypes = {
    onClose: React.PropTypes.func.isRequired,
};
