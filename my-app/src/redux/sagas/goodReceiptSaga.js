import {takeLatest, put, call} from 'redux-saga/effects'

import {
    GET_LIST_PSSF_GOODS_RECEIPT,
    GET_LIST_PSSF_GOODS_RECEIPT_SUCCESS,
    GET_LIST_PSSF_GOODS_RECEIPT_FAILED,
    DELETE_GOODS_RECEIPT,
    DELETE_GOODS_RECEIPT_SUCCESS,
    DELETE_GOODS_RECEIPT_FAILED,
    UPDATE_GOODS_RECEIPT,
    UPDATE_GOODS_RECEIPT_FAILED,
    UPDATE_GOODS_RECEIPT_SUCCESS,
    CREATE_GOODS_RECEIPT,
    CREATE_GOODS_RECEIPT_FAILED,
    CREATE_GOODS_RECEIPT_SUCCESS,
    ERROR,
    ErrGoodsReceiptCode
} from '../../utils/Constant'
import {notiError, notiSuccess} from '../../utils/AppUtils'
import goodsReceipApi  from '../../api/goodsReceiptApi'
import getMessage from '../../utils/MessageList'


function* getGoodsReceiptPSSFilter({payload}){ // paging sort search filter
    try {
        const response = yield call(goodsReceipApi.getListPagingSearchSortFilter, payload);
        yield put({type: GET_LIST_PSSF_GOODS_RECEIPT_SUCCESS, payload: response.data || ''});
    } catch (error) {
        yield put({type: GET_LIST_PSSF_GOODS_RECEIPT_FAILED, payload: error})
        if(!error.response){
            notiError('Network Error')
        }else{
            const {message} = error.response.data;
            notiError(message || 'ERROR')
        }
    }
}

function* deleteGoodsReceipt({payload}){ 
    try {
       
        yield call(goodsReceipApi.deleteGoodsReceipt, payload);
        const resGet = yield call(goodsReceipApi.getListPagingSearchSortFilter, {
            "searchKey" : "",
            "sortCase" : 1,
            "ascSort": true,
            "pageNumber":1,
            "pageSize": 5
        });
        yield put({type: DELETE_GOODS_RECEIPT_SUCCESS, payload: resGet.data || ''})
        notiSuccess(`Xoá thành công`);
    } catch (error) {
        yield put({type: DELETE_GOODS_RECEIPT_FAILED, payload: error})
        if(!error.response){
            notiError('Network Error')
        }else{
            const {message} = error.response.data;
            notiError(message || 'Lỗi')
        }
    }
}

function* createGoodsReceipt({payload}){  
    try {
        const response = yield call(goodsReceipApi.createGoodsReceipt, payload);
        yield put({type: CREATE_GOODS_RECEIPT_SUCCESS, payload: response.data || ''})
        notiSuccess(`Thêm thành công`);
    } catch (err) {
        yield put({type: CREATE_GOODS_RECEIPT_FAILED, payload: err})
        if(!err.response){
            notiError('Network Error')
        }else{
            const {message} = err.response.data;
            notiError(message)
        }
    }
}

function* updateGoodsReceipt({payload}){ 
    try {
        const response = yield call(goodsReceipApi.updateGoodsReceipt, payload);
        yield put({type: UPDATE_GOODS_RECEIPT_SUCCESS, payload: response.data || ''})
        notiSuccess(`Cập nhật thành công`);
    } catch (err) {
        yield put({type: UPDATE_GOODS_RECEIPT_FAILED, payload: err})
        if(!err.response){
            notiError('Network Error')
        }else{
            const {message} = err.response.data;
            notiError(message || 'Lỗi')
        }
    }
}

function* goodsReceiptSaga(){
    yield takeLatest(GET_LIST_PSSF_GOODS_RECEIPT, getGoodsReceiptPSSFilter);
    yield takeLatest(DELETE_GOODS_RECEIPT, deleteGoodsReceipt);
    yield takeLatest(CREATE_GOODS_RECEIPT, createGoodsReceipt);
    yield takeLatest(UPDATE_GOODS_RECEIPT, updateGoodsReceipt);
}

export default goodsReceiptSaga;
