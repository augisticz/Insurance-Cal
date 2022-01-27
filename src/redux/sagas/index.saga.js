import insuranceSaga from './insurance.saga';
import {fork} from 'redux-saga/effects';

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
  yield fork(insuranceSaga);
}
