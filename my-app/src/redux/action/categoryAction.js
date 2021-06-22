import {
    GET_LIST_PSSF_CATEGORY,
    DELETE_CATEGORY,
    CREATE_CATEGORY,
    UPDATE_CATEGORY
} from '../../utils/Constant'

export const getListPSSFCategory = (payload ) => {
    return {
        type : GET_LIST_PSSF_CATEGORY,
        payload,
    }
}

export const deleteCategory = (payload) => {
    return {
        type : DELETE_CATEGORY,
        payload,
    }
}

export const createCategory = (formRef, setModal) => {
    return {
        type : CREATE_CATEGORY,
        payload : formRef,
        setModal,
    }
}

export const updateCategory = (formRef, setModal) => {
    return {
        type : UPDATE_CATEGORY,
        payload : formRef,
        setModal,
    }
}
