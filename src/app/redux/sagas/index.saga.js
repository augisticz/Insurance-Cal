import insuranceSaga from './insurance.saga';
import {fork} from 'redux-saga/effects';

export default function* () {
  yield fork(insuranceSaga);
}
