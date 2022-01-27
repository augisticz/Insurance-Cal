import {put, takeEvery} from 'redux-saga/effects';
import {GET_PRODUCT_INSURANCE, getProductInsuranceSuccess} from '../actions/index.actions';
import axios from 'axios'; 

export function* getProduct ({payload}) {
  try {
      console.log(payload)
    const res = yield axios.post('http://localhost:3001/getProduct', {...payload})
    console.log(res)
    yield put(getProductInsuranceSuccess(res.data))
  } catch (err) {
    // console.log(err);
  }
}

export default function * insurance () {
  yield takeEvery(GET_PRODUCT_INSURANCE, getProduct);
}
