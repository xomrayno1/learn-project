//brand constant
export const GET_LIST_PSSF_BRAND = 'GET_LIST_PSSF_BRAND';
export const GET_LIST_PSSF_BRAND_SUCCESS = 'GET_LIST_PSSF_BRAND_SUCCESS';
export const GET_LIST_PSSF_BRAND_FAILED = 'GET_LIST_PSSF_BRAND_FAILED';

export const GET_ALL_BRAND = 'GET_ALL_BRAND';
export const GET_ALL_BRAND_SUCCESS = 'GET_ALL_BRAND_SUCCESS';
export const GET_ALL_BRAND_FAILED = 'GET_ALL_BRAND_FAILED';

export const GET_BRAND = 'GET_BRAND';
export const GET_BRAND_SUCCESS = 'GET_BRAND_SUCCESS';
export const GET_BRAND_FAILED = 'GET_BRAND_FAILED';

export const DELETE_BRAND = 'DELETE_BRAND';
export const DELETE_BRAND_SUCCESS = 'DELETE_BRAND_SUCCESS';
export const DELETE_BRAND_FAILED = 'DELETE_BRAND_FAILED';

export const UPDATE_BRAND = 'UPDATE_BRAND';
export const UPDATE_BRAND_SUCCESS = 'UPDATE_BRAND_SUCCESS';
export const UPDATE_BRAND_FAILED = 'UPDATE_BRAND_FAILED';

export const CREATE_BRAND = 'CREATE_BRAND';
export const CREATE_BRAND_SUCCESS = 'CREATE_BRAND_SUCCESS';
export const CREATE_BRAND_FAILED = 'CREATE_BRAND_FAILED';

//REQUEST_SUCCESS
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_FAILED = 'REQUEST_FAILED';

//PATH API
export const SEVER_PORT = 'http://localhost:8080';
export const MANAGE_SERVICE = '/manage-service'
export const API_PREFIX = '/api/v1';

//BRAND API
export const BRAND_API = SEVER_PORT + MANAGE_SERVICE + API_PREFIX + '/brands';
export const BRAND_API_GET_LIST_PSSF = BRAND_API + '/brand_get_list_paging_sort_search_filter';
export const BRAND_API_DELETE = BRAND_API + '/brand_delete'
export const BRAND_API_CREATE = BRAND_API + '/brand_create'
export const BRAND_API_UPDATE = BRAND_API + '/brand_update'

//CATEGORY API
export const CATEGORY_API = SEVER_PORT + MANAGE_SERVICE + API_PREFIX + '/categories';
export const CATEGORY_API_GET_LIST_PSSF = CATEGORY_API + '/category_get_list_paging_sort_search_filter';
export const CATEGORY_API_DELETE = CATEGORY_API + '/category_delete'
export const CATEGORY_API_CREATE = CATEGORY_API + '/category_create'
export const CATEGORY_API_UPDATE = CATEGORY_API + '/category_update'

//PRODUCT API
export const PRODUCT_API = SEVER_PORT + MANAGE_SERVICE + API_PREFIX + '/products';

//define code status error
export const OK = 200;
export const ERROR = 300;

export const ERR_BAD_REQUEST = 400;
export const ERR_UNAUTHORIZED = 401;
export const ERR_FORBIDDEN = 403;
export const ERR_BAD_PARAMS = 406;
export const INVALID_PARAMETER = 407;

//code err product
export const ErrProductCode = {
    ERR_PRODUCT_LIST_IS_EMPTY: 116,
    ERR_PRODUCT_ID_NOT_EXIST: 117,
    ERR_PRODUCT_CODE_ALREADY_EXISTS: 118,
    ERR_CREATE_PRODUCT: 119,
    ERR_UPDATE_PRODUCT: 120
}

export const ErrCategoryCode = {
    ERR_CATEGORY_LIST_IS_EMPTY: 156,
    ERR_CATEGORY_ID_NOT_EXIST: 157,
    ERR_CATEGORY_NAME_ALREADY_EXISTS: 158,
    ERR_CREATE_CATEGORY: 159,
    ERR_UPDATE_CATEGORY: 160,
}

export const ErrSupplierCode = {
    ERR_SUPPLIER_LIST_IS_EMPTY: 216,
    ERR_SUPPLIER_ID_NOT_EXIST: 217,
    ERR_SUPPLIER_NAME_ALREADY_EXISTS: 218,
    ERR_CREATE_SUPPLIER: 219,
    ERR_UPDATE_SUPPLIER: 220,
    ERR_SUPPLIER_EMAIL_ALREADY_EXISTS: 221
}

export const ErrBrandCode = {
    ERR_BRAND_LIST_IS_EMPTY: 256,
    ERR_BRAND_ID_NOT_EXIST: 257,
    ERR_BRAND_NAME_ALREADY_EXISTS: 258,
    ERR_CREATE_BRAND: 259,
    ERR_UPDATE_BRAND: 260
}

 