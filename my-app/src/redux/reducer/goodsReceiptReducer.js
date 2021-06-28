import {
    GET_LIST_PSSF_GOODS_RECEIPT,
    GET_LIST_PSSF_GOODS_RECEIPT_SUCCESS,
    GET_LIST_PSSF_GOODS_RECEIPT_FAILED,
    GET_GOODS_RECEIPT,
    GET_GOODS_RECEIPT_SUCCESS,
    GET_GOODS_RECEIPT_FAILED,
    DELETE_GOODS_RECEIPT,
    DELETE_GOODS_RECEIPT_SUCCESS,
    DELETE_GOODS_RECEIPT_FAILED,
    CREATE_GOODS_RECEIPT,
    CREATE_GOODS_RECEIPT_SUCCESS,
    CREATE_GOODS_RECEIPT_FAILED,
    UPDATE_GOODS_RECEIPT,
    UPDATE_GOODS_RECEIPT_SUCCESS,
    UPDATE_GOODS_RECEIPT_FAILED
} from '../../utils/Constant'

const initialState = {
    goodsReceipts: '',
    error: '',
    isLoading: false,
}

function goodReceiptReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_PSSF_GOODS_RECEIPT:
            return {
                ...state,
                isLoading: true
            }
        case GET_LIST_PSSF_GOODS_RECEIPT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                goodsReceipts: payload,
            };
        case GET_LIST_PSSF_GOODS_RECEIPT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case GET_GOODS_RECEIPT:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_GOODS_RECEIPT:
            return {
                ...state,
                isLoading: true
            }
        case CREATE_GOODS_RECEIPT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                goodsReceipts: payload,
            };
        case CREATE_GOODS_RECEIPT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case UPDATE_GOODS_RECEIPT:
            return {
                ...state,
                isLoading: true
            }
        case UPDATE_GOODS_RECEIPT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                goodsReceipts: payload,
            };
        case UPDATE_GOODS_RECEIPT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case DELETE_GOODS_RECEIPT:
            return {
                ...state,
                isLoading: true
            }
        case DELETE_GOODS_RECEIPT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                goodsReceipts: payload
            };
        case DELETE_GOODS_RECEIPT_FAILED:
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

export default goodReceiptReducer;