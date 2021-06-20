import {combineReducers} from 'redux'
import brandReducer from './brandReducer'
import productReducer from './productReducer'

const rootReducer = combineReducers({
    brand: brandReducer,
    product: productReducer

})

export default rootReducer;