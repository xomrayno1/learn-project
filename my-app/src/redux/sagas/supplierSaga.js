import { takeLatest, put, call } from 'redux-saga/effects'

import {
    GET_LIST_PSSF_SUPPLIER,
    GET_LIST_PSSF_SUPPLIER_SUCCESS,
    GET_LIST_PSSF_SUPPLIER_FAILED,
    GET_SUPPLIER,
    GET_SUPPLIER_SUCCESS,
    GET_SUPPLIER_FAILED,
    DELETE_SUPPLIER,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAILED,
    UPDATE_SUPPLIER,
    UPDATE_SUPPLIER_SUCCESS,
    UPDATE_SUPPLIER_FAILED,
    CREATE_SUPPLIER,
    CREATE_SUPPLIER_SUCCESS,
    CREATE_SUPPLIER_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS,
    ERR_BAD_PARAMS,
    OK,
    ERROR,
    ErrSupplierCode
} from '../../utils/Constant'
import { notiError, notiSuccess } from '../../utils/AppUtils'
import supplierAPI from '../../api/supplierApi'
import getMessage from '../../utils/MessageList'


function* getSupplierPSSFilter({ payload }) { // paging sort search filter
    try {
        const response = yield call(supplierAPI.getListPagingSearchSortFilter, payload);
        yield put({ type: GET_LIST_PSSF_SUPPLIER_SUCCESS, payload: response.data || '' });
    } catch (error) {
        yield put({ type: GET_LIST_PSSF_SUPPLIER_FAILED, payload: error })
        if(!error.response){
            notiError('Network Error')
        }else{
            const { message } = error.response.data;
            notiError(message || 'ERROR')
        }
    }
}

function* deleteSupplier({ payload }) {
    try {

        yield call(supplierAPI.deleteSupplier, payload);
        const resGet = yield call(supplierAPI.getListPagingSearchSortFilter, {
            "searchKey": "",
            "sortCase": 1,
            "ascSort": true,
            "pageNumber": 1,
            "pageSize": 5
        });
        yield put({ type: DELETE_SUPPLIER_SUCCESS, payload: resGet.data || '' })
        notiSuccess(`Xoá thành công`);
    } catch (error) {
        yield put({ type: DELETE_SUPPLIER_FAILED, payload: error })
        if(!error.response){
            notiError('Network Error')
        }else{
            const { message } = error.response.data;
            notiError(message || 'ERROR')
        }
    }
}

function* createSupplier({ payload, setModal }) {
    const { current } = payload;
    try {
        const form = {
            ...current.values
        }
        yield call(supplierAPI.createSupplier, form);
        const resGet = yield call(supplierAPI.getListPagingSearchSortFilter, {
            "searchKey": "",
            "sortCase": 1,
            "ascSort": true,
            "pageNumber": 1,
            "pageSize": 5
        });
        yield put({ type: CREATE_SUPPLIER_SUCCESS, payload: resGet.data || '' })
        notiSuccess(`Thêm thành công`);
        setTimeout(() => {
            setModal({ visible: false })
            current.resetForm();
        }, 200);
    } catch (err) {
        yield put({ type: CREATE_SUPPLIER_FAILED, payload: err })
        if(!err.response){
            notiError('Network Error')
        }else{
            const { code, error, message } = err.response.data;
            switch (code) {
                case ERR_BAD_PARAMS:
                    current.setErrors({
                        ...error
                    })
                    break;
                case ErrSupplierCode.ERR_SUPPLIER_NAME_ALREADY_EXISTS:
                    current.setErrors({
                        name: message
                    })
                    break;
                default:
                    notiError(getMessage(ERROR))
                    break
            }    
        }
    }
}

function* updateSupplier({ payload, setModal }) {
    const { current } = payload;
    try {
        const form = {
            ...current.values
        }
        yield call(supplierAPI.updateSupplier, form);
        const resGet = yield call(supplierAPI.getListPagingSearchSortFilter, {
            "searchKey": "",
            "sortCase": 1,
            "ascSort": true,
            "pageNumber": 1,
            "pageSize": 5
        });
        yield put({ type: UPDATE_SUPPLIER_SUCCESS, payload: resGet.data || '' })
        notiSuccess(`Cập nhật thành công`);
        setTimeout(() => {
            setModal({ visible: false })
            current.resetForm();
        }, 200);
    } catch (err) {
        yield put({ type: UPDATE_SUPPLIER_FAILED, payload: err })
        if(!err.response){
            notiError('Network Error')
        }else{
            const { code, error, message } = err.response.data;
            switch (code) {
                case ERR_BAD_PARAMS:
                    current.setErrors({
                        ...error
                    })
                    break;
                case ErrSupplierCode.ERR_SUPPLIER_NAME_ALREADY_EXISTS:
                    current.setErrors({
                        name: message
                    })
                    break;
                case ErrSupplierCode.ERR_SUPPLIER_EMAIL_INCORRECT_FORMAT:
                    current.setErrors({
                        email: message
                    })
                    break;
                default:
                    notiError(getMessage(ERROR))
                    break;
            }
        }
    }
}

function* supplierSaga() {
    yield takeLatest(GET_LIST_PSSF_SUPPLIER, getSupplierPSSFilter);
    yield takeLatest(DELETE_SUPPLIER, deleteSupplier);
    yield takeLatest(CREATE_SUPPLIER, createSupplier);
    yield takeLatest(UPDATE_SUPPLIER, updateSupplier);
}

export default supplierSaga;
