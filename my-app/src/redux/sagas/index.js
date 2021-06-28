import {all} from 'redux-saga/effects'

import brandSaga from '../sagas/brandSaga'
import categorySaga from '../sagas/categorySaga'
import supplierSaga from '../sagas/supplierSaga'
import productSaga from '../sagas/productSaga'
import goodReceiptSaga from '../sagas/goodReceiptSaga'

export default function* rootSaga(){
    yield all([
        brandSaga(),
        categorySaga(),
        supplierSaga(),
        productSaga(),
        goodReceiptSaga()
    ])
}