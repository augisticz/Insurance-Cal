import React from 'react';
import App, {mapDispatchToProps} from '../App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {shallow} from 'enzyme';
import {getProductInsurance} from '../redux/actions/index.actions';

const store = createStore(() => ({}));

describe('AppContainer page', () => {
  let appComponent = null;
  let instance = null;

  beforeEach(() => {
    const wrapper = shallow(<App store={store} />);
    appComponent =  wrapper.find('App').shallow();
    instance = appComponent.instance();
  });

  it('should render', async () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('getDerivedStateFromProps should return new state', () => {
    const nextProps = {resultInsurance: {}};
    const state = {resultInsurance: {
      baseSumAssured: 10000
    }};
    const result = App.WrappedComponent.getDerivedStateFromProps(nextProps, state);
    expect(result).toEqual(nextProps);
  });

  it('should checkReq', () => {
    expect(instance.checkReq()).toEqual(false);
    appComponent.setState({premiumPerYear: 100000, saPerYear: 0, type: 'calType1', period: 'YEARLY'});
    expect(instance.checkReq()).toEqual(true);
  });

  it('should onChangeType', () => {
    instance.onChangeType('calType');
    expect(instance.state.resultInsurance).toEqual({});
    expect(instance.state.type).toEqual('calType');
  });

  it('should onChangePeriod', () => {
    instance.onChangePeriod('YEARLY');
    expect(instance.state.resultInsurance).toEqual({});
    expect(instance.state.period).toEqual('YEARLY');
  });

  it('should onClickCalculate when empty data', () => {
    const getProduct = jest.fn();
    appComponent.setProps({getProduct});

    instance.onClickCalculate();
    expect(getProduct).not.toHaveBeenCalled();
  });

  it('should handleChangeDOB', () => {
    const event = {target: {value: '10/02/2022'}};
    instance.handleChangeDOB(event);
    expect(instance.state.dob).toEqual('2022-10-Su 00:00:00');
  });

  it('should onClickCalculate when has data', () => {
    const getProduct = jest.fn();
    const data = {
      genderCd: '',
      dob: '',
      planCode: '',
      premiumPerYear: 100000,
      paymentFrequency: 'YEARLY',
      saPerYear: 0,
      calType: 'calType1'
    };
    const event = {target: {value: '100000'}};
    appComponent.setProps({getProduct});
    appComponent.setState({premiumPerYear: 100000, saPerYear: 0, type: 'calType1', period: 'YEARLY'});
    instance.onClickCalculate();
    appComponent.find('.value-cal').simulate('change', event);
    expect(instance.state.isClick).toEqual(true);
    expect(instance.checkReq()).toEqual(true);
    expect(getProduct).toHaveBeenCalledWith(data);
  });

  it('should change type to calType1', () => {
    const event = {target: {value: '100000'}};
    appComponent.setState({type: 'calType1'});
    appComponent.find('.value-cal').simulate('change', event);
    expect(instance.state.saPerYear).toEqual('100000');
    expect(instance.state.premiumPerYear).toEqual('');
  });

  it('should change type to calType1', () => {
    const event = {target: {value: '100000'}};
    appComponent.setState({type: 'calType2'});
    appComponent.find('.value-cal').simulate('change', event);
    expect(instance.state.premiumPerYear).toEqual('100000');
    expect(instance.state.saPerYear).toEqual('');
  });

  it('should change dropdown-gender', () => {
    const value = 'MALE';
    appComponent.find('.dropdown-gender').simulate('change', value);
    expect(instance.state.gender).toEqual('MALE');
  });

  it('should change dropdown-plan', () => {
    const value = 'T11A20';
    appComponent.find('.dropdown-plan').simulate('change', value);
    expect(instance.state.plan).toEqual('T11A20');
  });

  it('should change dropdown-type', () => {
    const value = 'calType1';
    appComponent.find('.dropdown-type').simulate('change', value);
    expect(instance.state.type).toEqual('calType1');
  });
  
  it('should change dropdown-period', () => {
    const value = 'YEARLY';
    appComponent.find('.dropdown-period').simulate('change', value);
    expect(instance.state.period).toEqual('YEARLY');
  });

  it('Check mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(typeof props).toEqual('object');
    expect(props.getProduct).toBeDefined();

    dispatch.mockClear();
    props.getProduct('mocklink');
    expect(dispatch).toBeCalledWith(getProductInsurance('mocklink'));

  });
});