import {
    GET_LIST_PSSF_SUPPLIER,
    DELETE_SUPPLIER,
    CREATE_SUPPLIER,
    UPDATE_SUPPLIER
} from '../../utils/Constant'

export const getListPSSFSupplier = (payload ) => {
    return {
        type : GET_LIST_PSSF_SUPPLIER,
        payload,
    }
}

export const deleteSupplier = (payload) => {
    return {
        type : DELETE_SUPPLIER,
        payload,
    }
}

export const createSupplier = (formRef, setModal) => {
    return {
        type : CREATE_SUPPLIER,
        payload : formRef,
        setModal,
    }
}

export const updateSupplier = (formRef, setModal) => {
    return {
        type : UPDATE_SUPPLIER,
        payload : formRef,
        setModal,
    }
}
