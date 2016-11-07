import {describe, it} from 'mocha-sugar-free';
import {assert} from 'chai';
import balanceEntitiesOverPlotLines from '../src/balanceEntitiesOverPlotLines';
import {List, fromJS} from 'immutable';

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
                    begin: {counter: 10},
                    end: {counter: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {counter: 20},
                    end: {counter: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {counter: 1000},
                    end: {counter: 1001},
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
                    begin: {counter: 10},
                    end: {counter: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {counter: 19},
                    end: {counter: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {counter: 1000},
                    end: {counter: 1001},
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
                    begin: {counter: 10},
                    end: {counter: 20},
                },
            },
            {
                id: 1,
                timing: {
                    begin: {counter: 19},
                    end: {counter: 30},
                },
            },
            {
                id: 2,
                timing: {
                    begin: {counter: 1000},
                    end: {counter: 1100},
                },
            },
            {
                id: 3,
                timing: {
                    begin: {counter: 900},
                    end: {counter: 1001},
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
