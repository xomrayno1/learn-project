import {
    GET_ALL_BRAND,
    GET_ALL_BRAND_SUCCESS,
    GET_ALL_BRAND_FAILED,
    GET_LIST_PSSF_BRAND,
    GET_LIST_PSSF_BRAND_SUCCESS,
    GET_LIST_PSSF_BRAND_FAILED,
    GET_BRAND,
    GET_BRAND_SUCCESS,
    GET_BRAND_FAILED,
    DELETE_BRAND,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAILED,
    UPDATE_BRAND,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAILED,
    CREATE_BRAND,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS
} from '../../utils/Constant'

const initialState = {
    brands : '',
    error : '',
    ísLoading : false
}

function brandReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case GET_LIST_PSSF_BRAND:
            return {
                ...state,
                isLoading: true
            }
        case GET_LIST_PSSF_BRAND_SUCCESS:
                return {
                    ...state,
                    isLoading: false,
                    brands: payload
                };
        case GET_LIST_PSSF_BRAND_FAILED:
                return {
                    ...state,
                    isLoading: false,
                    error: payload
                };
        case GET_BRAND:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_BRAND:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_BRAND:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_BRAND:
            return {
                ...state,
                isLoading: true
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                brands: payload
            };
        case REQUEST_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        default:
            return {
                ...state
            }
    }
}

export default brandReducer;