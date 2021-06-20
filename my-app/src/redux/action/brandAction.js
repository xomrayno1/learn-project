import {GET_LIST_PSSF_BRAND} from '../../utils/Constant'

export const getListPSSFBrand = (payload) => {
    return {
        type : GET_LIST_PSSF_BRAND,
        payload
    }
}