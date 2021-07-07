import axiosClient from "./axiosClient";
import {
    SUPPLIER_API_GET_LIST_PSSF, 
    SUPPLIER_API_CREATE,
    SUPPLIER_API_UPDATE,
    SUPPLIER_API_DELETE,
    SUPPLIER_API_GET_DETAIL
} from '../utils/Constant'

const supplierAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(SUPPLIER_API_GET_LIST_PSSF, params)
    },
    createSupplier: (params) =>{
        return axiosClient.post(SUPPLIER_API_CREATE, params)
    },
    updateSupplier: (params) => {
        return axiosClient.put(SUPPLIER_API_UPDATE, params);
    },
    deleteSupplier: (params) => {
        return axiosClient.post(SUPPLIER_API_DELETE, params);
    },
    getSupplier : (params) => {
        return axiosClient.get(SUPPLIER_API_GET_DETAIL + `/${params}`);
    }
}
export default supplierAPI;