import {
    GET_ALL_CATEGORY,
    GET_ALL_CATEGORY_SUCCESS,
    GET_ALL_CATEGORY_FAILED,
    GET_LIST_PSSF_CATEGORY,
    GET_LIST_PSSF_CATEGORY_SUCCESS,
    GET_LIST_PSSF_CATEGORY_FAILED,
    GET_CATEGORY,
    GET_CATEGORY_SUCCESS,
    GET_CATEGORY_FAILED,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS,
} from '../../utils/Constant'

const initialState = {
    categories: '',
    error: '',
    isLoading: false,
}

function categoryReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_PSSF_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case GET_LIST_PSSF_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
            };
        case GET_LIST_PSSF_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case GET_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
            };
        case CREATE_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload,
            };
        case UPDATE_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload
            };
        case DELETE_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: payload
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

export default categoryReducer;