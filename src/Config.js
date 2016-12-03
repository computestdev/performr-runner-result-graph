import {Record, Map as ImmutableMap} from 'immutable';
const EMPTY_MAP = new ImmutableMap();

// this object is passed around between all the components
const ConfigRecord = new Record({
    instanceKey: '',
    resultObject: null,
    store: null,
});

class Config extends ConfigRecord {
    getMyState(globalState, keyPath = [], defaultValue = undefined) {
        const instances = ImmutableMap.isMap(globalState)
            ? globalState.get('PerformrRunnerResultGraph')
            : globalState.PerformrRunnerResultGraph;

        const instanceKey = this.get('instanceKey');
        const instanceState = instances.get(instanceKey, EMPTY_MAP);
        return instanceState.getIn(keyPath, defaultValue);
    }
}

export default Config;
