import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class Screenshot extends PureComponent {
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
