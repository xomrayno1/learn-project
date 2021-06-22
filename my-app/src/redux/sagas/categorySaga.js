import {takeLatest, put, call} from 'redux-saga/effects'

import {
    GET_LIST_PSSF_CATEGORY,
    GET_LIST_PSSF_CATEGORY_SUCCESS,
    GET_LIST_PSSF_CATEGORY_FAILED,
    DELETE_CATEGORY,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,
    CREATE_CATEGORY,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,
    ERR_BAD_PARAMS,
    ERROR,
    ErrCategoryCode
} from '../../utils/Constant'
import {notiError, notiSuccess} from '../../utils/AppUtils'
import categoryAPI from '../../api/categoryApi'
import getMessage from '../../utils/MessageList'


function* getCategoryPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(categoryAPI.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_CATEGORY_SUCCESS, payload: response.data || ''});
    } catch (error) {
        const {message} = error.response.data;
        notiError(message || 'ERROR')
        yield put({type: GET_LIST_PSSF_CATEGORY_FAILED, payload: error})
    }
}

function* deleteCategory({payload}){ 
    try {
       
        yield call(categoryAPI.deleteCategory, payload);
        const resGet = yield call(categoryAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: DELETE_CATEGORY_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Xoá thành công`);
    } catch (error) {
        const {message} = error.response.data;
        notiError(message || 'ERROR')
        yield put({type: DELETE_CATEGORY_FAILED, payload: error})
    }
}

function* createCategory({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(categoryAPI.createCategory, form);
        const resGet = yield call(categoryAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: CREATE_CATEGORY_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Thêm thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        const {code, error, message} = err.response.data;
        yield put({type: CREATE_CATEGORY_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrCategoryCode.ERR_CATEGORY_NAME_ALREADY_EXISTS:
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

function* updateCategory({payload, setModal}){ 
    const {current} = payload;
    try {
        const form  = {
            ...current.values
        }
        yield call(categoryAPI.updateCategory, form);
        const resGet = yield call(categoryAPI.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: UPDATE_CATEGORY_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Cập nhật thành công`);
        setTimeout(()=>{ 
            setModal({visible: false})
            current.resetForm();
        },200);
    } catch (err) {
        const {code, error, message} = err.response.data;
        yield put({type: UPDATE_CATEGORY_FAILED, payload: err})
        switch(code){
            case ERR_BAD_PARAMS:
                current.setErrors({
                    ...error
                })
                break;
            case ErrCategoryCode.ERR_CATEGORY_NAME_ALREADY_EXISTS:
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

function* categorySaga(){
    yield takeLatest(GET_LIST_PSSF_CATEGORY, getCategoryPSSFilter);
    yield takeLatest(DELETE_CATEGORY, deleteCategory);
    yield takeLatest(CREATE_CATEGORY, createCategory);
    yield takeLatest(UPDATE_CATEGORY, updateCategory);
}

export default categorySaga;
