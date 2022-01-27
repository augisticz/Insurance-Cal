import {GET_PRODUCT_INSURANCE_SUCCESS,} from '../actions/index.actions';

export const initialState = {
    resultInsurance: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, {type, payload}) => {
  switch (type) {
  case GET_PRODUCT_INSURANCE_SUCCESS:
    return {
      ...state,
      resultInsurance: payload,
    };
  default:
    return state;
  }
};
