import {
 
    GET_LIST_PSSF_PRODUCT,
    GET_LIST_PSSF_PRODUCT_SUCCESS,
    GET_LIST_PSSF_PRODUCT_FAILED,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
 
} from '../../utils/Constant'

const initialState = {
    products: '',
    error: '',
    isLoading: false,
}

function productReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_PSSF_PRODUCT:
            return {
                ...state,
                isLoading: true
            }
        case GET_LIST_PSSF_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload,
            };
        case GET_LIST_PSSF_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload,
            };
        case CREATE_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload,
            };
        case UPDATE_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: payload
            };
        case DELETE_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return {
                ...state
            }
    }
}

export default productReducer;