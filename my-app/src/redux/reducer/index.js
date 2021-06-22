import {combineReducers} from 'redux'
import brandReducer from './brandReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import supplierReducer from './supplierReducer'

const rootReducer = combineReducers({
    brand: brandReducer,
    product: productReducer,
    supplier: supplierReducer,
    category: categoryReducer
})

export default rootReducer;