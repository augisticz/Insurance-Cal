import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index.reducer';
import sagas from './sagas/index.saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware);

export default function getStore (initalState = {}) {
    let store = createStore(rootReducer, initalState, enhancer)
    sagaMiddleware.run(sagas);
    return store;
}