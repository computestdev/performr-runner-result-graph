import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import PlotHeader from './PlotHeader';
import style from './style/GraphHeader.less';

export default class GraphHeader extends PureComponent {
    constructor(props) {
        super(props);

        this._plotHeader = null;
        this._setPlotHeader = x => { this._plotHeader = x; };
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
        return this._plotHeader.scrollX;
    }

    set scrollX(value) {
        this._plotHeader.scrollX = value;
    }

    render() {
        return (
            <div className="GraphHeader">
                <PlotHeader
                    config={this.props.config}
                    pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                    ref={this._setPlotHeader}
                />
            </div>
        );
    }
}

GraphHeader.propTypes = {
    config: ImmutablePropTypes.record.isRequired,
    pixelsPerMillisecond: PropTypes.number.isRequired,
};
