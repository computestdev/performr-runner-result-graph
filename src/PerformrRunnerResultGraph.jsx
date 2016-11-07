import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import style from './PerformrRunnerResultGraph.scss';
import ResultGraph from './components/ResultGraph';
import reducer from './reducers';

const buildEventLookupMap = (mapArg, events) => {
    let map = mapArg;

    // eslint-disable-next-line prefer-const
    for (let event of events) {
        map = map.set(event.get('id'), event);
        map = buildEventLookupMap(map, event.get('children'));
    }

    return map;
};

export default class PerformrRunnerResultGraph extends Component {
    static parseResultObject(resultObject) {

        // quick check to detect most invalid objects
        if (typeof resultObject !== 'object' ||
            typeof resultObject.timing !== 'object' ||
            typeof resultObject.timing.begin !== 'object' ||
            !Array.isArray(resultObject.transactions) ||
            !Array.isArray(resultObject.events)
        ) {
            throw Error('PerformrRunnerResultGraph.parseResultObject: Invalid argument');
        }

        const result = Immutable.fromJS(resultObject);

        const eventMap = new Immutable.Map().withMutations(map => {
            buildEventLookupMap(map, result.get('events'));
        });

        const transactionMap = new Immutable.Map().withMutations(map => {
            // eslint-disable-next-line prefer-const
            for (let transaction of result.get('transactions')) {
                map.set(transaction.get('id'), transaction);
            }
        });

        return result
            .set('eventMap', eventMap)
            .set('transactionMap', transactionMap);
    }

    constructor(props) {
        super(props);
        this.store = createStore(reducer);
    }

    componentWillMount() {
        if (style.ref) { // in case "style-loader/useable" is used
            style.ref();
        }
    }

    componentWillUnmount() {
        if (style.unref) {
            style.unref();
        }
    }

    render() {
        return (
            <div className="PerformrRunnerResultGraph">
                <Provider store={this.store}>
                    <ResultGraph pixelsPerMillisecond={this.props.pixelsPerMillisecond} resultObject={this.props.resultObject}/>
                </Provider>
            </div>
        );
    }
}

PerformrRunnerResultGraph.defaultProps = {
    pixelsPerMillisecond: 1 / 5, // 1s = 200px
};

PerformrRunnerResultGraph.propTypes = {
    pixelsPerMillisecond: React.PropTypes.number.isRequired,

    // not an exhaustive check, but it should catch most mistakes:
    resultObject: ImmutablePropTypes.mapContains({
        events: ImmutablePropTypes.list.isRequired,
        timing: ImmutablePropTypes.map.isRequired,
        transactions: ImmutablePropTypes.list.isRequired,
    }).isRequired,
};
