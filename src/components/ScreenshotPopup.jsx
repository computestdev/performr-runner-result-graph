import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Screenshot from './Screenshot';
import CloseButton from './CloseButton';

export default class ScreenshotPopup extends PureComponent {
    render() {
        const {dataURL, onClose} = this.props;
        return (
            <div className="ScreenshotPopup">
                <Screenshot dataURL={dataURL}/>
                <CloseButton onClose={onClose}/>
            </div>
        );
    }

}

ScreenshotPopup.propTypes = {
    dataURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
