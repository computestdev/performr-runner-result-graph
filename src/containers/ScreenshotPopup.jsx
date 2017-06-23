import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import selectScreenshot from '../actions/selectScreenshot';
import ScreenshotPopup from '../components/ScreenshotPopup';

class ScreenshotPopupWrapper extends PureComponent {
    render() {
        const {config, selectedEvent} = this.props;

        if (selectedEvent) {
            const event = config.resultObject.getIn(['eventMap', selectedEvent]);
            const dataURL = event.getIn(['metaData', 'data', 'data']);

            return (
                <ScreenshotPopup config={config} dataURL={dataURL} onClose={this.props.onClose}/>
            );
        }

        return null;
    }
}

ScreenshotPopupWrapper.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedEvent: PropTypes.string,
};

const mapStateToProps = (state, {config}) => ({
    selectedEvent: config.getMyState(state, ['selectedScreenshot']),
});

const mapDispatchToProps = (dispatch, {config}) => ({
    onClose: () => dispatch(selectScreenshot(config.instanceKey, null)),
});

const ScreenshotPopupContainer = connect(mapStateToProps, mapDispatchToProps)(ScreenshotPopupWrapper);
export default ScreenshotPopupContainer;
