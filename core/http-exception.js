/**
 *
 * @description: 封装错误提示
 * @author: junyong.hong
 * @createTime: 2019/8/15
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
class HttpException extends Error {
    /**
     * 构造函数
     * @param msg 错误消息提示
     * @param errorCode 标识
     * @param code 状态码
     */
    constructor(msg = '', errorCode = 10000, code = 400) {
        // 调用基类构造函数
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

// 默认错误提示
class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 201
        this.msg = msg || 'success'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class Forbidden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}

class linkError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '你已经点赞过'
        this.errorCode = errorCode || 60001
    }
}

class DislikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '你已取消点赞'
        this.errorCode = errorCode || 60002
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbidden,
    linkError,
    DislikeError
}