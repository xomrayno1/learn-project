import {
    GET_LIST_PSSF_PRODUCT,
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} from '../../utils/Constant'

export const getListPSSFProduct = (payload ) => {
    return {
        type : GET_LIST_PSSF_PRODUCT,
        payload,
    }
}

export const deleteProduct = (payload) => {
    return {
        type : DELETE_PRODUCT,
        payload,
    }
}

export const createProduct = (formRef, setModal) => {
    return {
        type : CREATE_PRODUCT,
        payload : formRef,
        setModal,
    }
}

export const updateProduct = (formRef, setModal) => {
    return {
        type : UPDATE_PRODUCT,
        payload : formRef,
        setModal,
    }
}
