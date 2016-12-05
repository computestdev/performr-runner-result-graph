import React from 'react';
import {assert} from 'chai';
import {mount} from 'enzyme';

import CloseButton from '../../src/components/CloseButton';

describe('CloseButton', () => {
    it('should call onClose() when clicked', () => {
        const onClose = jest.fn();
        const wrapper = mount(<CloseButton onClose={onClose}/>);
        assert.lengthOf(onClose.mock.calls, 0);

        wrapper.find('button').simulate('click');
        assert.lengthOf(onClose.mock.calls, 1);
    });
});
