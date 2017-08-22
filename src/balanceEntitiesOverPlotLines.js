import Immutable from 'immutable';

const isOverlappingLine = (line, begin, end) => {
    // eslint-disable-next-line prefer-const
    for (let otherEntity of line) {
        const otherBegin = otherEntity.getIn(['timing', 'begin', 'time']);
        const otherEnd = otherEntity.getIn(['timing', 'end', 'time']);

        if (begin > otherBegin && begin < otherEnd) {
            return true;
        }

        if (end > otherBegin && end < otherEnd) {
            return true;
        }

        if (begin - otherBegin < 250) {
            return true;
        }
    }

    return false;
};

const placeEntity = (lines, entity) => {
    const begin = entity.getIn(['timing', 'begin', 'time']);
    const end = entity.getIn(['timing', 'end', 'time']);

    // eslint-disable-next-line prefer-const
    for (let line of lines) {
        if (!isOverlappingLine(line, begin, end)) {
            line.push(entity);
            return;
        }
    }

    lines.push([entity]);
};

const balanceEntitiesOverPlotLines = entities => {
    const lines = [];

    // eslint-disable-next-line prefer-const
    for (let entity of entities) {
        placeEntity(lines, entity);
    }

    return Immutable.fromJS(lines);
};

export default balanceEntitiesOverPlotLines;
