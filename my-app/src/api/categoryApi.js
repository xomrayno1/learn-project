import axiosClient from "./axiosClient";
import {
    CATEGORY_API_GET_LIST_PSSF, 
    CATEGORY_API_CREATE,
    CATEGORY_API_UPDATE,
    CATEGORY_API_DELETE,
} from '../utils/Constant'

const categoryAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(CATEGORY_API_GET_LIST_PSSF, params)
    },
    deleteCategory: (params) =>{
        return axiosClient.post(CATEGORY_API_DELETE, params)
    },
    updateCategory: (params) => {
        return axiosClient.put(CATEGORY_API_UPDATE, params);
    },
    createCategory: (params) => {
        return axiosClient.post(CATEGORY_API_CREATE, params);
    }
}
export default categoryAPI;