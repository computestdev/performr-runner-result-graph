import React, {PureComponent} from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import PlotHeader from './PlotHeader';
import style from './style/GraphHeader.scss';

export default class GraphHeader extends PureComponent {
    constructor(props) {
        super(props);

        this._plotHeader = null;
        this._setPlotHeader = x => { this._plotHeader = x; };
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
                    pixelsPerMillisecond={this.props.pixelsPerMillisecond}
                    ref={this._setPlotHeader}
                    resultObject={this.props.resultObject}
                />
            </div>
        );
    }
}

GraphHeader.propTypes = {
    pixelsPerMillisecond: React.PropTypes.number.isRequired,
    resultObject: ImmutablePropTypes.map.isRequired,
};
