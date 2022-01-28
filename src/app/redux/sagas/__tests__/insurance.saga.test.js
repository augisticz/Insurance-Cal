import insuranceSaga, {getProduct} from '../insurance.saga';
import sagaHelper from 'redux-saga-testing';
import {call, put, takeLatest} from 'redux-saga/effects';
import {GET_PRODUCT_INSURANCE, getProductInsuranceSuccess} from '../../actions/index.actions';
import axios from 'axios'; 

describe('appSettingSaga: Testing the root Saga', () => {
  const it = sagaHelper(insuranceSaga());
  it('Should take the latest get product', (result) => {
    expect(result).toEqual(takeLatest(GET_PRODUCT_INSURANCE, getProduct));
  });
});

describe('appSettingSaga: Testing the get all settings', () => {
  const payload = {
    genderCd: 'MALE',
    dob: '',
    planCode: '1',
    premiumPerYear: 100000,
    paymentFrequency: 'YEARLY',
    saPerYear: 0,
    calType: 'calType1'
  };
  const it = sagaHelper(getProduct({payload}));

  it('should call api getProduct', (result) => {
    expect(result).toEqual(Promise.resolve(call(axios.post, 'http://localhost:3001/getProduct', {...payload})));
    return {data: {baseSumAssured: 10000}};
  });
  it('should put response to store', (result) => {
    expect(result).toEqual(put(getProductInsuranceSuccess({baseSumAssured: 10000})));
  });
  it('and then nothing', (result) => {
    expect(result).toBeUndefined();
  });
});