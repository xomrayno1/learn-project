import axiosClient from "./axiosClient";
import {
    BRAND_API_GET_LIST_PSSF, 
    BRAND_API_CREATE,
    BRAND_API_UPDATE,
    BRAND_API_DELETE,
    BRAND_API_GET_LIST_ACTIVE
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
    },
    getListActive: () => {
        return axiosClient.get(BRAND_API_GET_LIST_ACTIVE);
    }
}
export default brandAPI;