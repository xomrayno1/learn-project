import {
    GET_LIST_PSSF_BRAND,
    DELETE_BRAND,
    CREATE_BRAND,
    UPDATE_BRAND
} from '../../utils/Constant'

export const getListPSSFBrand = (payload ) => {
    return {
        type : GET_LIST_PSSF_BRAND,
        payload,
    }
}

export const deleteBrand = (payload) => {
    return {
        type : DELETE_BRAND,
        payload,
    }
}

export const createBrand = (formRef, setModal) => {
    return {
        type : CREATE_BRAND,
        payload : formRef,
        setModal,
    }
}

export const updateBrand = (formRef, setModal) => {
    return {
        type : UPDATE_BRAND,
        payload : formRef,
        setModal,
    }
}
