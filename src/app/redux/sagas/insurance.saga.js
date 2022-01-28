import {put, takeLatest} from 'redux-saga/effects';
import {GET_PRODUCT_INSURANCE, getProductInsuranceSuccess} from '../actions/index.actions';
import axios from 'axios'; 

export function* getProduct ({payload}) {
  try {
    const res = yield axios.post('http://localhost:3001/getProduct', {...payload});
    yield put(getProductInsuranceSuccess(res.data));
  } catch (err) {
    // console.log(err);
  }
}

export default function * insurance () {
  yield takeLatest(GET_PRODUCT_INSURANCE, getProduct);
}
