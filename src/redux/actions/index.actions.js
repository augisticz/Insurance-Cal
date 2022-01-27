import {createAction} from 'redux-actions';

// ******************
//  ACTION CONSTANTS
// ******************

export const GET_PRODUCT_INSURANCE = 'GET_PRODUCT_INSURANCE';
export const GET_PRODUCT_INSURANCE_SUCCESS = 'GET_PRODUCT_INSURANCE_SUCCESS';

// ******************
//  ACTIONS CREATORS
// ******************

export const getProductInsurance = createAction(GET_PRODUCT_INSURANCE);
export const getProductInsuranceSuccess = createAction(GET_PRODUCT_INSURANCE_SUCCESS);
