import axiosClient from "./axiosClient";
import {BRAND_API, BRAND_API_GET_LIST_PSSF} from '../utils/Constant'

const brandAPI = {
    getListPagingSearchSortFilter: (params) =>{
        return axiosClient.post(BRAND_API_GET_LIST_PSSF, params)
    }
}
export default brandAPI;