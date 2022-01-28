import Dropdown from '../Dropdown.component';
import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import {genderList} from '../../../../configs/configStaticValue.config';

describe('Dropdown Component', () => {
  const wrapper = shallow(<Dropdown listData={genderList} />);

  it('renders correctly', () => {
    const component = renderer.create(<Dropdown listData={genderList} />).toJSON();
    expect(component).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });

  it('should handleChange', () => {
    const selectValue = {
      target: {
        value: '1'
      }
    };
    wrapper.instance().handleChange(selectValue);
    expect(wrapper.instance().state.selectValue).toEqual('1');
  });
});