import {
    OK,
    ERROR,
    ERR_BAD_REQUEST, 
    ERR_UNAUTHORIZED,
    ERR_FORBIDDEN,
    ERR_BAD_PARAMS,
    INVALID_PARAMETER,
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
 
        case OK:
            return 'Thành công'
        case ERROR:
            return 'Lỗi'

        default:
            return 'Message'
    }
}
export default getMessage;