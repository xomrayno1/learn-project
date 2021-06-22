import {
    GET_ALL_SUPPLIER,
    GET_ALL_SUPPLIER_SUCCESS,
    GET_ALL_SUPPLIER_FAILED,
    GET_LIST_PSSF_SUPPLIER,
    GET_LIST_PSSF_SUPPLIER_SUCCESS,
    GET_LIST_PSSF_SUPPLIER_FAILED,
    GET_SUPPLIER,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIER_FAILED,
    DELETE_SUPPLIER,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAILED,
    UPDATE_SUPPLIER,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_FAILED,
    CREATE_SUPPLIER,
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS,
} from '../../utils/Constant'

const initialState = {
    suppliers: '',
    error: '',
    isLoading: false,
}

function supplierReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_PSSF_SUPPLIER:
            return {
                ...state,
                isLoading: true
            }
        case GET_LIST_PSSF_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suppliers: payload,
            };
        case GET_LIST_PSSF_SUPPLIER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case GET_SUPPLIER:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_SUPPLIER:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suppliers: payload,
            };
        case CREATE_SUPPLIER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_SUPPLIER:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suppliers: payload,
            };
        case UPDATE_SUPPLIER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case DELETE_SUPPLIER:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suppliers: payload
            };
        case DELETE_SUPPLIER_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suppliers: payload
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

export default supplierReducer;