import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createStore, combineReducers} from 'redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ResultGraph from './components/ResultGraph';
import {createInstanceReducer, createRootReducer, stateKey} from './reducers';
import Config from './Config';

const DEFAULT_PIXELS_PER_MS = 0.5;

// this module is the main export for this package

export {createInstanceReducer, createRootReducer, stateKey};

const buildEventLookupMap = (mapArg, events) => {
    let map = mapArg;

    // eslint-disable-next-line prefer-const
    for (let event of events) {
        map = map.set(event.get('id'), event);
        map = buildEventLookupMap(map, event.get('children'));
    }

    return map;
};

export const parseResultObject = resultObject => {
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
};

export default class PerformrRunnerResultGraph extends Component {
    constructor(props) {
        super(props);

        this._configCached = new Config();
        this._defaultStoreCached = null;
    }

    render() {
        const {instanceKey, resultObject, width} = this.props;
        let {pixelsPerMillisecond} = this.props;

        const duration = resultObject.getIn(['timing', 'duration']);

        if (!pixelsPerMillisecond && width) {
            // Todo: calculate the subtracted width
            pixelsPerMillisecond = (width - 375) / duration;
        }
        if (!pixelsPerMillisecond || pixelsPerMillisecond < 0) {
            pixelsPerMillisecond = DEFAULT_PIXELS_PER_MS;
        }

        if (!this.props.store && !this._defaultStoreCached) {
            this._defaultStoreCached = createStore(combineReducers({
                [stateKey]: createRootReducer([instanceKey]),
            }));
        }

        // Immutable.js returns the same object in set() if the value has not changed,
        // so caching the config here makes sure our pure components do not have to re-render
        this._configCached = this._configCached
        .set('instanceKey', instanceKey)
        .set('resultObject', resultObject)
        .set('store', this.props.store || this._defaultStoreCached);

        return (
            <div className="PerformrRunnerResultGraph">
                <ResultGraph
                    config={this._configCached}
                    pixelsPerMillisecond={pixelsPerMillisecond}
                />
            </div>
        );
    }
}

PerformrRunnerResultGraph.defaultProps = {
    instanceKey: 'default',
    pixelsPerMillisecond: DEFAULT_PIXELS_PER_MS,
    store: null,
    width: null,
};

PerformrRunnerResultGraph.propTypes = {
    // The instanceKey us used as a key for Immutable.Map, but also in strict equality checks
    // (e.g. foo.instanceKey === bar.instanceKey)
    instanceKey: PropTypes.any.isRequired,
    pixelsPerMillisecond: PropTypes.number,

    // not an exhaustive check, but it should catch most mistakes.s
    // especially eventMap and transactionMap are useful checks since they make
    // sure that `parseResultObject` is used instead of immutable.fromJS()
    resultObject: ImmutablePropTypes.mapContains({
        eventMap: ImmutablePropTypes.map.isRequired,
        events: ImmutablePropTypes.list.isRequired,
        timing: ImmutablePropTypes.map.isRequired,
        transactionMap: ImmutablePropTypes.map.isRequired,
        transactions: ImmutablePropTypes.list.isRequired,
    }).isRequired,
    store: PropTypes.object,
    width: PropTypes.number,
};
