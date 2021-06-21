import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

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
import brandAPI from '../../api/brandApi'
import getMessage from '../../utils/MessageList'


function* getBrandPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(brandAPI.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_BRAND_SUCCESS, payload: response.data || ''});
    } catch (error) {
        message.error(getMessage(error.response.data.code || ERROR))
        yield put({type: GET_LIST_PSSF_BRAND_FAILED, payload: error})
    }
}

function* deleteBrand({payload}){ 
    try {
        const resDelete = yield call(brandAPI.deleteBrand, payload);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: DELETE_BRAND_SUCCESS, payload: resGet.data || ''})
        message.success(getMessage(resDelete.code || OK))
    } catch (error) {
        message.error(getMessage(error.response.data.code || ERROR))
        yield put({type: DELETE_BRAND_FAILED, payload: error})
    }
}

function* createBrand({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        const resCreate = yield call(brandAPI.createBrand, form);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: CREATE_BRAND_SUCCESS, payload: resGet.data || ''})
        setModal({visible: false})
        message.success(getMessage(resCreate.code || OK))
    } catch (err) {
        const {code, error} = err.response.data;
        yield put({type: CREATE_BRAND_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrBrandCode.ERR_BRAND_NAME_ALREADY_EXISTS:
                current.setErrors({
                    name: getMessage(code)
                })
                break;
            default:
                message.error(getMessage(code || ERROR))
                break
        }
    }
}

function* updateBrand({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        const reUpdate = yield call(brandAPI.updateBrand, form);
        const resGet = yield call(brandAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: UPDATE_BRAND_SUCCESS, payload: resGet.data || ''})
        setModal({visible: false})
        message.success(getMessage(reUpdate.code || OK))
    } catch (err) {
        const {code, error} = err.response.data;
        yield put({type: UPDATE_BRAND_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrBrandCode.ERR_BRAND_NAME_ALREADY_EXISTS:
                current.setErrors({
                    name: getMessage(code)
                })
                break;
            default:
                message.error(getMessage(code || ERROR))
                break;
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
