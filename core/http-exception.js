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

module.exports = {
    HttpException
}