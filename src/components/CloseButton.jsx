import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class CloseButton extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
    onClose: PropTypes.func.isRequired,
};
