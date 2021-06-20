import {all} from 'redux-saga/effects'

import brandSaga from '../sagas/brandSaga'

export default function* rootSaga(){
    yield all([
        brandSaga(),
    ])
}