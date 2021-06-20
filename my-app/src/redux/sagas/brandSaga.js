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
    REQUEST_SUCCESS
} from '../../utils/Constant'
import brandAPI from '../../api/brandApi'

function* getBrandPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(brandAPI.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_BRAND_SUCCESS, payload: response.data || ''});
    } catch (error) {
        const data = error.response.data;
        yield put({type: GET_LIST_PSSF_BRAND_FAILED, payload: data.message})
    }
}

function* brandSaga(){
    yield takeLatest(GET_LIST_PSSF_BRAND, getBrandPSSFilter);
}

export default brandSaga;
