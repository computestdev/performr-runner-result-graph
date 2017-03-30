import {assert} from 'chai';
import {List, fromJS} from 'immutable';

import balanceEntitiesOverPlotLines from '../src/balanceEntitiesOverPlotLines';

describe('balanceEntitiesOverPlotLines', () => {
    it('should return an empty array if no transactions are given', () => {
        const result = balanceEntitiesOverPlotLines(new List());
        assert(List.isList(result));
        assert(result.isEmpty());
    });

    it('should place all entities on the same line if they do not overlap', () => {
        const entities = fromJS([
            {
                id: 0,
                timing: {
                    begin: {time: 10},
                    end: {time: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {time: 20},
                    end: {time: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {time: 1000},
                    end: {time: 1001},
                },
            },
        ]);

        const result = balanceEntitiesOverPlotLines(entities);

        assert(List.isList(result));
        assert.strictEqual(result.size, 1);
        assert(List.isList(result.get(0)));
        assert.strictEqual(result.get(0).size, 3);
        assert.strictEqual(result.getIn([0, 0, 'id']), 0);
        assert.strictEqual(result.getIn([0, 1, 'id']), 1);
        assert.strictEqual(result.getIn([0, 2, 'id']), 2);
    });

    it('should place an entity on a new line if it overlaps', () => {
        const entities = fromJS([
            {
                id: 0,
                timing: {
                    begin: {time: 10},
                    end: {time: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {time: 19},
                    end: {time: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {time: 1000},
                    end: {time: 1001},
                },
            },
        ]);

        const result = balanceEntitiesOverPlotLines(entities);

        assert(List.isList(result));
        assert.strictEqual(result.size, 2);
        assert(List.isList(result.get(0)));
        assert.strictEqual(result.get(0).size, 2);
        assert(List.isList(result.get(1)));
        assert.strictEqual(result.get(1).size, 1);
        assert.strictEqual(result.getIn([0, 0, 'id']), 0);
        assert.strictEqual(result.getIn([1, 0, 'id']), 1);
        assert.strictEqual(result.getIn([0, 1, 'id']), 2);
    });

    it('should place an entity on the first line which fits', () => {
        const entities = fromJS([
            {
                id: 0,
                timing: {
                    begin: {time: 10},
                    end: {time: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {time: 19},
                    end: {time: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {time: 1000},
                    end: {time: 1100},
                },
            },
            {
                id: 3,
                timing: {
                    begin: {time: 900},
                    end: {time: 1001},
                },
            },
        ]);

        const result = balanceEntitiesOverPlotLines(entities);

        assert(List.isList(result));
        assert.strictEqual(result.size, 2);
        assert(List.isList(result.get(0)));
        assert.strictEqual(result.get(0).size, 2);
        assert(List.isList(result.get(1)));
        assert.strictEqual(result.get(1).size, 2);
        assert.strictEqual(result.getIn([0, 0, 'id']), 0);
        assert.strictEqual(result.getIn([1, 0, 'id']), 1);
        assert.strictEqual(result.getIn([0, 1, 'id']), 2);
        assert.strictEqual(result.getIn([1, 1, 'id']), 3);
    });
});
