import {takeLatest, put, call} from 'redux-saga/effects'

import {
    GET_LIST_PSSF_PRODUCT,
    GET_LIST_PSSF_PRODUCT_SUCCESS,
    GET_LIST_PSSF_PRODUCT_FAILED,
    GET_PRODUCT,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILED,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    CREATE_PRODUCT,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS,
    ERR_BAD_PARAMS,
    OK,
    ERROR,
    ErrProductCode
} from '../../utils/Constant'
import {notiError, notiSuccess} from '../../utils/AppUtils'
import productAPI from '../../api/productApi'
import getMessage from '../../utils/MessageList'


function* getProductPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(productAPI.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_PRODUCT_SUCCESS, payload: response.data || ''});
    } catch (error) {
        const {message} = error.response.data;
        notiError(message || 'ERROR')
        yield put({type: GET_LIST_PSSF_PRODUCT_FAILED, payload: error})
    }
}

function* deleteProduct({payload}){ 
    try {
       
        yield call(productAPI.deleteProduct, payload);
        const resGet = yield call(productAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: DELETE_PRODUCT_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Xoá thành công`);
    } catch (error) {
        const {message} = error.response.data;
        notiError(message || 'ERROR')
        yield put({type: DELETE_PRODUCT_FAILED, payload: error})
    }
}

function* createProduct({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(productAPI.createProduct, form);
        const resGet = yield call(productAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: CREATE_PRODUCT_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Thêm thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        const {code, error, message} = err.response.data;
        yield put({type: CREATE_PRODUCT_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrProductCode.ERR_PRODUCT_NAME_ALREADY_EXISTS:
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

function* updateProduct({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(productAPI.updateProduct, form);
        const resGet = yield call(productAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: UPDATE_PRODUCT_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Cập nhật thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        const {code, error, message} = err.response.data;
        yield put({type: UPDATE_PRODUCT_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrProductCode.ERR_PRODUCT_NAME_ALREADY_EXISTS:
                current.setErrors({
                    name: message
                })
                break;
            default:
                notiError(getMessage(ERROR))
                break;
        }
    }
}

function* productSaga(){
    yield takeLatest(GET_LIST_PSSF_PRODUCT, getProductPSSFilter);
    yield takeLatest(DELETE_PRODUCT, deleteProduct);
    yield takeLatest(CREATE_PRODUCT, createProduct);
    yield takeLatest(UPDATE_PRODUCT, updateProduct);
}

export default productSaga;
