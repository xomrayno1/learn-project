import axiosClient from "./axiosClient";
import {
    BRAND_API, 
    BRAND_API_GET_LIST_PSSF, 
    BRAND_API_CREATE,
    BRAND_API_UPDATE,
    BRAND_API_DELETE,
    CATEGORY_API_CREATE
} from '../utils/Constant'

const brandAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(BRAND_API_GET_LIST_PSSF, params)
    },
    deleteBrand: (params) =>{
        return axiosClient.post(BRAND_API_DELETE, params)
    },
    updateBrand: (params) => {
        return axiosClient.put(BRAND_API_UPDATE, params);
    },
    createBrand: (params) => {
        return axiosClient.post(BRAND_API_CREATE, params);
    }
}
export default brandAPI;