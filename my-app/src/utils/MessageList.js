import {
    OK,
    ERROR,
    ERR_BAD_REQUEST, 
    ERR_UNAUTHORIZED,
    ERR_FORBIDDEN,
    ERR_BAD_PARAMS,
    INVALID_PARAMETER,
    ErrProductCode,
    ErrBrandCode,
    ErrSupplierCode,
    ErrCategoryCode
} from './Constant'

const getMessage = (code) => {
    switch (code) {
        case ERR_BAD_REQUEST:
            return 'Bad request'
        case ERR_UNAUTHORIZED:
            return 'Unauthorized or Access Token is expired'
        case ERR_FORBIDDEN:
            return 'Forbidden! Access denied'
        case ERR_BAD_PARAMS:
            return 'Bad parameters'
        case INVALID_PARAMETER:
            return 'Invalid parameters'

        case ErrProductCode.ERR_PRODUCT_LIST_IS_EMPTY:
            return 'Danh sách sản phẩm trống'
        case ErrProductCode.ERR_PRODUCT_ID_NOT_EXIST:
            return 'Sản phẩm không tồn tại'
        case ErrProductCode.ERR_PRODUCT_CODE_ALREADY_EXISTS:
            return 'Sản phẩm đã tồn tại'
        case ErrProductCode.ERR_CREATE_PRODUCT:
            return 'Không thể thêm sản phẩm'
        case ErrProductCode.ERR_UPDATE_PRODUCT:
            return 'Không thể cập nhật sản phẩm'

        case ErrCategoryCode.ERR_CATEGORY_LIST_IS_EMPTY:
            return 'Danh sách danh mục trống'
        case ErrCategoryCode.ERR_BRAND_ID_NOT_EXIST:
            return 'Danh mục không tồn tại'
        case ErrCategoryCode.ERR_BRAND_NAME_ALREADY_EXISTS:
            return 'Danh mục đã tồn tại'
        case ErrCategoryCode.ERR_CREATE_BRAND:
            return 'Không thể thêm danh mục'
        case ErrCategoryCode.ERR_UPDATE_BRAND:
            return 'Không thể cập nhật danh mục '

        case ErrSupplierCode.ERR_SUPPLIER_LIST_IS_EMPTY:
            return 'Danh sách nhà cung cấp trống'
        case ErrSupplierCode.ERR_SUPPLIER_ID_NOT_EXIST:
            return 'Nhà cung cấp không tồn tại'
        case ErrSupplierCode.ERR_SUPPLIER_NAME_ALREADY_EXISTS:
            return 'Nhà cung cấp đã tồn tại'
        case ErrSupplierCode.ERR_CREATE_SUPPLIER:
            return 'Không thể thêm nhà cung cấp'
        case ErrSupplierCode.ERR_UPDATE_SUPPLIER:
            return 'Không thể cập nhật nhà cung cấp'
        case ErrSupplierCode.ERR_SUPPLIER_EMAIL_ALREADY_EXISTS:
            return 'Email nhà cung cấp đã tồn tại '

        case ErrBrandCode.ERR_BRAND_LIST_IS_EMPTY:
            return 'Danh sách nhãn hiệu trống'
        case ErrBrandCode.ERR_BRAND_ID_NOT_EXIST:
            return 'Nhãn hiệu không tồn tại'
        case ErrBrandCode.ERR_BRAND_NAME_ALREADY_EXISTS:
            return 'Nhãn hiệu đã tồn tại'
        case ErrBrandCode.ERR_CREATE_BRAND:
            return 'Không thể thêm nhãn hiệu'
        case ErrBrandCode.ERR_UPDATE_BRAND:
            return 'Không thể cập nhật nhãn hiệu '

        case OK:
            return 'Thành công'
        case ERROR:
            return 'Lỗi'

        default:
            return 'Message'
    }
}
export default getMessage;