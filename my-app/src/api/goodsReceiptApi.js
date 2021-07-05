import axiosClient from "./axiosClient";
import {
    GOODS_RECEIPT_API_GET_LIST_PSSF, 
    GOODS_RECEIPT_API_CREATE,
    GOODS_RECEIPT_API_UPDATE,
    GOODS_RECEIPT_API_DELETE,
    GOODS_RECEIPT_API_GET_DETAIL
} from '../utils/Constant'

const goodsReceiptAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(GOODS_RECEIPT_API_GET_LIST_PSSF, params)
    },
    deleteGoodsReceipt: (params) =>{
        return axiosClient.post(GOODS_RECEIPT_API_DELETE, params)
    },
    updateGoodsReceipt: (params) => {
        return axiosClient.put(GOODS_RECEIPT_API_UPDATE, params);
    },
    createGoodsReceipt: (params) => {
        return axiosClient.post(GOODS_RECEIPT_API_CREATE, params);
    },
    getInvoiceDetail: (id) =>{
        return axiosClient.get(`${GOODS_RECEIPT_API_GET_DETAIL}/${id}`);
    },
}
export default goodsReceiptAPI;