import axiosClient from "./axiosClient";
import {
    GOODS_RECEIPT_API_GET_LIST_PSSF, 
    GOODS_RECEIPT_API_CREATE,
    GOODS_RECEIPT_API_UPDATE,
    GOODS_RECEIPT_API_DELETE,
    GOODS_RECEIPT_API_GET_DETAIL,
    GOODS_RECEIPT_API_GET_INVOICE_DETAIL_BY_INVOICE
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
    getInvoice: (id) =>{
        return axiosClient.get(`${GOODS_RECEIPT_API_GET_DETAIL}/${id}`);
    },
    getInvoiceDetailByInvoiceId: (id) =>{
        return axiosClient.get(`${GOODS_RECEIPT_API_GET_INVOICE_DETAIL_BY_INVOICE}/${id}`);
    },
}
export default goodsReceiptAPI;