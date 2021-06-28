import {
    GET_LIST_PSSF_GOODS_RECEIPT,
    DELETE_GOODS_RECEIPT,
    CREATE_GOODS_RECEIPT,
    UPDATE_GOODS_RECEIPT,
    GET_GOODS_RECEIPT
} from '../../utils/Constant'

export const getListPSSFGoodsReceipt = (payload) => {
    return {
        type : GET_LIST_PSSF_GOODS_RECEIPT,
        payload,
    }
}

export const getGoodsReceipt = (payload) => {
    return {
        type : GET_GOODS_RECEIPT,
        payload,
    }
}

export const deleteGoodsReceipt = (payload) => {
    return {
        type : DELETE_GOODS_RECEIPT,
        payload,
    }
}

export const createGoodsReceipt = (payload) => {
    return {
        type : CREATE_GOODS_RECEIPT,
        payload
    }
}

export const updateGoodsReceipt = (payload) => {
    return {
        type : UPDATE_GOODS_RECEIPT,
        payload
    }
}
