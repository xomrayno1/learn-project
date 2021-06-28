import {combineReducers} from 'redux'
import brandReducer from './brandReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import supplierReducer from './supplierReducer'
import goodsReceiptReducer from './goodsReceiptReducer'

const rootReducer = combineReducers({
    brand: brandReducer,
    product: productReducer,
    supplier: supplierReducer,
    category: categoryReducer,
    goodsReceipt: goodsReceiptReducer,
})

export default rootReducer;