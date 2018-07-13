import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import style from './style/Screenshot.less';

export default class Screenshot extends PureComponent {
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
        const {dataURL} = this.props;
        return (
            <div className="Screenshot">
                <img alt="Screenshot of the HTML document" src={dataURL}/>
            </div>
        );
    }

}

Screenshot.propTypes = {
    dataURL: PropTypes.string.isRequired,
};
