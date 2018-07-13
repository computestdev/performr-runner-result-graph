import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Screenshot from './Screenshot';
import CloseButton from './CloseButton';
import style from './style/ScreenshotPopup.scss';

export default class ScreenshotPopup extends PureComponent {
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
