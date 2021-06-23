import axiosClient from "./axiosClient";
import {
    PRODUCT_API_GET_LIST_PSSF, 
    PRODUCT_API_CREATE,
    PRODUCT_API_UPDATE,
    PRODUCT_API_DELETE,
} from '../utils/Constant'

const productAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(PRODUCT_API_GET_LIST_PSSF, params)
    },
    createProduct: (params) =>{
        return axiosClient.post(PRODUCT_API_CREATE, params)
    },
    updateProduct: (params) => {
        return axiosClient.put(PRODUCT_API_UPDATE, params);
    },
    deleteProduct: (params) => {
        return axiosClient.post(PRODUCT_API_DELETE, params);
    }
}
export default productAPI;