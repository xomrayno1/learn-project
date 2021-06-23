import {takeLatest, put, call} from 'redux-saga/effects'

import {
    GET_LIST_PSSF_BRAND,
    GET_LIST_PSSF_BRAND_SUCCESS,
    GET_LIST_PSSF_BRAND_FAILED,
    GET_BRAND,
    GET_BRAND_SUCCESS,
    GET_BRAND_FAILED,
    DELETE_BRAND,
    DELETE_BRAND_SUCCESS,
    DELETE_BRAND_FAILED,
    UPDATE_BRAND,
    UPDATE_BRAND_SUCCESS,
    UPDATE_BRAND_FAILED,
    CREATE_BRAND,
    CREATE_BRAND_SUCCESS,
    CREATE_BRAND_FAILED,
    REQUEST_FAILED,
    REQUEST_SUCCESS,
    ERR_BAD_PARAMS,
    OK,
    ERROR,
    ErrBrandCode
} from '../../utils/Constant'
import {notiError, notiSuccess} from '../../utils/AppUtils'
import brandAPI from '../../api/brandApi'
import getMessage from '../../utils/MessageList'


function* getBrandPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(brandAPI.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_BRAND_SUCCESS, payload: response.data || ''});
    } catch (error) {
        yield put({type: GET_LIST_PSSF_BRAND_FAILED, payload: error})
        if(!error.response){
            notiError('Network Error')
        }else{
            const {message} = error.response.data;
            notiError(message || 'ERROR')
        }
    }
}

function* deleteBrand({payload}){ 
    try {
       
        yield call(brandAPI.deleteBrand, payload);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: DELETE_BRAND_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Xoá thành công`);
    } catch (error) {
        yield put({type: DELETE_BRAND_FAILED, payload: error})
        if(!error.response){
            notiError('Network Error')
        }else{
            const {message} = error.response.data;
            notiError(message || 'ERROR')
        }
    }
}

function* createBrand({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(brandAPI.createBrand, form);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: CREATE_BRAND_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Thêm thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        yield put({type: CREATE_BRAND_FAILED, payload: err})
        if(!err.response){
            notiError('Network Error')
        }else{
            const {code, error, message} = err.response.data;
            switch(code){
                case ERR_BAD_PARAMS:
                    current.setErrors({
                        ...error
                    })
                    break;
                case ErrBrandCode.ERR_BRAND_NAME_ALREADY_EXISTS:
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

function* updateBrand({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(brandAPI.updateBrand, form);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: UPDATE_BRAND_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Cập nhật thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        yield put({type: UPDATE_BRAND_FAILED, payload: err})
        if(!err.response){
            notiError('Network Error')
        }else{
            const {code, error, message} = err.response.data;
            switch(code){
                case ERR_BAD_PARAMS:
                    current.setErrors({
                        ...error
                    })
                    break;
                case ErrBrandCode.ERR_BRAND_NAME_ALREADY_EXISTS:
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
}

function* brandSaga(){
    yield takeLatest(GET_LIST_PSSF_BRAND, getBrandPSSFilter);
    yield takeLatest(DELETE_BRAND, deleteBrand);
    yield takeLatest(CREATE_BRAND, createBrand);
    yield takeLatest(UPDATE_BRAND, updateBrand);
}

export default brandSaga;
